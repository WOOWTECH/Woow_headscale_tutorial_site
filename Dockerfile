# 靜態站台 image — 只放實際要對外提供的檔案。
# 建置流程用的檔案（scripts/、chapters.json、README）一律不進 image，
# 避免內部資訊隨站台一起上線。另見 .dockerignore。
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# 內容頁與目錄
COPY index.html 404.html ./
COPY ch1_login.html ch2_system_settings.html ch3_floors_areas.html \
     ch4_naming_labels.html ch5_users.html ch6_dashboard.html \
     ch7_notifications.html ch8_first_automation.html ch9_backups.html \
     ch10_scripts.html ch11_devices.html ch12_domains.html ./
COPY appendix_hacs_addons.html appendix_scenes_helpers_groups.html ./

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
