const
    apiUrl = 'https://ulyanov.site/clickerbattle/api/',
    fetch = require('node-fetch');

class API {

    constructor(token) {
        this.token = token;
        this.checkToken();
    }

    async checkToken() {
        const
            user_id = (await this.call('token.checkAccess')).user_id,
            access = user_id > 0;
        if (access)
            this.user_id = user_id;
        else
            throw new Error(JSON.stringify({error: {code: -2, text: 'Неверный токен'}}));
    }

    async call(method, params) {
        const
            query = params ? '&' + Object.keys(params).map((value) =>
                encodeURIComponent(value) + '=' + encodeURIComponent(params[value])
            ).join('&') : '',
            url = `${apiUrl}${method}?token=${this.token}${query}`;
        return await new Promise((res, rej) => {
            fetch(url, {method: 'GET'})
                .then(res =>
                    res.json()
                )
                .then(answer =>
                    answer.response ?
                        res(answer.response) : res(answer)
                ).catch(err =>
                res({error: {code: -3, text: err.toString()}})
            );
        });
    }

    get users() {
        return {
            get: async () => await this.call('users.get'),
            getById: async (user_id) => await this.call('users.getById', {user_id}),
            getDay: async () => await this.call('users.getDay'),
            transfer: async (user_id, amount) => await this.call('users.transfer', {user_id, amount})
        }
    };

    get bill() {
        return {
            create: async (user_id, amount) => await this.call('bill.create', {user_id, amount}),
            getById: async bill_id => await this.call('bill.getById', {bill_id})
        }
    };

    get callback() {
        return {
            setUrl: async url => await this.call('callback.setUrl', {url})
        }
    };
}

module.exports = {API};