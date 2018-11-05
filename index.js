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
    /**
     * Istanza l'oggetto
     */
    constructor() {

    }
    /**
     * Metodo per effettuare il login
     * @param {string} cod_min Codice della scuola
     * @param {string} username Username del portale
     * @param {string} password Password
     * @param {number} loginwithtoken Toggle per usare token o password, se inserito e uguale a 1 usa il token
     * @returns {Promise} Promessa che viene risolta in caso di successo, i dati saranno alla proprietà 'scheda' della classe ArgoAPI
     */
    async login(cod_min, username, password, loginwithtoken = 0) {
        return new Promise((resolve, reject) => {
            if (loginwithtoken == 0) {
                this.cod_min = cod_min
                this.username = username
                let header = { 'x-cod-min': cod_min, 'x-user-id': username, 'x-pwd': password };
                this._curl("login", header)
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
    /**
     * Metodo utilizzato per effettuarele richieste http al server rest d Argo
     * @param {string} request Tipo di richiesta
     * @param {Object | Array} auxiliaryHeader Header che si vuole passare
     * @param {Object | Array} auxiliaryQuery Query che si vuole passare
     * @returns {Promise} Promessa che restituisce il risultato della richiesta
     */
    _curl = async function(request, auxiliaryHeader, auxiliaryQuery = {}) {
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
    /**
     * Metodo utilizzato per prendere la scheda "Accade oggi" in base alla data selezionata
     * @param {String} datGiorno Formato 'AAAA-MM-GG'
     */
    async oggiScuola(datGiorno) {
        let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
        let query = { datGiorno: datGiorno };
        try {
            return await this.curl('oggi', header, query)
        } catch (ex) {
            return "Unable to get data"
        }
    }
}

try {
    ciao();
} catch (ex) {
    console.log(ex)
}
async function ciao() {
    var argo = new ArgoAPI()
    await argo.login('sg18309', 'riccardo', '')
    console.log(tmp);
}
