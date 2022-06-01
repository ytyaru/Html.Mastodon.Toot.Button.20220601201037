class Tooter {
    constructor(domain='mstdn.jp') {
        const url = new URL(location.href)
        url.searchParams.delete('code');
        this.redirect_uri = url.href
        this.domain = domain
        this.scope = 'read write follow push'
    }
    /*
    async post(endpoint, params=null, headers=null) { // endpoint=api/v1/apps
        const method = 'POST';
        const redirect_uri = this.redirect_uri
        const body = JSON.stringify(params);
        const defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const fullHeaders = (headers) ? {...defaultHeaders, ...headers} : defaultHeaders
        const url = `https://${this.domain}/${endpoint}`
        console.debug(url)
        console.debug(method)
        console.debug(fullHeaders)
        console.debug(params)
        console.debug(body)
        const res = await fetch(url, {method, fullHeaders, body}).catch((e)=>console.error(e));
        console.debug(res)
        const json = await res.json()
        console.debug(json)
        console.debug(JSON.stringify(json))
        return json
    }
    async createApp() {
        const params = {
            client_name: `Toot button Application redirect_uris=${this.redirect_uri}`,
            redirect_uris: this.redirect_uri,
            scopes: this.scope,
            website: this.redirect_uri,
        };
        return await this.post('api/v1/apps', params)
    }
    authorize(client_id, status=null) {
        console.debug('----- authorize -----')
        //const scope='read+write+follow+push'
        //const redirect_uri = location.href
        //const redirect_uri = this.redirect_uri
        //const url = `https://pawoo.net/oauth/authorize?client_id=${client_id}&scope=${this.scope}&redirect_uri=${this.redirect_uri}&response_type=code`
        //window.location.href = url
        const redirect_uri = (status) ? this.redirect_uri + `?${status}`: this.redirect_uri
        const url = new URL(`https://pawoo.net/oauth/authorize?client_id=${client_id}&scope=${this.scope}&redirect_uri=${this.redirect_uri}&response_type=code`)
        console.debug(url.href)
        //window.location.href = url.href
    }
    async getToken(client_id, client_secret, code) {
        console.debug('----- token -----')
        const domain = 'pawoo.net';
        //const redirect_uri = location.href.split('?')[0]
        const redirect_uri = this.redirect_uri
        const params = {
            grant_type: 'authorization_code',
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri,
            code: code,
        };
        return await this.post('oauth/token', params)
    }
    async verify(accessToken) {
        console.debug('----- verify -----')
        const domain = 'pawoo.net';
        const method = "GET";
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        };
        const res = await this.post('api/v1/apps/verify_credentials')
        return !res.hasOwnProperty('error')
    }
    async toot(accessToken) {
        console.debug('----- toot -----')
        const domain = 'pawoo.net';
        const status = document.getElementById('status').value
        console.debug('status:', status)
        const params = {status: status};
        return await this.post('oauth/token', params)
    }
    */


    async createApp() {
        console.debug('----- apps -----')
        const domain = 'pawoo.net';
        const obj = {
            client_name: `Test Application by API redirect_uris=${this.redirect_uri}`,
            redirect_uris: `${this.redirect_uri}`,
            scopes: this.scope,
            website: `${this.redirect_uri}`,
        };
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const res = await fetch(`https://${this.domain}/api/v1/apps`, {method, headers, body}).catch((e)=>console.error(e));
        console.debug(res)
        const json = await res.json()
        console.debug(json)
        console.debug(JSON.stringify(json))
        return json
    }
    authorize(client_id) {
        console.debug('----- authorize -----')
        const scope='read+write+follow+push'
        //const redirect_uri = location.href
        const redirect_uri = this.redirect_uri
        const url = `https://pawoo.net/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&response_type=code`
        console.debug(url)
        window.location.href = url
    }
    async getToken(client_id, client_secret, code) {
        console.debug('----- token -----')
        const domain = 'pawoo.net';
        //const redirect_uri = location.href.split('?')[0]
        const redirect_uri = this.redirect_uri
        const obj = {
            grant_type: 'authorization_code',
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri,
            code: code,
        };
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };
        console.debug(method)
        console.debug(headers)
        console.debug(obj)
        console.debug(body)
        const res = await fetch(`https://${this.domain}/oauth/token`, {method, headers, body}).catch((e)=>console.error(e));
        console.debug(res)
        const json = await res.json()
        console.debug(json)
        return json
    }
    async verify(accessToken) {
        console.debug('----- verify -----')
        const domain = 'pawoo.net';
        const method = "GET";
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        };
        console.debug(method)
        console.debug(headers)
        const res = await fetch(`https://${this.domain}/api/v1/apps/verify_credentials`, {method, headers}).catch((e)=>console.error(e));
        console.debug(res)
        const json = await res.json()
        console.debug(json)
        //return json
        switch (res.status) {
            case 200: return true
            case 401: return false
            default: return false
        }

    }
    async toot(accessToken) {
        console.debug('----- toot -----')
        const domain = 'pawoo.net';
        const status = document.getElementById('status').value
        console.debug('status:', status)
        const obj = {status: status};
        //const obj = {status: "マストドンAPIのテストです。\nJavaScriptとユーザの手動により認証しました。"};
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        };
        console.debug(method)
        console.debug(headers)
        console.debug(obj)
        console.debug(body)
        const res = await fetch(`https://${this.domain}/api/v1/statuses`, {method, headers, body}).catch((e)=>console.error(e));
        console.debug(res)
        const json = await res.json()
        console.debug(json)
        return json
    }





    /*
    async apps() {
        console.debug('----- apps -----')
        const domain = 'pawoo.net';
        //const redirect_uri = location.href
        const redirect_uri = this.redirect_uri
        const obj = {
            client_name: `Test Application by API redirect_uris=${redirect_uri}`,
            redirect_uris: `${redirect_uri}`,
            scopes: 'read write follow push',
            website: `${redirect_uri}`,
        };
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };
        const res = await fetch(`https://${this.domain}/api/v1/apps`, {method, headers, body}).catch((e)=>console.error(e));
        console.debug(res)
        const json = await res.json()
        console.debug(json)
        console.debug(JSON.stringify(json))
        return json
    }
    authorize(client_id) {
        console.debug('----- authorize -----')
        const scope='read+write+follow+push'
        //const redirect_uri = location.href
        const redirect_uri = this.redirect_uri
        const url = `https://pawoo.net/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&response_type=code`
        console.debug(url)
        window.location.href = url
    }
    async token(client_id, client_secret, code) {
        console.debug('----- token -----')
        const domain = 'pawoo.net';
        //const redirect_uri = location.href.split('?')[0]
        const redirect_uri = this.redirect_uri
        const obj = {
            grant_type: 'authorization_code',
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri,
            code: code,
        };
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };
        console.debug(method)
        console.debug(headers)
        console.debug(obj)
        console.debug(body)
        const res = await fetch(`https://${this.domain}/oauth/token`, {method, headers, body}).catch((e)=>console.error(e));
        console.debug(res)
        const json = await res.json()
        console.debug(json)
        return json
    }
    async verify(accessToken) {
        console.debug('----- verify -----')
        const domain = 'pawoo.net';
        const method = "GET";
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        };
        console.debug(method)
        console.debug(headers)
        const res = await fetch(`https://${this.domain}/api/v1/apps/verify_credentials`, {method, headers}).catch((e)=>console.error(e));
        console.debug(res)
        const json = await res.json()
        console.debug(json)
        //return json
        switch (res.status) {
            case 200: return true
            case 401: return false
            default: return false
        }

    }
    async toot(accessToken) {
        console.debug('----- toot -----')
        const domain = 'pawoo.net';
        const status = document.getElementById('status').value
        console.debug('status:', status)
        const obj = {status: status};
        //const obj = {status: "マストドンAPIのテストです。\nJavaScriptとユーザの手動により認証しました。"};
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        };
        console.debug(method)
        console.debug(headers)
        console.debug(obj)
        console.debug(body)
        const res = await fetch(`https://${this.domain}/api/v1/statuses`, {method, headers, body}).catch((e)=>console.error(e));
        console.debug(res)
        const json = await res.json()
        console.debug(json)
        return json
    }
    */

}
