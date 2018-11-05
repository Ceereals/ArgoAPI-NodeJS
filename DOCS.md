<a name="ArgoAPI"></a>

## ArgoAPI
**Kind**: global class

* [ArgoAPI](#ArgoAPI)
    * [new ArgoAPI()](#new_ArgoAPI_new)
    * [.login(cod_min, username, password, loginwithtoken)](#ArgoAPI+login) ⇒ <code>Promise.&lt;string&gt;</code>
    * [._curl(request, auxiliaryHeader, auxiliaryQuery)](#ArgoAPI+_curl) ⇒ <code>Promise.&lt;{}&gt;</code>
    * [.oggiScuola(datGiorno)](#ArgoAPI+oggiScuola) ⇒ <code>\*</code>
    * [.isLogged()](#ArgoAPI+isLogged) ⇒ <code>boolean</code>
    * [.assenze()](#ArgoAPI+assenze) ⇒ <code>\*</code>
    * [.noteDisciplinari()](#ArgoAPI+noteDisciplinari) ⇒ <code>\*</code>
    * [.votiGiornalieri()](#ArgoAPI+votiGiornalieri) ⇒ <code>\*</code>
    * [.votiScrutinio()](#ArgoAPI+votiScrutinio) ⇒ <code>\*</code>
    * [.compiti()](#ArgoAPI+compiti) ⇒ <code>\*</code>
    * [.argomenti()](#ArgoAPI+argomenti) ⇒ <code>\*</code>
    * [.promemoria()](#ArgoAPI+promemoria) ⇒ <code>\*</code>
    * [.orario()](#ArgoAPI+orario) ⇒ <code>\*</code>
    * [.docenti()](#ArgoAPI+docenti) ⇒ <code>\*</code>

<a name="new_ArgoAPI_new"></a>

### new ArgoAPI()
Istanza l'oggetto

<a name="ArgoAPI+login"></a>

### argoAPI.login(cod_min, username, password, loginwithtoken) ⇒ <code>Promise.&lt;string&gt;</code>
Metodo per effettuare il login

**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>Promise.&lt;string&gt;</code> - Promessa che viene risolta in caso di successo, i dati saranno alla proprietà 'scheda' della classe ArgoAPI

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cod_min | <code>string</code> |  | Codice della scuola |
| username | <code>string</code> |  | Username del portale |
| password | <code>string</code> |  | Password o Token |
| loginwithtoken | <code>number</code> | <code>0</code> | Toggle per usare token o password, se inserito e uguale a 1 usa il token |

<a name="ArgoAPI+_curl"></a>

### argoAPI.\_curl(request, auxiliaryHeader, auxiliaryQuery) ⇒ <code>Promise.&lt;{}&gt;</code>
Metodo utilizzato per effettuarele richieste http al server rest d Argo

**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>Promise.&lt;{}&gt;</code> - Promessa che restituisce il risultato della richiesta

| Param | Type | Description |
| --- | --- | --- |
| request | <code>string</code> | Tipo di richiesta |
| auxiliaryHeader | <code>Object</code> \| <code>Array</code> | Header che si vuole passare |
| auxiliaryQuery | <code>Object</code> \| <code>Array</code> | Query che si vuole passare |

<a name="ArgoAPI+oggiScuola"></a>

### argoAPI.oggiScuola(datGiorno) ⇒ <code>\*</code>
Metodo utilizzato per prendere la scheda "Accade oggi" in base alla data selezionata

**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>\*</code> - scheda del giorno sotto forma di oggetto

| Param | Type | Description |
| --- | --- | --- |
| datGiorno | <code>String</code> | Formato 'AAAA-MM-GG' |

<a name="ArgoAPI+isLogged"></a>

### argoAPI.isLogged() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>boolean</code> - Indica se si è loggati o meno
<a name="ArgoAPI+assenze"></a>

### argoAPI.assenze() ⇒ <code>\*</code>
**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>\*</code> - Ritorna un oggetto contenente le assenze e i ritardi, se ci sono errori lancia un'eccezione
<a name="ArgoAPI+noteDisciplinari"></a>

### argoAPI.noteDisciplinari() ⇒ <code>\*</code>
**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>\*</code> - Ritorna un oggetto contenente le note disciplinari, se ci sono errori lancia un errore
<a name="ArgoAPI+votiGiornalieri"></a>

### argoAPI.votiGiornalieri() ⇒ <code>\*</code>
**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>\*</code> - Ritorna un oggetto contenente i voti giornalieri, se ci sono errori lancia un errore
<a name="ArgoAPI+votiScrutinio"></a>

### argoAPI.votiScrutinio() ⇒ <code>\*</code>
**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>\*</code> - Ritorna un oggetto contenente i voti degli scrutini, se ci sono errori lancia un errore
<a name="ArgoAPI+compiti"></a>

### argoAPI.compiti() ⇒ <code>\*</code>
**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>\*</code> - Ritorna un oggetto contenente i compiti assegnati, se ci sono errori lancia un errore
<a name="ArgoAPI+argomenti"></a>

### argoAPI.argomenti() ⇒ <code>\*</code>
**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>\*</code> - Ritorna un oggetto contenente gli argomenti, se ci sono errori lancia un errore
<a name="ArgoAPI+promemoria"></a>

### argoAPI.promemoria() ⇒ <code>\*</code>
**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>\*</code> - Ritorna un oggetto contenente i promemoria, se ci sono errori lancia un errore
<a name="ArgoAPI+orario"></a>

### argoAPI.orario() ⇒ <code>\*</code>
**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>\*</code> - Ritorna un oggetto contenente l'orario, se ci sono errori lancia un errore
<a name="ArgoAPI+docenti"></a>

### argoAPI.docenti() ⇒ <code>\*</code>
**Kind**: instance method of [<code>ArgoAPI</code>](#ArgoAPI)
**Returns**: <code>\*</code> - Ritorna un oggetto contenente i docenti, se ci sono errori lancia un errore