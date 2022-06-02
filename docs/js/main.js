window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('DOMContentLoaded!!');
    const tooter = new Tooter('pawoo.net')
    const url = new URL(location.href)
    if (url.searchParams.has('code')) { // マストドンAPI oauth/authorize でリダイレクトされた場合
        const status = localStorage.getItem('status')
        if (status) { document.getElementById('status').value = status; }
        console.log('----- authorized -----')
        console.log('client_id:', localStorage.getItem('client_id'))
        console.log('client_secret:', localStorage.getItem('client_secret'))
        console.log('認証コード', url.searchParams.get('code'))
        // client_id, client_secretはLocalStorageに保存しておく必要がある
        const json = await tooter.getToken(localStorage.getItem('client_id'), localStorage.getItem('client_secret'), url.searchParams.get('code'))
        console.log(json)
        console.log('access_token:', json.access_token)
        localStorage.setItem('access_token', json.access_token);
        const accessToken = json.access_token
        const v = await tooter.verify(accessToken)
        console.log(v)
        const res = await tooter.toot(accessToken)
        console.log(res)
        document.getElementById('res').value = JSON.stringify(res)
        localStorage.removeItem('status')
        // 認証コード(code)をURLパラメータから削除する
        const params = url.searchParams;
        params.delete('code');
        history.replaceState('', '', url.pathname);
        console.log('----- 以上 -----')
    }
    document.getElementById('toot').addEventListener('click', async(event) => {
        const access_token = localStorage.getItem('access_token')
        if (access_token && tooter.verify(access_token)) {
            console.log('既存のトークンが有効なため即座にトゥートします。');
            const res = await tooter.toot(access_token)
            console.log(res)
            document.getElementById('res').value = JSON.stringify(res)
        } else {
            console.log('既存のトークンがないか無効のため、新しいアクセストークンを発行します。');
            const app = await tooter.createApp()
            localStorage.setItem('client_id', app.client_id);
            localStorage.setItem('client_secret', app.client_secret);
            localStorage.setItem('status', document.getElementById('status').value);
            console.log(app)
            console.log(app.client_id)
            console.log(app.client_secret)
            console.log(localStorage.getItem('client_id'))
            console.log(localStorage.getItem('client_secret'))
            tooter.authorize(app.client_id)
        }
    });
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

