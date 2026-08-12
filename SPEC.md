# おひさま会 DX推進部 紹介ページ — 仕様書

> **バージョン**: v3.0.0-draft（構造改革フェーズ1・未公開）
> **作成日**: 2026-05-15
> **最終更新**: 2026-08-12

---

## 1. 概要

おひさま会が内製開発した51のDXソリューションを紹介するGitHub Pagesサイト。
DX総合EXPOやパートナー企業との協業提案時の「デジタル名刺」として使用する。

## 2. 公開情報

| 項目 | 内容 |
|------|------|
| **公開URL** | https://hiroshiiwaki-netizen.github.io/ohisama-dx-showcase/ |
| **リポジトリ** | https://github.com/hiroshiiwaki-netizen/ohisama-dx-showcase |
| **ホスティング** | GitHub Pages（無料） |
| **ブランチ** | `master` |
| **デプロイ方法** | `git push` → 自動ビルド（1〜2分で反映） |

## 3. 技術構成

| 項目 | 内容 |
|------|------|
| HTML | `index.html`（トップページ） + 各詳細ページ |
| CSS | `style.css`（メイン） + `solutions/solution.css`（詳細ページ共通） |
| JavaScript | インライン（スクロールアニメーション・ナビ変化のみ） |
| フォント | Google Fonts（Noto Sans JP / Inter） |
| フレームワーク | なし（静的HTML） |

## 4. デザイン仕様

### 4.1 カラーパレット（おひさまカラー準拠）

| 色名 | HEX | 用途 |
|------|------|------|
| RED | `#D2422D` | メインカラー（ヘッダー、ボタン、数字、バッジ） |
| ORANGE | `#FF5100` | サブカラー（グラデーション） |
| YELLOW | `#FAC100` | アクセント（未使用・将来用） |
| GRAY | `#A7A8A9` | テキスト・ボーダー |

### 4.2 背景

- **ライトテーマ**（`#f8f9fb`）— ダークテーマは使用しない
- ヒーロー: グラデーション背景（`#fff5f0` → `#fff` → `#fef8f0`）

### 4.3 フォント

- 本文: Noto Sans JP
- 英数字: Inter

## 5. ページ構成

### 5.1 トップページ（index.html）

| セクション | ID | 内容 |
|-----------|-----|------|
| ナビゲーション | `navbar` | 固定ヘッダー（DX思想/課題から探す/安全/実績/コラム/相談） |
| ヒーロー | `home` | 価値提案＋課題・安全・相談の3CTA |
| DX思想 | `arch` | 理事長の3層モデル＋実写写真＋引用（現行維持） |
| 課題起点 | `issues` | FAX/問合せ/定期書類/ID の4カード |
| 安全 | `safety` | 3原則＋ `/safety/` へのリンク |
| 数字で見るDX | `numbers` | 8つの実績カード |
| 関わり方 | `paths` | 知る / 見る / 相談 |
| 主要ソリューション | `solutions` | 既存カード（詳細ページへ） |
| コラム | — | 5本の記事カード + コラム目次 |
| 理念（公式サイトへ橋渡し） | `philosophy` | 同心円画像＋公式Aboutリンク |
| 最終CTA | `consult` | 見学・相談 / コラム |
| フッター | — | 法人名・問い合わせ |

### 5.2 ソリューション詳細ページ（9ページ）

`solutions/<名前>/index.html` で各ソリューションの詳細を表示。

| パス | ソリューション名 |
|------|----------------|
| `solutions/ohiscan/` | OhiScan — FAX AI自動分類 |
| `solutions/ohisamabot/` | OhisamaBot — 問い合わせ管理 |
| `solutions/ohicraft/` | OhiCraft — カルテ自動作成 |
| `solutions/ohisamavox/` | OhisamaVox — AI音声カルテ |
| `solutions/ohisnap/` | OhiSnap — 保険証AI判別 |
| `solutions/xray/` | X線ナビゲーター |
| `solutions/drug-order/` | 薬剤発注システム |
| `solutions/doc-delivery/` | 書類配信サービス |
| `solutions/orest/` | OREST — 定期書類自動生成 |
| `solutions/meditrace/` | MediTrace — 医薬品入出庫管理（入庫・払出） |

