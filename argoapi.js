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
     * @param {string} password Password o Token
     * @param {number} loginwithtoken Toggle per usare token o password, se inserito e uguale a 1 usa il token
     * @returns {Promise<string>} Promessa che viene risolta in caso di successo, i dati saranno alla proprietà 'scheda' della classe ArgoAPI
     */
    async login(cod_min, username, password, loginwithtoken = 0) {
            if (loginwithtoken == 0) {
                this.cod_min = cod_min
                this.username = username
                let header = { 'x-cod-min': cod_min, 'x-user-id': username, 'x-pwd': password };
                let dataFirst = await this._curl("login", header)
                if(dataFirst){
                    this.token = dataFirst.token
                    header = { "x-auth-token": this.token, "x-cod-min": cod_min }
                    let data = await this._curl("schede", header)
                    if (data){
                        this.scheda = { ...data[0] }
                        return Promise.resolve('Success!');
                    } else return Promise.reject('Unable to get student info')    
                } else return Promise.reject('Unable to login')

            } else if (loginwithtoken == 1) { 
                let header = {"x-auth-token": password, "x-cod-min": cod_min};
                let data = await this._curl("schede", header)
                if (data){          
                    this.scheda = { ...data[0] }
                    return Promise.resolve('Success!');
                } else return Promise.reject('Unable to get student info')
                                
            }
    }
    /**
     * Metodo utilizzato per effettuarele richieste http al server rest d Argo
     * @param {string} request Tipo di richiesta
     * @param {Object | Array} auxiliaryHeader Header che si vuole passare
     * @param {Object | Array} auxiliaryQuery Query che si vuole passare
     * @returns {Promise<{}>} Promessa che restituisce il risultato della richiesta
     */
    async _curl(request, auxiliaryHeader, auxiliaryQuery = {}) {
            let defaultHeader = { "x-key-app": ARGOAPI_KEY, "x-version": ARGOAPI_VERSION, "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36" };
            let header = { ...defaultHeader, ...auxiliaryHeader };
            let query = { '_dc': Date.now(), ...auxiliaryQuery }
            return $.ajax({
                url: ARGOAPI_URL + request + '?' + $.param(query),
                beforeSend: function (xhr) {
                    let head = Object.entries(header)
                    for (const i in head) {
                        xhr.setRequestHeader(head[i][0], head[i][1])
                    }
                },
                success: (data) =>  Promise.resolve(data),
                error: () => Promise.reject()
            })
    }
    /**
     * Metodo utilizzato per prendere la scheda "Accade oggi" in base alla data selezionata
     * @param {String} datGiorno Formato 'AAAA-MM-GG'
     * @returns {*} scheda del giorno sotto forma di oggetto
     */
    async oggiScuola(datGiorno) {
        let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
        let query = { datGiorno: datGiorno };
        try {
            return await this.curl('oggi', header, query)
        } catch (ex) {
            throw "Unable to get data"
        }
    }
    /**
     * @returns {boolean} Indica se si è loggati o meno
     */
    async isLogged() {
        if (this.scheda != null) {
            let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
            try {
                await this._curl("compiti", header);
                return true
            } catch (err) { return false }
        }
        return false

    }
    /**
     * @returns {*} Ritorna un oggetto contenente le assenze e i ritardi, se ci sono errori lancia un'eccezione
     */
    async assenze(){
        let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
        try {
            return await this._curl('assenze',header)
        } catch (ex) {throw 'Unable to get data'}
    }
    /**
     * @returns {*} Ritorna un oggetto contenente le note disciplinari, se ci sono errori lancia un errore
     */
    async noteDisciplinari(){
        let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
        try {
            return await this._curl('notedisciplinari',header)
        } catch(ex){
            throw 'Unable to get data'
        }
    }
    /**
     * @returns {*} Ritorna un oggetto contenente i voti giornalieri, se ci sono errori lancia un errore
     */
    async votiGiornalieri(){
        let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
        try{
            return await this._curl("votigiornalieri",header)
        } catch(ex){
            throw 'Unable to get data'
        }
    }
    /**
     * @returns {*} Ritorna un oggetto contenente i voti degli scrutini, se ci sono errori lancia un errore
     */
    async votiScrutinio(){
        let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
        try{
            return await this._curl('votiscrutinio',header)
        }catch(ex){
            throw 'Unable to get data'
        }
    }
    /**
     * @returns {*} Ritorna un oggetto contenente i compiti assegnati, se ci sono errori lancia un errore
     */
    async compiti(){
        let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
        try{
            return await this._curl("compiti",header)
        }catch(ex) {
            throw 'Unable to get data'
        }
    }
    /**
     * @returns {*} Ritorna un oggetto contenente gli argomenti, se ci sono errori lancia un errore
     */
    async argomenti(){
        let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
        try{
            return await this._curl("argomenti",header)
        }catch(ex) {
            throw 'Unable to get data'
        }
    }
    /**
     * @returns {*} Ritorna un oggetto contenente i promemoria, se ci sono errori lancia un errore
     */
    async promemoria(){
        let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
        try{
            return await this._curl("promemoria",header)
        }catch(ex) {
            throw 'Unable to get data'
        }
    }
    /**
     * @returns {*} Ritorna un oggetto contenente l'orario, se ci sono errori lancia un errore
     */
    async orario(){
        let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
        try{
            return await this._curl("orario",header)
        }catch(ex) {
            throw 'Unable to get data'
        }
    }
    /**
     * @returns {*} Ritorna un oggetto contenente i docenti, se ci sono errori lancia un errore
     */
    async docenti(){
        let header = { "x-auth-token": this.scheda.authToken, "x-cod-min": this.scheda.codMin, "x-prg-alunno": this.scheda.prgAlunno, "x-prg-scheda": this.scheda.prgScheda, "x-prg-scuola": this.scheda.prgScuola };
        try{
            return await this._curl("docenti",header)
        }catch(ex) {
            throw 'Unable to get data'
        }
    }
}


module.exports = new ArgoAPI();