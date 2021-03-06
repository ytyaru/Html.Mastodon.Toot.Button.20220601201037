class Tooter {
    constructor(domain='mstdn.jp') {
        const url = new URL(location.href)
        url.searchParams.delete('code');
        this.redirect_uri = url.href
        this.domain = domain
        this.scope = 'read write follow push'
    }
    getDefaultJsonHeaders() { return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }}
    getJsonHeaders(headers=null) { return (headers) ? {...this.getDefaultJsonHeaders(), ...headers} : this.getDefaultJsonHeaders() }
    async get(endpoint, headers) {
        const url = `https://${this.domain}/${endpoint}`
        const data = {
            method: 'GET',
//            headers: (headers) ? {...this.getJsonHeaders(), ...headers} : this.getJsonHeaders()
            headers: this.getJsonHeaders(headers)
        }
        console.debug(url)
        console.debug(data)
        const res = await fetch(url, data)
        console.debug(res)
        const json = await res.json()
        console.debug(json)
        console.debug(JSON.stringify(json))
        return json
    }
    async post(endpoint, headers, params) {
        const method = "POST";
        const body = JSON.stringify(params);
        const url = `https://${this.domain}/${endpoint}`
        console.debug(url)
        const data = {}
        data.method = method
        data.headers = this.getJsonHeaders(headers)
        if (params) { data.body = body }
        console.debug(params)
        console.debug(data)
        //const res = await fetch(url, data).catch((e)=>throw e);
        const res = await fetch(url, data)
        console.debug(res)
        const json = await res.json()
        console.debug(json)
        console.debug(JSON.stringify(json))
        return json
    }
    async createApp() {
        console.debug('----- apps -----')
        const params = {
            client_name: `Test Application by API redirect_uris=${this.redirect_uri}`,
            redirect_uris: `${this.redirect_uri}`,
            scopes: this.scope,
            website: `${this.redirect_uri}`,
        };
        return await this.post('api/v1/apps', null, params)
    }
    authorize(client_id) {
        console.debug('----- authorize -----')
        const scope='read+write+follow+push'
        const redirect_uri = this.redirect_uri
        const url = `https://pawoo.net/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&response_type=code`
        console.debug(url)
        window.location.href = url
    }
    async getToken(client_id, client_secret, code) {
        console.debug('----- token -----')
        const params = {
            grant_type: 'authorization_code',
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: this.redirect_uri,
            code: code,
        };
        return await this.post('oauth/token', null, params)
    }
    async verify(accessToken) {
        console.debug('----- verify -----')
        const headers = {
          'Authorization': `Bearer ${accessToken}`,
        };
        const res = await this.get('api/v1/apps/verify_credentials', headers, null)
        if (res.hasOwnProperty('error')) { return false }
        return true
    }
    async toot(accessToken) {
        console.debug('----- toot -----')
        const status = document.getElementById('status').value
        console.debug('status:', status)
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const params = {status: status, visibility:'public'};
        return await this.post('api/v1/statuses', headers, params)
    }
}
