const
    {API} = require('./api'),
    bodyParser = require('body-parser'),
    app = require('express')(),
    http = require('http');

class Callback {

    constructor(token) {
        this.token = token;
        this.api = new API(this.token);
    }

    async run(path = 'callback', port = 8080) {
        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Methods', 'GET, POST');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.header('Access-Control-Allow-Origin', '*');
            next();
        });
        app.use(bodyParser.json());
        app.get(`/${path}`, (req, res) => res.send({user_id: this.api.user_id}));
        http.createServer(app).listen(port);

        this.app = app;
        this.port = port;
        this.path = path;
    }

    async onEvent(func) {
        let accept = await this.api.call('callback.setUrl', {path: this.path, port: this.port});
        if (typeof accept === 'string') {
            console.log('Callback running on: ' + accept);
            this.app.post(`/${this.path}`, (req, res) => {
                func(req.body.event, req.body.data);
                res.send({status: true});
            });
        } else {
            throw new Error(JSON.stringify(accept));
        }
    }
}

module.exports = {Callback};