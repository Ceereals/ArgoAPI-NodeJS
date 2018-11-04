const $ = require('jquery')(require('jsdom-no-contextify').jsdom().parentWindow);
/* var phpServer = require('node-php-server')
phpServer.createServer({
    port: 8000,
    hostname: '127.0.0.1',
    base: '.',
    keepalive: false,
    open: false,
    bin: 'php',
    router: __dirname + '/index.php'
}); */
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
$.support.cors = true;
$.ajaxSettings.xhr = function () {
    return new XMLHttpRequest;
}
const ARGOAPI_URL = "https://www.portaleargo.it/famiglia/api/rest/"
const ARGOAPI_KEY = "ax6542sdru3217t4eesd9"
const ARGOAPI_VERSION = "2.0.2"
class ArgoAPI {
    constructor(cod_min, username, password, loginwithtoken = 0) {
        if (loginwithtoken == 0) {
            let header = { 'x-cod-min': cod_min, 'x-user-id': username, 'x-pwd': password };
            this.curl("login", header).then(data => {
                console.log(data);
            })
        } else if (loginwithtoken == 1) { }

    }
    curl(request, auxiliaryHeader) {
        return new Promise((resolve, reject) => {
            let defaultHeader = { "x-key-app": ARGOAPI_KEY, "x-version": ARGOAPI_VERSION, "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36" };
            let header = { ...defaultHeader, ...auxiliaryHeader };
            let query = { '_dc': Date.now() }
            let a = new XMLHttpRequest();
            console.log($.param(query));
            $.ajax({
                url: ARGOAPI_URL + request + '?' + $.param(query),
                beforeSend: function (xhr) {
                    let head = Object.entries(header)
                    for (const i in head) {
                        xhr.setRequestHeader(head[i][0], head[i][1])
                    }
                },
                success: (data) => resolve(data),
                error: (data) => reject(data)
            })
        })
    }
}

new ArgoAPI('sg18309', 'riccardo', 'St3f4n0.')