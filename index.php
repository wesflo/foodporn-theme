<?php
require_once 'conf/conf.php';
$page = isset($_GET['page']) ? $_GET['page'] : 'index'
?>
<!DOCTYPE html>
<html>
<head>
    <?php include_once 'template/_partials/layout/head.phtml'; ?>
</head>
<body class="comingSoon">
<div class="container">
    <div class="detailHeader">
        <img src="<?= $_conf['baseURL'] ?>img/logo.png" alt="1" class="logo">

        <h1>Comming soon...</h1>

        <div id="countDown" class="countDown">
            <dl class="fancyList">
                <dt>Tage</dt>
                <dd class="days">00</dd>
                <dt>Stunden</dt>
                <dd class="hours">00</dd>
                <dt>Minuten</dt>
                <dd class="minutes">00</dd>
                <dt>Sekunden</dt>
                <dd class="seconds">00</dd>
            </dl>
        </div>
    </div>
</div>
<?php
include_once 'template/_partials/layout/footerScripts.phtml';
?>
</body>
</html>