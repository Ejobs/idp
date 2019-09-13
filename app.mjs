import express from 'express'

const Port = 3000

const app = express()
const c = {
    endpoint: 'https://hydra.ejobs.ro/oauth2/auth',
    token_endpoint: 'https://hydra.ejobs.ro/oauth2/token',
    client_id: 'test-client',
    secret: 'RLPhtINNrOAjlqA8TYUWx.sF7H',
    scope: 'openid',
    response_type: 'code',
    redirect_uri: 'http://localhost:3000/callback',
    state: 'some-random-state',
    nonce: 'some-random-nonce',
}
const auth = `${c.endpoint}?client_id=${c.client_id}&redirect_uri=${c.redirect_uri}&scope=${c.scope}&response_type=${c.response_type}&state=${c.state}&nonce=${c.nonce}`

app.get('/', (_, w) => {
    w.setHeader('Content-Type', 'text/html')
    const b = new Buffer(`
        <p>This is an example of how to integrate an app with eJobs idp</p>
        <a href="${auth}">Sign in</a></br>
        <a href="${auth}&prompt=none">Silent Sign in</a>
    `)
    w.send(b)
    w.end()
})

app.get('/callback', (_, w) => {
    w.setHeader('Content-Type', 'text/html')
    const b = new Buffer(`
        <p>Callback page</p>
        <a href="/">Go back</a>
        <script>
            var params = window.location.search.substring(1).split('&');
            var args = {};
            for (param of params) {
                args[param.split('=')[0]] = param.split('=')[1]
            }
            console.log(args)
            var form = new URLSearchParams();
            form.set('code', args.code);
            form.set('grant_type', 'authorization_code');
            form.set('client_id', '${c.client_id}');
            form.set('redirect_uri', '${c.redirect_uri}');
            var options = {
                method: 'POST',
                body: form,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ${Buffer.from(c.client_id + ":" + c.secret).toString('base64')}',
                },
            }
            fetch('${c.token_endpoint}', options).then(res => {
                console.log(res.json());
            });
        </script>
    `)
    w.send(b)
    w.end()
})

app.listen(Port, console.log(`Listening on port ${Port}`))
