# Headscale 資源總站（教學 · 銷售 · 提示詞 · Skill）

Headscale 自架 VPN 控制層的四本手冊集中地，繁體中文靜態網站：

| 分類 | 頁面 | 給誰 | 下載 |
|---|---|---|---|
| **入住教學** | [`tutorial.html`](https://headscale-guide.woowtech.io/tutorial.html) ＋ 12 章 | 用戶 | 整站 zip（GitHub archive） |
| **銷售手冊** | [`sales.html`](https://headscale-guide.woowtech.io/sales.html) | 客戶與經銷商 | 自包含單檔 HTML |
| **CLI/API 提示詞庫** | [`prompts.html`](https://headscale-guide.woowtech.io/prompts.html) | 用戶（40+ 條可複製） | 自包含單檔 HTML |
| **Skill 手冊** | [`skills.html`](https://headscale-guide.woowtech.io/skills.html) | 進階用戶（型錄＋速查） | 自包含單檔 HTML |

四類共用一個對外入口 [`index.html`（資源總覽）](https://headscale-guide.woowtech.io/)。

- **讀者**：會操作 Home Assistant 與網路設定、不需會寫程式的家庭用戶
- **語言**：繁體中文（台灣用語）
- **授權**：CC BY 4.0

## 部署

GitHub Pages ＋ 自訂網域：**https://headscale-guide.woowtech.io/**（DNS 為 Cloudflare CNAME → `woowtech.github.io`，proxied）

## 站內結構（hub 模式）

```
index.html          資源總覽 hub    ← 人手維護，build_nav 不碰
tutorial.html       教學目錄        ← build_nav 產生（chapters.json 的 hub.catalog）
ch*.html            教學內容頁      ← head/側欄/pager/footer 由 build_nav 產生
sales.html          銷售手冊        ← 自包含單檔
prompts.html        CLI/API 提示詞庫 ← 自包含單檔
skills.html         Skill 手冊      ← 自包含單檔
chapters.json       單一來源        ← 章節順序/文案/SEO + hub 設定
```

## 本地開發

```bash
node scripts/build_nav.js --check
node scripts/check_links.js
node scripts/build_nav.js
```

所有 `<head>`、側欄、pager、footer、教學目錄卡片、`sitemap.xml` 由 `scripts/build_nav.js` 產生（`index.html` 與三本單檔手冊除外）。新章節寫作規範見 [`STYLE.md`](STYLE.md)。

## 多語系（en/）

同一個 repo、同一支 generator、第二個 site root：zh-TW 永遠在根目錄一個位元組不動，英文版在 `en/`（同檔名、同 section id），網址 `https://headscale-guide.woowtech.io/en/…`。

```
根目錄            zh-TW（primary）— chapters.json + 各頁 + assets/
en/               英文 site root  — 自己的 chapters.json，頁面共用 ../assets/
i18n/ledger.json  翻譯帳本：每個 <section id>／章首／chapters.json 欄位一筆 {sourceHash, status}
i18n/strings.en.json  chrome 字串（第 N 章、上一章、footer…）只翻一次
i18n/policy.json  逐單元政策：translate | localize | transcreate | rewrite | skip
i18n/locales.json published=false 時 zh 頁不輸出 hreflang／語言切換（上線那天翻成 true）
scripts/lib/i18n.js  13 個教學站共用、byte-identical 的多語系邏輯
```

### 引導一個新語系（只做一次）

```bash
node scripts/mirror_locale.js en   # 產 en/ 殼、en/chapters.json、ledger（全 pending）
node scripts/build_og.js           # 每個語系一張分享卡（需 playwright）
node scripts/build_nav.js && SITE_ROOT=en node scripts/build_nav.js
```

### 日常

```bash
SITE_ROOT=en node scripts/build_nav.js       # 重生 en/ 的 head、側欄、pager、footer、sitemap（pending 頁自動 noindex）
SITE_ROOT=en node scripts/check_links.js
node scripts/check_i18n.js                   # 報告 + 六道閘門（結構 parity、code freeze、CJK 外漏、chrome canary、帳本、索引）
node scripts/check_i18n.js --strict          # PR 用：zh 改了 en 沒跟 → 紅燈（掛 label i18n-defer 可放行）
node scripts/check_i18n.js --update-ledger   # main 用：把 zh 已變的單元標 stale（en 頁出現提醒橫幅）
node scripts/check_i18n.js --accept en:ch7_acl.html#steps   # 翻好一個單元後記帳（整頁：en:ch7_acl.html）
```

規則：改 zh 章節的作者區（章首、`<section>`）時，同 PR 順手更新 `en/<同檔名>` 對應 section 並 `--accept`，或掛 `i18n-defer` 讓它先變 stale。翻譯寫作規範見 [`i18n/STYLE.en.md`](i18n/STYLE.en.md)，術語見 [`i18n/glossary.json`](i18n/glossary.json)。

## 授權與致謝

《Headscale 自架 VPN 控制層指南》與三本分冊由 [WoowTech](https://github.com/WOOWTECH) 製作，以 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hant) 授權釋出。Headscale 與 Tailscale 為其各自權利人的商標，本站與其無隸屬關係。
