<?php
require_once 'conf/conf.php';
$page = isset($_GET['page']) ? $_GET['page'] : 'index'
?>
<!DOCTYPE html>
<html>
<head>
    <?php include_once 'template/_partials/layout/head.phtml'; ?>
</head>
<body>
<?php include_once 'template/' . $page . '.phtml'; ?>
<?php
include_once 'template/_partials/layout/header.phtml';
include_once 'template/_partials/layout/footer.phtml';
include_once 'template/_partials/layout/footerScripts.phtml';
?>
</body>
</html>