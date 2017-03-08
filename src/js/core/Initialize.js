var domReady = function () {
    wf.autoloader = new wf.lib.Autoloader();
    wf.autoloader.init();
};

document.addEventListener('DOMContentLoaded', domReady);
