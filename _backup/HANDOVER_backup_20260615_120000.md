# おひさま会 DX推進部 紹介ページ 引継書

> 最終更新: 2026-06-03 | 作業環境: 会社PC (G:)

## 📌 プロジェクト概要

おひさま会のDXソリューションを外部向けに紹介するWebサイト。
学会ポスターへのQRコード掲載や、パートナー企業への「デジタル名刺」として機能する。

## 🎯 現在のステータス
- **状況**: 運用中（ブランドチェック修正対応中）
- **優先度**: 高
- **担当**: 岩木

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

## ✅ 完了済み作業

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

1. **田崎理事にブランドチェック依頼** — dx.nhw.jp のURLを連絡し確認してもらう
2. **KIZUNAの会（2026-07-23）に向けたコンテンツ調整** — 学会ポスターQRコード用
3. **FileMakerとのデータ連携実例集の検討**（未着手・要検討）

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
10. **パートナー募集は掲載しない** — 純粋な実績紹介に徹する
11. **ダークテーマ禁止** — ライトテーマのみ

## ファイル構成

| ファイル/フォルダ | 内容 |
|---------|------|
| `index.html` | トップページ |
| `style.css` | メインスタイルシート |
| `CNAME` | カスタムドメイン設定（dx.nhw.jp） |
| `img/logo.png` | 正式ロゴ横型（ヘッダー用） |
| `img/logo-footer.png` | 正式ロゴ縦型（フッター用） |
| `img/` | その他画像 |
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