各詳細ページには以下のセクションを含む：
- **誕生の背景**（なぜ作ったか）
- **課題リスト**（定量データ付き）
- **処理フロー**（業務フローのみ、技術詳細は書かない）
- **導入効果**（定量効果）
- **現場の声**（スタッフの引用）

### 5.3 コラム

| パス | 内容 |
|------|------|
| `columns/` | コラム目次（なぜこの順番か） |
| `article/` | Article 0: 最初に自動化すべき3つの業務 |
| `article2/` | Article 1: DX推進部ができるまで |
| `article3/` | Article 2: 医療AIの壁は「信頼」 |
| `article4/` | Article 3: GWSだけで完結するか？ |
| `article5/` | Article 4: IDが最大のボトルネック |

### 5.4 問い合わせフォーム

| パス | 内容 |
|------|------|
| `contact/index.html` | 問い合わせフォーム（iframe でGAS WebApp POST） |
| `contact/gas-backend.ts` | GAS TypeScript ソース |
| `contact/gas-project/` | GAS プロジェクトファイル |

- **バックエンド**: Google Apps Script doPost()
- **通知先**: Google Chat Webhook（Card V2形式）
- **ログ**: 「DX推進部_問い合わせログ」スプレッドシート自動作成
- **受信方式**: 直接フォームPOST / JSONペイロード / fetchボディ の3方式対応

## 6. コンテンツルール（重要）

### 6.1 外部に出さない製品名

| 出さない名前 | 代わりに使う表現 |
|-------------|----------------|
| FileMaker | 患者管理システム / 患者DB |
| HOMIS | 電子カルテ |
| Tukusi | AI業務自動化プラットフォーム |
| CrossLog | 訪問診療管理システム |
| chromedp | ブラウザ自動操作 |
| clasp | GAS CLI |

### 6.2 技術詳細の記載方針

- **使っている言語・技術名はOK**（Go / TypeScript / Python / Google Gemini など）
- **どう使っているかの詳細はNG**（API名・内部アーキテクチャ・具体的な実装方法）
- **処理フローは業務フローのみ**（技術的な処理フローは書かない）
- **理由**: 知的財産の保護

### 6.3 金額の記載

- **ORESTの金額は記載しない**
- FAX処理コスト（≈0.1円/枚）は記載OK

### 6.4 法人名

- ✅ 正しい: **医療法人おひさま会**
- ❌ 間違い: 医療法人社団おひさま会

### 6.5 DX思想セクションの方針

- 山口理事長の3層モデル（講演ベース）を採用
- **「対人業務にAIを割り込ませない」** が核心メッセージ
- 参照ドキュメント: `docs/山口理事長_DXビジョン.md`

### 6.6 相談窓口について（2026-08-12 更新）

- 価格表・パートナー募集の募集文面は出さない
- 資料・見学・導入相談の窓口は掲載してよい（田崎理事確認済み）
- 詳細は `docs/site-reform-2026/`

## 7. 画像一覧

| ファイル | 用途 | サイズ |
|---------|------|-------|
| `img/hero_banner.png` | ヒーローセクション左 | 340×340px |
| `img/dx_philosophy.png` | 理事長引用の横 | 180×180px |
| `img/layer_human.png` | 3層モデル「対人業務」 | 160×160px |
| `img/layer_workflow.png` | 3層モデル「自動化」 | 160×160px |
| `img/layer_record.png` | 3層モデル「記録」 | 160×160px |
| `img/ohiscan.png` 他 | ソリューションカード | 各種 |

## 8. 更新手順

```bash
# 1. ファイルを編集
# 2. コミット＆プッシュ
cd "g:\マイドライブ\Antigravity-PJ\ohisama-dx-showcase"
git add -A
git commit -m "変更内容を記述"
git push
# 3. 1〜2分でGitHub Pagesに反映される
```

## 9. 今後の拡張候補

- [ ] おひさま会ロゴ画像の差し替え（現在は仮ロゴ）
- [ ] OGP（SNSシェア用）画像の設定
- [ ] Google Analyticsの埋め込み（アクセス解析）
- [ ] スマホ表示の最適化チェック
