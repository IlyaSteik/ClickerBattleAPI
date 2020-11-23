const request = require('request');

class API {

    constructor(token) {
        this.token = token;
    }

    async call(method, params) {
        let str = [];
        for (let p in params)
            if (params.hasOwnProperty(p))
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));

        const url = `https://ulyanov.site/clickerbattle/api/${method}?token=${this.token}&${str.join('&')}`;
        return await new Promise((res, rej) => {
            request.get({url}, function (err, httpResponse, body) {
                try {
                    const answer = JSON.parse(body);
                    if (answer.response)
                        res(answer.response);
                    else
                        res(answer);
                } catch (e) {
                    res({error: {code: -1}});
                }
            });
        });
    }

    users = {
        get: async () => await this.call('users.get'),
        getDay: async () => await this.call('users.getDay'),
        transfer: async (user_id, amount) => await this.call('users.transfer', {user_id, amount})
    };

    bill = {
        create: async (user_id, amount) => await this.call('bill.create', {user_id, amount}),
        getById: async bill_id => await this.call('bill.create', {bill_id})
    };

    callback = {
        setUrl: async url => await this.call('callback.setUrl', {url})
    }
}

module.exports = {
    API
};