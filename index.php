<?php
echo("ciao");
require_once("argo.php");
try {
$argo = new argoUser("sg18309", "riccardo", "St3f4n0.");
} catch (Exception $e) {
	echo($e);
}

?>
<html>
    <header>
        <title>Prova</title>
    </header>
    <body>

    </body>
</html>