# おひさま会 DX推進部 紹介ページ 引継書

> 最終更新: 2026-08-12 | 作業環境: 会社PC (G:)

## 📌 プロジェクト概要

おひさま会のDXソリューションを外部向けに紹介するWebサイト。
学会ポスターへのQRコード掲載や、パートナー企業への「デジタル名刺」として機能する。
2026-08-12より、実績紹介に加えて資料・見学・導入相談の窓口を置く構造改革中（本番未反映）。

## 🎯 現在のステータス
- **状況**: 運用中 ✅（構造改革フェーズ1を 2026-08-12 本番反映）
- **優先度**: 高
- **担当**: 岩城
- **構造改革仕様**: `docs/site-reform-2026/index.html`

## 🔗 関連リンク・ファイル

| 種別 | リンク・パス |
|------|------------|
| **公開URL（カスタムドメイン）** | https://dx.nhw.jp |
| **公開URL（GitHub）** | https://hiroshiiwaki-netizen.github.io/ohisama-dx-showcase/ |
| **CrossLog事例** | https://dx.nhw.jp/crosslog/ |
| **Tukusi事例** | https://dx.nhw.jp/tukusi/ |
| **リポジトリ** | https://github.com/hiroshiiwaki-netizen/ohisama-dx-showcase |
| **GitHubアカウント** | hiroshiiwaki-netizen（hiroshi.iwaki@nhw.jp） |
| **DNS管理** | お名前.com（西川さんが管理者） |
| **ローカルフォルダ** | `G:\マイドライブ\Antigravity-PJ\ohisama-dx-showcase` |
| **学会名刺・商談引継** | `在宅医療学会/HANDOVER.md`（第8回日本在宅医療連合学会） |
| **学会当日リストWeb** | `jahcm8/index.html` → https://dx.nhw.jp/jahcm8/ |

## ✅ 完了済み作業

- 2026-08-12: **構造改革フェーズ1（トップ＋安全＋手順書＋フォーム分岐）実装・未公開**
  - バックアップ: `_backup/*_backup_20260812_095402.*` および `contact_index.html_backup_20260812_095954.html`
  - トップを課題起点・安全3原則・関わり方3枠・相談CTAへ再構成
  - 新規 `safety/index.html`、`guide/index.html`（手順書HTML）
  - 問い合わせは `?type=visit|consult|guide` で種別・見出しを切替
  - 相談窓口の掲載は田崎理事OK済み。価格表・募集広告は出さない
  - 2026-08-12 本番反映（git push）。内部仕様 `docs/site-reform-2026/` は公開リポジトリに含めていない
  - 詳細仕様: `docs/site-reform-2026/`

- 2026-07-04: **第8回日本在宅医療連合学会** — 記録は `在宅医療学会/` PJに集約
  - 名刺7枚・モバカル岸野デモ・QUEEN'S・宮澤P062 等

