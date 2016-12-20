<?php
$_conf = array(
    'baseURL' => '/',
    'imageURL' => 'img/',
);


if($_SERVER['ENVIRONMENT_NAME'] === 'localhost'){
    $_conf['baseURL'] = 'http://localhost:8888/foodporn-theme/';
}