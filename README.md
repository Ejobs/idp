# Example app that integrates with eJobs

## Installation

Use the package manager provided by [node.js](https://nodejs.org/en/) to install example.

```bash
npm install
```

## Usage

Provide your client credentials and requested scopes.

```javascript
const c = {
    ...
    client_id: 'test-client',
    secret: 'RLPhtINNrOAjlqA8TYUWx.sF7H',
    scope: 'openid',
    ...
}
```

Start the app.

```bash
npm run start
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
