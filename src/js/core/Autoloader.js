wf.lib.Autoloader = function () {
    var that = this,
        constructors = [
            {name: 'Helper', layoutOnly: true},
            {name: 'Resize', layoutOnly: true},
            {name: 'Parallax', layoutOnly: true},
            {name: 'CountDown', type: 'id', trigger: 'countDown'}
        ],
        head = document.getElementsByTagName('head')[0];

    var loadScriptFile = function (src, onLoad) {
        var script = document.createElement('script');
        script.onload = onLoad || initConstructors;
        script.src = src;
        head.appendChild(script);
    };

    var initConstructors = function (element) {
        var i = 0, l = constructors.length;
        element = element || document;
        for (; i < l; i++) {
            initConstructor(constructors[i], element);
        }
    };

    var initConstructor = function (constructor, element) {
        var key = constructor.shortKey || constructor.name.toLowerCase(),
            FU = wf.lib[constructor.name];
        element = element || document;
        if (checkConstructorInit(element, constructor) && typeof FU === 'function' && typeof wf[key] === 'undefined') {
            wf[key] = new FU();
            if (typeof wf[key].init === 'function') {
                wf[key].init();
            }
        }
    };

    var initConstructorOnElement = function (constructor, el) {
        var key = constructor.toLowerCase();
        if (!wf[key]) {
            var CFU = window[constructor];
            wf[key] = new CFU();
            wf[key].init();
        } else if (wf[key].initOnElement) {
            wf[key].initOnElement(el)
        }
    };

    var checkConstructorInit = function (element, constructor) {
        switch (constructor.type) {
            case 'var':
                return (window[constructor.trigger] === true);
                break;
            case 'id':
                return (document.getElementById(constructor.trigger) !== null);
                break;
            case 'class':
                return (element.getElementsByClassName(constructor.trigger).length > 0);
                break;
            case 'query':
                return (element.querySelectorAll(constructor.trigger).length > 0);
                break;
            case 'always':
            default:
                return true;
                break;
        }
    };

    var init = function () {
        loadScriptFile(wf.scriptFile);
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
        fu = fu || function () {};
        loadScriptFile(src, fu);
    };

    that.initConstructorOnElement = function (constructor, el) {
        initConstructorOnElement(constructor, el);
    }
};
