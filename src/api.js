const
    apiUrl = 'https://clicker-battle.ru/app/api/',
    fetch = require('node-fetch');

class API {

    constructor(token) {
        this.token = token;
        this.checkToken();
    }

    async checkToken() {
        const
            user_id = (await this.call('users.get')).id,
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
                    (answer.response && answer.response !== null) ?
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
            getTop: async () => await this.call('users.getTop')
        }
    };

    get transfers() {
        return {
            send: async (toId, amount) => await this.call('transfers.send', {toId, amount}),
            getHistory: async (limit = 10, offset = 0) => await this.call('transfers.getHistory', {limit, offset})
        }
    };

    get games() {
        return {
            getHistory: async (limit = 10, offset = 0) => await this.call('games.getHistory', {limit, offset})
        }
    };

    get persons() {
        return {
            get: async () => await this.call('persons.get')
        }
    };

    get shop() {
        return {
            getItems: async () => await this.call('shop.getItems')
        }
    };

    get cursor() {
        return {
            getList: async () => await this.call('cursor.getList')
        }
    };

    get banner() {
        return {
            getList: async () => await this.call('banner.getList')
        }
    };

    get bannerstat() {
        return {
            getList: async () => await this.call('bannerstat.getList')
        }
    };

    get referal() {
        return {
            getList: async (limit = 10, offset = 0) => await this.call('referal.getList', {limit, offset}),
            getOwner: async () => await this.call('referal.getOwner')
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