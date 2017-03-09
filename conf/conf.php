<?php
$_conf = array(
    'baseURL' => '/',
    'imageURL' => 'img/',
    'styles' => array(
        'dist/css/eatjoy.min.css',
    ),
    'scripts' => array(
        'dist/js/eatjoy.pre.min.js',
        'dist/js/eatjoy.min.js',
    ),
);


if($_SERVER['ENVIRONMENT_NAME'] === 'localhost'){
    $_conf['baseURL'] = 'http://localhost:8888/foodporn-theme/';
    $_conf['styles'] = array(
        'tmp/css/reset.css',
        'tmp/css/helper.css',
        'tmp/css/layout.css',
        'tmp/css/components.css',
        'tmp/css/modules.css',
        'tmp/css/pages.css',
    );
    $_conf['scripts'] = array(
        'tmp/js/eatjoy.pre.js',
        'tmp/js/eatjoy.js',
    );
}