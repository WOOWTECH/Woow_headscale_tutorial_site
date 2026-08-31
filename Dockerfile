# 靜態站台 image — 只放實際要對外提供的檔案。
# 建置流程用的檔案（scripts/、chapters.json、i18n/、README）一律不進 image，
# 避免內部資訊隨站台一起上線。另見 .dockerignore。
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# 內容頁與目錄（zh-TW，repo 根目錄）
COPY index.html tutorial.html 404.html ./
COPY ch1_intro.html ch2_install.html ch3_first_open.html ch4_user_preauth.html \
     ch5_join_device.html ch6_nodes.html ch7_acl.html ch8_routes.html \
     ch9_dns.html ch10_admin.html ch11_security.html ch12_troubleshooting.html ./
COPY sales.html prompts.html skills.html ./

# 其他語系的 site root（同檔名鏡像；chapters.json 由 .dockerignore 排除）
COPY en ./en

# 靜態資源與 SEO / 授權檔
COPY assets ./assets
COPY robots.txt sitemap.xml LICENSE ./

# 自訂 404 與靜態資源快取
RUN printf 'server {\n\
  listen 80;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  error_page 404 /404.html;\n\
  location / { try_files $uri $uri/ =404; }\n\
  location ~* \\.(png|jpg|jpeg|svg|css|js)$ { expires 7d; add_header Cache-Control "public"; }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
