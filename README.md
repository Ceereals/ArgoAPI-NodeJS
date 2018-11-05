# ArgoAPI-NodeJS #

> A simple npm module that allows you to communicate with Argo's API

[![npm version badge](https://img.shields.io/npm/v/sinopia.svg)](https://www.npmjs.com/package/argoapi)

## Install

```bash
npm i argoapi
```

## Usage

### With .then() clause
```javascript
const ArgoAPI = require('argoapi')

ArgoAPI.login('school code','username','password')
    .then(message => {
    //successfull message
    })
    .catch(err => {
        //error message
    })

```
### With async/await method
```javascript
const ArgoAPI = require('argoapi')

//inside an async function
try {
    await ArgoAPI.login('school code','username','password')
} catch(e) {
    console.log(e)
}
```
## Documentation
For [docs](DOCS.md) see the DOCS.md file.
## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://npmjs.org/package/live-xxx
