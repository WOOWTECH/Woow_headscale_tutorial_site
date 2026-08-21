# Home Assistant Cloudflared Web GUI 指南

12 章繁體中文靜態教學，帶 Home Assistant 使用者透過 [WoowTech Cloudflared Web GUI](https://github.com/WOOWTECH/Woow_ha_cloudflare_tunnel_webgui) 建立 Cloudflare Tunnel 遠端入口，並涵蓋 Setup、授權、hostname、Dashboard、Config、Logs、安全與排錯。

**規劃網址：<https://ha-cloudflare-tunnel-guide.woowtech.io/>**

## 安全範圍

- 截圖採唯讀瀏覽，不在指定 Home Assistant 環境儲存、重啟、授權或變更 Tunnel。
- 圖片必須遮罩帳號、hostname、Tunnel ID、token、IP、授權網址與敏感日誌。
- 教學不鼓勵把管理介面或不必要的內網服務公開到網際網路。

## 維護

`chapters.json` 是章節、導覽、SEO 與 sitemap 的單一來源：

```bash
node scripts/build_nav.js
node scripts/check_links.js
```

本站內容以 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hant) 授權，保留 WoowTech 出處。
