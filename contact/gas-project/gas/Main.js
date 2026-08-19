/**
 * DX推進部 問い合わせフォーム バックエンド
 * スプレッドシートログ + Google Chat カード通知
 */
// @ts-nocheck
// Webhook URLはScript Propertiesから取得（セキュリティ対策）
function getChatWebhook() {
    return PropertiesService.getScriptProperties().getProperty('CHAT_WEBHOOK');
}
// エディタで1回実行し、メール送信の権限を承認する
function authorizeMail() {
    MailApp.getRemainingDailyQuota();
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// 問い合わせ本人への受付メール。本文の転記はしない（個人情報を増やさない）
function sendAutoReply(name, email, category) {
    if (!email || email === '（未記入）' || !isValidEmail(email)) {
        return 'SKIP';
    }
    var greet = (name && name !== '（未記入）') ? name + ' 様\n\n' : '';
    MailApp.sendEmail({
        to: email,
        replyTo: 'dx.connect@nhw.jp',
        name: '医療法人おひさま会 DX推進部',
        subject: '【おひさま会 DX推進部】お問い合わせを受け付けました',
        body: greet +
            '医療法人おひさま会 DX推進部です。\n' +
            'お問い合わせを受け付けました。内容を確認のうえ、通常2〜3営業日以内にご返信します。\n\n' +
            '種別：' + category + '\n\n' +
            'このメールは自動送信です。返信が必要な場合は、このメールに返信するか dx.connect@nhw.jp へご連絡ください。\n\n' +
            '医療法人おひさま会 DX推進部\n' +
            'https://dx.nhw.jp/\n'
    });
    return 'OK';
}
// ログ用スプレッドシートを自動作成・取得
function getLogSheet() {
    var files = DriveApp.getFilesByName('DX推進部_問い合わせログ');
    var ss;
    if (files.hasNext()) {
        ss = SpreadsheetApp.open(files.next());
    }
    else {
        ss = SpreadsheetApp.create('DX推進部_問い合わせログ');
        ss.getActiveSheet().appendRow(['タイムスタンプ', 'ステータス', '名前', '組織', 'メール', '種別', '内容', '詳細']);
    }
    return ss.getActiveSheet();
}
// Google Chatにカード形式で通知
function notifyChat(name, organization, email, category, message, timestamp) {
    var webhookUrl = getChatWebhook();
    if (!webhookUrl)
        return; // 未設定なら何もしない
    var card = {
        cardsV2: [{
                cardId: 'inquiry-' + Date.now(),
                card: {
                    header: {
                        title: 'DX推進部 新しいお問い合わせ',
                        subtitle: category,
                        imageUrl: 'https://hiroshiiwaki-netizen.github.io/ohisama-dx-showcase/img/logo.png',
                        imageType: 'CIRCLE'
                    },
                    sections: [
                        {
                            header: '送信者情報',
                            widgets: [
                                {
                                    decoratedText: {
                                        topLabel: 'お名前',
                                        text: name,
                                        startIcon: { knownIcon: 'PERSON' }
                                    }
                                },
                                {
                                    decoratedText: {
                                        topLabel: '会社名・団体名',
                                        text: organization,
                                        startIcon: { knownIcon: 'HOTEL_ROOM_TYPE' }
                                    }
                                },
                                {
                                    decoratedText: {
                                        topLabel: 'メールアドレス',
                                        text: email,
                                        startIcon: { knownIcon: 'EMAIL' }
                                    }
                                }
                            ]
                        },
                        {
                            header: 'お問い合わせ内容',
                            widgets: [
                                {
                                    textParagraph: {
                                        text: message
                                    }
                                }
                            ]
                        },
                        {
                            widgets: [
                                {
                                    decoratedText: {
                                        topLabel: '受信日時',
                                        text: timestamp,
                                        startIcon: { knownIcon: 'CLOCK' }
                                    }
                                }
                            ]
                        },
                        {
                            widgets: [
                                {
                                    buttonList: {
                                        buttons: [
                                            {
                                                text: 'メールで返信',
                                                onClick: {
                                                    openLink: { url: 'mailto:' + email + '?subject=Re: ' + encodeURIComponent('【DX推進部】' + category) }
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            }]
    };
    UrlFetchApp.fetch(webhookUrl, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(card)
    });
}
function doPost(e) {
    var sheet = getLogSheet();
    var timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    try {
        sheet.appendRow([timestamp, 'DEBUG',
            'parameter=' + JSON.stringify(e.parameter || {}),
            'postData.type=' + (e.postData ? e.postData.type : 'N/A'),
            '', '', '', '受信開始']);
        var name, organization, email, category, message;
        if (e.parameter && e.parameter.name) {
            name = e.parameter.name || '（未記入）';
            organization = e.parameter.organization || '（未記入）';
            email = e.parameter.email || '（未記入）';
            category = e.parameter.category || '一般的なお問い合わせ';
            message = e.parameter.message || '（未記入）';
        }
        else if (e.postData && e.postData.contents) {
            var data = JSON.parse(e.postData.contents);
            name = data.name || '（未記入）';
            organization = data.organization || '（未記入）';
            email = data.email || '（未記入）';
            category = data.category || '一般的なお問い合わせ';
            message = data.message || '（未記入）';
        }
        else {
            sheet.appendRow([timestamp, 'ERROR', '', '', '', '', '', 'データ取得不可']);
            return ContentService
                .createTextOutput(JSON.stringify({ status: 'error', message: 'データなし' }))
                .setMimeType(ContentService.MimeType.JSON);
        }
        var mailStatus = 'NONE';
        try {
            mailStatus = sendAutoReply(name, email, category);
        }
        catch (mailError) {
            mailStatus = 'ERROR:' + String(mailError);
        }
        // スプレッドシートに記録
        sheet.appendRow([timestamp, 'OK', name, organization, email, category, message, 'mail=' + mailStatus]);
        // Google Chat カード通知
        notifyChat(name, organization, email, category, message, timestamp);
        return ContentService
            .createTextOutput(JSON.stringify({ status: 'ok', message: '送信完了' }))
            .setMimeType(ContentService.MimeType.JSON);
    }
    catch (error) {
        sheet.appendRow([timestamp, 'ERROR', '', '', '', '', '', String(error)]);
        return ContentService
            .createTextOutput(JSON.stringify({ status: 'error', message: String(error) }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
function doGet() {
    return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok', message: 'バックエンド稼働中' }))
        .setMimeType(ContentService.MimeType.JSON);
}
