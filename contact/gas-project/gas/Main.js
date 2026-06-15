/**
 * DX推進部 問い合わせフォーム バックエンド
 * スプレッドシートログ + Google Chat カード通知
 */
// @ts-nocheck
var CHAT_WEBHOOK = 'https://chat.googleapis.com/v1/spaces/AAQAh8o-t9E/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=IBX9_MpGuGCO2VfVNa1aghVEYRZ3u9B3pKpkKboEj2k';
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
    var card = {
        cardsV2: [{
                cardId: 'inquiry-' + Date.now(),
                card: {
                    header: {
                        title: 'DX推進部 新しいお問い合わせ',
                        subtitle: category,
                        imageUrl: 'https://dx.nhw.jp/img/logo.png',
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
    UrlFetchApp.fetch(CHAT_WEBHOOK, {
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
        // スプレッドシートに記録
        sheet.appendRow([timestamp, 'OK', name, organization, email, category, message, '']);
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
