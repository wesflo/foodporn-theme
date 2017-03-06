var domReady = function () {
    wf.autoloader = new wf.lib.Autoloader();
    wf.autoloader.init();
    console.log( 'init' );
};

document.addEventListener("DOMContentLoaded", domReady);
