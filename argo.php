<?php
/*	File 			- argoapi.php
 *	Website			- http://cristianlivella.com
 * 	Project			- ArgoAPI
 * 	Project	Website		- https://github.com/cristianlivella/ArgoAPI
 *	Version			- 1.0.0
*/

define("ARGOAPI_URL", "https://www.portaleargo.it/famiglia/api/rest/");
define("ARGOAPI_KEY", "ax6542sdru3217t4eesd9");
define("ARGOAPI_VERSION", "2.0.2");

define("datGiorno", date("Y-m-d"));

class argoUser {
	private function curl($request, $auxiliaryHeader, $auxiliaryQuery = array()) {
		$defaultHeader = array("x-key-app: ".ARGOAPI_KEY, "x-version: ".ARGOAPI_VERSION, "user-agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36");
		$header = array_merge($defaultHeader, $auxiliaryHeader);
        $defaultQuery = array("_dc" => round(microtime(true) * 1000));
        $query = array_merge($defaultQuery, $auxiliaryQuery);
        $ch = curl_init();
        $test = ARGOAPI_URL.$request."?".http_build_query($query);
		curl_setopt($ch, CURLOPT_URL, ARGOAPI_URL.$request."?".http_build_query($query));
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
		$output = curl_exec ($ch);
		$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
		return array("output" => $output, "httpcode" => $httpcode);
	}
	public function __construct($cod_min, $username, $password, $loginwithtoken = 0) {
		if ($loginwithtoken==0) {
			$header = array("x-cod-min: ".$cod_min, "x-user-id: ".$username, "x-pwd: ".$password);
			$curl = $this->curl("login", $header);
			if ($curl['httpcode']==200) {
				$this->username = $username;
				$curl = json_decode($curl['output']);
				$token = $curl->token;
				$header = array("x-auth-token: ".$token, "x-cod-min: ".$cod_min);
				$curl = $this->curl("schede", $header);
				if ($curl['httpcode']==200) {
					$curl = ((array) json_decode($curl['output'])[0]);
					foreach ($curl as $thisKey => $thisCurl) {
						$this->$thisKey = $thisCurl;
					}
				}
				else {
					throw new Exception("Unable to get user info");
				}
			}
			else {
				throw new Exception("Unable to login");
			}
		}
		elseif ($loginwithtoken==1) {
			$this->username = $username;
			$token = $password;
			$header = array("x-auth-token: ".$token, "x-cod-min: ".$cod_min);
			$curl = $this->curl("schede", $header);
			if ($curl['httpcode']==200) {
				$curl = ((array) json_decode($curl['output'])[0]);
				foreach ($curl as $thisKey => $thisCurl) {
					$this->$thisKey = $thisCurl;
				}
			}
			else {
				throw new Exception("Unable to login with token");
			}
		}
	}	
	public function isLogged() {
		$header = array("x-auth-token: ".$this->authToken, "x-cod-min: ".$this->codMin, "x-prg-alunno: ".$this->prgAlunno, "x-prg-scheda: ".$this->prgScheda, "x-prg-scuola: ".$this->prgScuola);
		$curl = $this->curl("compiti", $header);
		if ($curl['httpcode']==200) {
			return True;
		}
		else {
			return False;
		}
	}
	public function oggiScuola($datGiorno = datGiorno) {
		$header = array("x-auth-token: ".$this->authToken, "x-cod-min: ".$this->codMin, "x-prg-alunno: ".$this->prgAlunno, "x-prg-scheda: ".$this->prgScheda, "x-prg-scuola: ".$this->prgScuola);
		$query = array("datGiorno" => $datGiorno);
		$curl = $this->curl("oggi", $header, $query);
		if ($curl['httpcode']==200) {
			return json_decode($curl['output'], true)['dati'];
		}
		else {
			throw new Exception("Unable to get data");
		}
	}	
	public function assenze() {
		$header = array("x-auth-token: ".$this->authToken, "x-cod-min: ".$this->codMin, "x-prg-alunno: ".$this->prgAlunno, "x-prg-scheda: ".$this->prgScheda, "x-prg-scuola: ".$this->prgScuola);
		$curl = $this->curl("assenze", $header);
		if ($curl['httpcode']==200) {
			return json_decode($curl['output'], true)['dati'];
		}
		else {
			throw new Exception("Unable to get data");
		}
	}
	public function noteDisciplinari() {
		$header = array("x-auth-token: ".$this->authToken, "x-cod-min: ".$this->codMin, "x-prg-alunno: ".$this->prgAlunno, "x-prg-scheda: ".$this->prgScheda, "x-prg-scuola: ".$this->prgScuola);
		$curl = $this->curl("notedisciplinari", $header);
		if ($curl['httpcode']==200) {
			return json_decode($curl['output'], true)['dati'];
		}
		else {
			throw new Exception("Unable to get data");
		}
	}
	public function votiGiornalieri() {
		$header = array("x-auth-token: ".$this->authToken, "x-cod-min: ".$this->codMin, "x-prg-alunno: ".$this->prgAlunno, "x-prg-scheda: ".$this->prgScheda, "x-prg-scuola: ".$this->prgScuola);
		$curl = $this->curl("votigiornalieri", $header);
		if ($curl['httpcode']==200) {
			return json_decode($curl['output'], true)['dati'];
		}
		else {
			throw new Exception("Unable to get data");
		}
	}
	public function votiScrutinio() {
		$header = array("x-auth-token: ".$this->authToken, "x-cod-min: ".$this->codMin, "x-prg-alunno: ".$this->prgAlunno, "x-prg-scheda: ".$this->prgScheda, "x-prg-scuola: ".$this->prgScuola);
		$curl = $this->curl("votiscrutinio", $header);
		if ($curl['httpcode']==200) {
			return json_decode($curl['output'], true);
		}
		else {
			throw new Exception("Unable to get data");
		}
	}
	public function compiti() {
		$header = array("x-auth-token: ".$this->authToken, "x-cod-min: ".$this->codMin, "x-prg-alunno: ".$this->prgAlunno, "x-prg-scheda: ".$this->prgScheda, "x-prg-scuola: ".$this->prgScuola);
		$curl = $this->curl("compiti", $header);
		if ($curl['httpcode']==200) {
			return json_decode($curl['output'], true)['dati'];
		}
		else {
			throw new Exception("Unable to get data");
		}
	}
	public function argomenti() {
		$header = array("x-auth-token: ".$this->authToken, "x-cod-min: ".$this->codMin, "x-prg-alunno: ".$this->prgAlunno, "x-prg-scheda: ".$this->prgScheda, "x-prg-scuola: ".$this->prgScuola);
		$curl = $this->curl("argomenti", $header);
		if ($curl['httpcode']==200) {
			return json_decode($curl['output'], true)['dati'];
		}
		else {
			throw new Exception("Unable to get data");
		}
	}
	public function promemoria() {
		$header = array("x-auth-token: ".$this->authToken, "x-cod-min: ".$this->codMin, "x-prg-alunno: ".$this->prgAlunno, "x-prg-scheda: ".$this->prgScheda, "x-prg-scuola: ".$this->prgScuola);
		$curl = $this->curl("promemoria", $header);
		if ($curl['httpcode']==200) {
			return json_decode($curl['output'], true)['dati'];
		}
		else {
			throw new Exception("Unable to get data");
		}
	}
	public function orario() {
		$header = array("x-auth-token: ".$this->authToken, "x-cod-min: ".$this->codMin, "x-prg-alunno: ".$this->prgAlunno, "x-prg-scheda: ".$this->prgScheda, "x-prg-scuola: ".$this->prgScuola);
		$curl = $this->curl("orario", $header);
		if ($curl['httpcode']==200) {
			return json_decode($curl['output'], true)['dati'];
		}
		else {
			throw new Exception("Unable to get data");
		}
	}
	public function docenti() {
		$header = array("x-auth-token: ".$this->authToken, "x-cod-min: ".$this->codMin, "x-prg-alunno: ".$this->prgAlunno, "x-prg-scheda: ".$this->prgScheda, "x-prg-scuola: ".$this->prgScuola);
		$curl = $this->curl("docenticlasse", $header);
		if ($curl['httpcode']==200) {
			return json_decode($curl['output'], true);
		}
		else {
			throw new Exception("Unable to get data");
		}
	}
}
?>
