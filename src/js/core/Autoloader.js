var Autoloader = function () {
    var that = this,
        constructors = [],
        head = document.getElementsByTagName('head')[0];

    var loadScriptFile = function (src, onLoad) {
        var script = document.createElement('script');
        script.onload = onLoad || function () {
            };
        script.src = src;
        head.appendChild(script);
    };

    var initConstructors = function (el) {
        var element = el || false,
            i = 0, l = constructors.length;
        for (; i < l; i++) {
            var constructor = constructors[i];
            if (checkConstructorInit(element, constructor)) {
                initConstructor(constructor);
            }
        }
    };

    var initConstructor = function (constructor) {
        var key = constructor.shortKey || constructor.name.toLowerCase(),
            FU = window[constructor.name];
        if (typeof FU === 'function') {
            if (constructor.standalone && typeof window[key] === 'undefined') {
                window[key] = new FU();
                window[key].init();
            } else
                if (typeof wf[key] === 'undefined') {
                    wf[key] = new FU();
                    if (typeof wf[key].init === 'function') {
                        wf[key].init();
                    }
                }
        }
    };

    var checkConstructorInit = function (element, constructor) {
        var wrapper = element || document;
        switch (constructor.type) {
            case 'var':
                return (window[constructor.trigger] === true);
                break;
            case 'id':
                return (document.getElementById(constructor.trigger) !== null);
                break;
            case 'class':
                return (wrapper.getElementsByClassName(constructor.trigger).length > 0);
                break;
            case 'query':
                return (wrapper.querySelectorAll(constructor.trigger).length > 0);
                break;
            case 'always':
            default:
                return true;
                break;
        }
    };

    var initConstructorOnElement = function (constructor, el) {
        var key = constructor.toLowerCase();
        if (!wf[key]) {
            var CFU = window[constructor];
            wf[key] = new CFU();
            wf[key].init();
        } else {
            if (wf[key].initOnElement) {
                wf[key].initOnElement(el)
            }
        }
    };

    var init = function () {
        loadScriptFile();
    };

    that.init = function () {
        init();
    };

    that.initConstructors = function (el) {
        initConstructors(el);
    };
    that.initConstructor = function (constructor) {
        initConstructor(constructor);
    };
    that.loadScript = function (src, fu) {
        fu = fu || function () {
            };
        loadScriptFile(src, fu);
    };
    that.initConstructorOnElement = function (constructor, el) {
        initConstructorOnElement(constructor, el);
    }
};
