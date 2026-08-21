# Headscale 教學撰寫規格

- 讀者：會操作 Home Assistant 與網路設定，但不需要會寫程式或架大型伺服器。
- 語言：台灣繁體中文；以「你」稱呼讀者，不使用 emoji。
- 每章：8–12 個 section；每個 section 要有 `id`、`data-nav`，每個 h2 要有已定義的 `data-icon`。
- 元件：只使用 `steps`、`callout`、`data-table`、`code-block`、`details.faq`、`figure.shot`。
- 安全：preauth key、API key、節點 ID、IP、ACL policy、DERP 設定與完整 log 都視為敏感資料，寫入前必須遮罩或改寫。
- 變更：ACL、路由、namespaces、policy 會影響整個網段；必須明確說明影響範圍，且不引導讀者刪除、停用或重設沒有把握的項目。
- 截圖：Browserless 只做唯讀瀏覽，不建立／刪除 user、不產生金鑰、不變更 policy 或節點。圖片須先人工檢查與遮罩。
- 事實來源：優先使用 Headscale 官方文件（headscale.net）與官方 GitHub，其次才是實測結果；介面改版時以最新官方文件為準。

修改後執行：

```bash
node scripts/build_nav.js
node scripts/build_nav.js --check
node scripts/check_links.js
```
