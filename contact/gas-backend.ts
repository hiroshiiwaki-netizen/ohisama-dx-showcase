/**
 * DX推進部 問い合わせフォーム バックエンド
 * 
 * 【セットアップ手順】
 * 1. GASエディタで新規プロジェクト作成
 * 2. このコードをCode.gsに貼り付け
 * 3. NOTIFY_EMAIL を dx.connect@nhw.jp に変更
 * 4. デプロイ → ウェブアプリ → 「全員」がアクセス可能
 * 5. デプロイURLをcontact/index.htmlのGAS_URLに設定
 */

// ===== 設定 =====
const NOTIFY_EMAIL = 'dx.connect@nhw.jp';  // 通知先メールアドレス
const SHEET_ID = '';  // スプレッドシートID（ログを残す場合。空欄でもOK）

/**
 * POSTリクエスト受信
 */
function doPost(e: GoogleAppsScript.Events.DoPost) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const name = data.name || '（未記入）';
    const organization = data.organization || '（未記入）';
    const email = data.email || '（未記入）';
    const category = data.category || '一般的なお問い合わせ';
    const message = data.message || '（未記入）';
    const timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    // メール送信
    const subject = `【DX推進部】${category} - ${name}様`;
    const body = `
DX推進部 問い合わせフォームから送信されました。

━━━━━━━━━━━━━━━━━━
📅 受信日時: ${timestamp}
👤 お名前: ${name}
🏢 会社名・団体名: ${organization}
📧 メールアドレス: ${email}
📋 種別: ${category}
━━━━━━━━━━━━━━━━━━

💬 お問い合わせ内容:
${message}

━━━━━━━━━━━━━━━━━━
このメールはDX推進部紹介ページ（dx.nhw.jp）の問い合わせフォームから自動送信されました。
`;

    GmailApp.sendEmail(NOTIFY_EMAIL, subject, body, {
      replyTo: email,
      name: 'DX推進部 問い合わせフォーム'
    });

    // スプレッドシートにログ記録（SHEET_IDが設定されている場合）
    if (SHEET_ID) {
      const ss = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheetByName('問い合わせログ') || ss.getSheets()[0];
      sheet.appendRow([timestamp, name, organization, email, category, message, '未対応']);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', message: '送信完了' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GETリクエスト（テスト用）
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'DX推進部 問い合わせフォーム バックエンド稼働中' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * テスト関数
 */
function testDoPost() {
  const testEvent = {
    postData: {
      contents: JSON.stringify({
        name: 'テスト太郎',
        organization: 'テスト株式会社',
        email: 'test@example.com',
        category: 'DXに関するご相談',
        message: 'これはテスト送信です。'
      })
    }
  };
  
  const result = doPost(testEvent as any);
  console.log(result.getContent());
}
