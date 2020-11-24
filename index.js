const request = require('request');

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
            throw new Error('Wrong token');
    }

    async call(method, params) {
        const query = params ? Object.keys(params).map((value) =>
            encodeURIComponent(value) + '=' + encodeURIComponent(params[value])
        ).join('&') : '';

        const url = `https://ulyanov.site/clickerbattle/api/${method}?token=${this.token}&${query}`;
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
    };
}

class Callback {

    constructor(token) {
        this.token = token;
    }

    async run(port = 8080) {
        const
            bodyParser = require('body-parser'),
            app = require('express')();

        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Methods', 'GET, POST');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Origin', '*');
            if (req.method === 'OPTIONS') {
                res.status(200);
            }
            next();
        });
        app.use(bodyParser.json());

        app.get('/callback', (req, res) => res.send({token: this.token}));

        const server = require('http').createServer(app);

        server.listen(port);

        this.app = app;

        return await new Promise((res, rej) => {
            require('dns').lookup(require('os').hostname(), function (error, address) {
                this.address = `http://${address}:${port}/callback`;
                res(true);
            }.bind(this));
        });
    }

    getAddress() {
        return this.address;
    }

    async onEvent(func) {
        const api = new API(this.token);
        let accept = await api.callback.setUrl(this.getAddress());
        if (accept)
            this.app.post('/callback', (req, res) => func(req.body));
        else
            throw accept;
    }
}

module.exports = {
    API, Callback
};