const $ = require('jquery')(require('jsdom-no-contextify').jsdom().parentWindow);
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
$.support.cors = true;
$.ajaxSettings.xhr = function () {
    return new XMLHttpRequest;
}
const ARGOAPI_URL = "https://www.portaleargo.it/famiglia/api/rest/"
const ARGOAPI_KEY = "ax6542sdru3217t4eesd9"
const ARGOAPI_VERSION = "2.0.2"
class ArgoAPI {
    constructor() {

    }
    async initialize(cod_min, username, password, loginwithtoken = 0) {
        return new Promise((resolve, reject) => {
            if (loginwithtoken == 0) {
                this.cod_min = cod_min
                this.username = username
                let header = { 'x-cod-min': cod_min, 'x-user-id': username, 'x-pwd': password };
                this.curl("login", header)
                    .then(data => {
                        console.log('logged: ', data)
                        let token = data.token
                        header = { "x-auth-token": token, "x-cod-min": cod_min }
                        this.curl("schede", header)
                            .then(data => {
                                this.scheda = { ...data[0] }
                                resolve();
                            })
                            .catch(err => {
                                console.log('Unable to get student info')
                                reject(err)
                            })
                    })
                    .catch(err => {
                        console.log('Unable to login')
                        reject(err);
                    })

            } else if (loginwithtoken == 1) { }
        })
    }
    async curl(request, auxiliaryHeader,auxiliaryQuery = {}) {
        return new Promise((resolve, reject) => {
            let defaultHeader = { "x-key-app": ARGOAPI_KEY, "x-version": ARGOAPI_VERSION, "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36" };
            let header = { ...defaultHeader, ...auxiliaryHeader };
            let query = { '_dc': Date.now(), ...auxiliaryQuery }
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

    async oggiScuola(datGiorno) {
        let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
        let query = { datGiorno: datGiorno };
        try{ 
        return await this.curl('oggi',header,query)
        } catch (ex)
        {
            return "Unable to get data"
        }
    }
}

try{
ciao();
}catch(ex) {
    console.log(ex)
}
async function ciao() {
    var argo = new ArgoAPI()
    await argo.initialize('sg18309', 'riccardo', 'St3f4n0.')
    console.log(tmp);
}
