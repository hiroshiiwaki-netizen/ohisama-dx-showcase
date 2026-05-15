# おひさま会 DXソリューション紹介ページ — 引継書

> **最終更新**: 2026-05-16
> **プロジェクトパス**: `Antigravity-PJ/ohisama-dx-showcase`

---

## プロジェクト概要

おひさま会の51のDXソリューションを外部向けに紹介するGitHub Pagesサイト。
DX総合EXPOやパートナー企業への逆営業時の「デジタル名刺」として機能する。

## 公開URL・リポジトリ

| 項目 | 内容 |
|------|------|
| **公開URL** | https://hiroshiiwaki-netizen.github.io/ohisama-dx-showcase/ |
| **リポジトリ** | https://github.com/hiroshiiwaki-netizen/ohisama-dx-showcase |
| **GitHubアカウント** | hiroshiiwaki-netizen（hiroshi.iwaki@nhw.jp） |

## 現在のステータス

- ✅ ページ公開済み・GitHub Pages有効
- ✅ おひさまカラーパレット（RED `#D2422D` 基調）適用
- ✅ ライトテーマ（ダーク禁止）
- ✅ 外部製品名（FileMaker/HOMIS/Tukusi/CrossLog）を汎用表現に変更
- ✅ 法人名「医療法人おひさま会」に統一（社団は不要）

## ファイル構成

| ファイル | 内容 |
|---------|------|
| `index.html` | メインページ（単一HTML） |
| `style.css` | スタイルシート（おひさまカラー・ライトテーマ） |
| `SPEC.md` | 仕様書 |
| `HANDOVER.md` | この引継書 |

## デプロイ方法

```bash
git add -A
git commit -m "変更内容"
git push
# → 1〜2分でGitHub Pagesに自動反映
```

## ⚠️ 注意事項

1. **外部製品名を出さない** — SPEC.mdの「コンテンツルール」を必ず確認
2. **法人名は「医療法人おひさま会」** — 「社団」は入れない
3. **パートナー募集は掲載しない** — 実績紹介のみ
4. **ダークテーマ禁止** — おひさまカラーパレット準拠のライトテーマのみ

## 今後のタスク

- [ ] おひさま会ロゴ画像の追加
- [ ] OGP画像の設定（SNSシェア対応）
- [ ] EXPO後の反応に応じてコンテンツ追加検討

## 関連

- DX総合EXPO: 2026年5月21日（水）インテックス大阪
- 逆営業先: アジアクエスト・KDL（返信待ち）