- 2026-06-15: **ブランドチェック承認＋カスタムドメインdx.nhw.jp公開**
  - 田崎理事によるブランドチェック完了・承認
  - 唯一の指摘：「もっと知る」ボタンのカラーをティール(#00796b)→コーポレートレッド(#D2422D)に変更
  - CNAMEファイルをリポジトリに追加（dx.nhw.jp → hiroshiiwaki-netizen.github.io）
  - OGP/TwitterCardのURLをdx.nhw.jpに更新
  - GitHub Pagesカスタムドメイン設定完了・HTTPS有効化確認済み
  - https://dx.nhw.jp/ で公開確認済み
- 2026-06-15: **セキュリティ修正（GitHubシークレット警告対応）**
  - Chat Webhook URLをコードからGAS Script Propertiesに移動
  - appsscript.jsonにscript.scriptapp権限追加
  - GitHubのSecret scanning alertに対応
- 2026-06-15: **問い合わせフォームGASバックエンド実装**
  - GAS doPost()で3受信方式（直接フォームPOST/JSONペイロード/fetchボディ）に全対応
  - tsconfig.jsonのstrict:false設定（GASグローバルスコープ互換化）
  - var使用でGASグローバルスコープ互換に変更
  - コマンドラインPOSTテストで正常動作確認済み
- 2026-06-15: **メール送信廃止 → Google Chat通知 + スプレッドシートログに切替**
  - 送信者＝受信者でメールが「送信済み」フォルダ行きの問題を解決
  - 絵文字文字化け問題も同時に解消
  - Google Chat Webhook通知実装（テキスト形式確認→Card V2リッチカード版push済み）
  - 「DX推進部_問い合わせログ」スプレッドシート自動作成・DEBUG/OK/ERRORステータス付きログ
  - appsscript.jsonに spreadsheets/drive/external_request 権限追加、gmail.send 削除
- 2026-06-15: **理事長写真配置 + 引用文改行調整**
  - 山口高秀理事長の実写写真をDX思想セクションに配置（260x260px）
  - ユーザーがトリミングした写真に差し替え
  - 引用文の改行位置を自然に修正（「対面時間は2倍になる」に文言短縮）
- 2026-06-03: **ブランドガイドライン対応**（田崎理事のフィードバック反映）
  - 理念セクション削除（公式サイトとの重複回避）
  - 法人概要セクション削除（同上）
  - 使用技術セクション削除（情報出しすぎ防止）
  - スローガン「伴走医療」削除（正式スローガン「今日も誰かの人生と。」との混在回避）
  - ロゴ差し替え → OHISAMAKAI文字入り正式ロゴ（ヘッダー横型 + フッター縦型）
  - フォント統一 → Noto Sans JP（全3ページ：メイン・CrossLog・Tukusi）
  - カラー → ブランドカラー準拠確認済み（RED #D2422D / ORANGE #FF5100 / YELLOW #FAC100）
- 2026-06-03: **カスタムドメイン設定**
  - お名前.comにCNAMEレコード追加（dx.nhw.jp → hiroshiiwaki-netizen.github.io）
  - GitHub PagesにCNAMEファイル追加
  - DNS check successful、HTTPS有効化完了
- 2026-06-02: CrossLog API活用事例ページ追加
- 2026-06-02: Tukusi API活用事例ページ追加（文書作成依頼ポータル修正含む）
- 2026-05-27: OGP/Twitter Card設定、ファビコン、ハンバーガーメニュー追加
- 2026-05-22: DX思想（理事長3層モデル）全面書き換え、ソリューション詳細9ページ作成

## 🔧 次にやること（優先順）

1. **本番反映後の目視** — https://dx.nhw.jp でヒーロー・課題・安全・手順書・相談フォームを確認
2. **田崎理事へ公開後の共有**（必要なら指摘反映）
3. **フェーズ2** — 導入効果シミュレーター（計算式は岩城さんが実データで確定してから）
4. **手順書のPDF版** — いまは HTML（`/guide/`）のみ
5. **ブラウザからのフォーム送信テスト** — コマンドラインPOSTは成功済み、ブラウザiframe POSTは未確認
6. **画像差し替え** — OhisamaBot, HALO, BLUE

## ⚠️ 注意事項・既知の問題

### コンテンツルール（田崎理事の指示）
1. **ロゴは正式版のみ使用** — マーク+OHISAMAKAI文字セット。切り出し・加工禁止
2. **理念・法人概要は掲載しない** — 公式サイトとの重複回避
3. **スローガンは「今日も誰かの人生と。」** — 「伴走医療」は使わない
4. **フォント・カラーはブランドガイドブック準拠** — Noto Sans JP / ブランドカラー
5. **公開前に田崎理事のブランドチェックを受ける**

### 既存ルール
6. **外部製品名を出さない** — FileMaker/HOMIS/Tukusi/CrossLog は汎用表現に置換
7. **技術詳細を書かない** — 言語名・サービス名はOK、API名・実装方法はNG（知的財産保護）
8. **ORESTの金額は記載しない**
9. **法人名は「医療法人おひさま会」** — 「社団」は入れない
10. **価格表・パートナー募集広告は出さない** — 資料・見学・導入相談の窓口は掲載してよい（2026-08-12 田崎理事OK）
11. **ダークテーマ禁止** — ライトテーマのみ

### GASバックエンド設定
12. **Chat Webhook URLはScript Propertiesに移行済み** — ユーザーによるGASエディタでのScript Properties設定（CHAT_WEBHOOK）が必要
13. **GAS doPostはiframe POST未検証** — コマンドラインでは正常動作するがブラウザからのiframe送信は未確認
14. **ユーザーの要望: 簡単にあきらめない** — 最悪メールリンクだけでもいい、は最後の手段の意味

## ファイル構成

| ファイル/フォルダ | 内容 |
|---------|------|
| `index.html` | トップページ |
| `style.css` | メインスタイルシート |
| `CNAME` | カスタムドメイン設定（dx.nhw.jp） |
| `img/logo.png` | 正式ロゴ横型（ヘッダー用） |
| `img/logo-footer.png` | 正式ロゴ縦型（フッター用） |
| `img/` | その他画像 |
| `pv/` | 学会ブース用PV（自動ループ・noindex・トップ非リンク）→ https://dx.nhw.jp/pv/ |
| `safety/` | 安全設計の独立ページ（2026-08-12 追加） |
| `guide/` | 失敗しない自動化の手順書（HTML版） |
| `docs/site-reform-2026/` | 構造改革 概要仕様HTML（社内・noindex） |
| `contact/` | 問い合わせフォーム（GASバックエンド連携） |
| `contact/gas-project/` | GAS TypeScript ソース（doPost/Chat通知/SSログ） |
| `crosslog/` | CrossLog API活用事例ページ |
| `tukusi/` | Tukusi API活用事例ページ |
| `solutions/` | 9つのソリューション詳細ページ |
| `article/` 〜 `article5/` | コラム記事5本 |
| `columns/` | コラム目次ページ |
| `_backup/` | 変更前バックアップ |

## デプロイ方法

```bash
git add -A
git commit -m "変更内容"
git push
# → 1〜2分でGitHub Pagesに自動反映（dx.nhw.jp）
```

## 💡 重要メモ・ノウハウ

- ブランドガイドブック: `C:\Users\setup\Downloads\★Ohisamakai_Logo_Guideline_Ver.3.0_260121.pdf`
- 公式サイト: https://ohisamakai.nhw.jp/
- DNS管理はお名前.com（さくらインターネットではない）
- 参照: `docs/山口理事長_DXビジョン.md`
- 関連イベント: KIZUNAの会 2026-07-23 / DX総合EXPO 2026-05-21（終了）
- GAS操作記録（2026-06-15）:
  - clasp login（hiroshi.iwaki@nhw.jp）
  - clasp push 複数回実行（webhook URL除去版含む）
  - ユーザーによるGAS再デプロイ実施（権限承認含む）
  - appsscript.json権限変更: gmail.send削除、spreadsheets/drive/external_request/script.scriptapp追加
  - Chat Webhook URL: Script Propertiesに移行（CHAT_WEBHOOK）→ユーザー設定待ち
  - GitHubシークレット警告対応完了
