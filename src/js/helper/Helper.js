wf.lib.Helper = function () {
    wf.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    /**
     * Browser Prefixes for using in JS
     * @returns {{dom: *, lowercase: (string|*), css: string, js: string}}
     */
    wf.getPrefix = function () {
        var styles = window.getComputedStyle(document.documentElement, ''),
            pre = (Array.prototype.slice
                    .call(styles)
                    .join('')
                    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
            )[1];
        wf.jsPrefix = wf.capitalizeFirstLetter(pre);
    };
    wf.getPrefix();

    wf.getPrefixedStyle = function (style) {
        if (wf.jsPrefix.length > 1) {
            return wf.jsPrefix + wf.capitalizeFirstLetter(style);
        }
    };

    /**
     * save Delay function
     */
    wf.delay = function () {
        var delayTimer = 0;
        return function (callback, ms) {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(callback, ms)
        }
    }();

    /**
     * Get Cookie Value
     * @string cookie
     * @returns {*}
     */
    wf.getCookie = function (cName) {
        var name = cName + '=',
            cookieArr = document.cookie.split(';');
        for (var i = 0; i < cookieArr.length; i++) {
            var cookie = cookieArr[i].trim();
            if (cookie.indexOf(name) == 0)
                return cookie.substring(name.length, cookie.length) || false;
        }
        return false;
    };

    /**
     *
     * @string cName Name of Cookie
     * @string cVal Cookie Value
     * @int exdays lifetime
     */
    wf.setCookie = function (cName, cVal, lifetime, domain) {
        var d = new Date(),
            exdays = lifetime || 30;
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = (lifetime === false) ? 'Session' : d.toUTCString(),
            cookie = cName + '=' + cVal + '; expires=' + expires + '; path=/;';
        if (domain) {
            cookie += ' domain=' + domain + ''
        }
        document.cookie = cookie;
    };

    wf.getHashParams = function () {
        var hash = location.hash;
        hash = hash.replace('#', '');
        if (hash.length > 0) {
            var hashes = hash.split('&'),
                i = 0,
                l = hashes.length;
            if (hash.indexOf('=') !== -1) {
                var params = {};
                for (; i < l; i++) {
                    var str = hashes[i],
                        keyVal = str.split('='),
                        val = keyVal[1].replace(/\+/g, ' ');
                    params[keyVal[0]] = val;
                }
                return params;
            }
            return hash.replace(/\+/g, ' ');
        }
        return false;
    };

    wf.getHashParam = function (key) {
        var params = wf.getHashParams();
        if (typeof params === 'object') {
            return params[key] || false;
        } else {
            return params;
        }
    };

    /**
     * get alls URL Parameters
     * @returns {{}}
     */
    wf.getQueryParams = function () {
        var search = document.location.search,
            params = {}, tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;
        search = search.replace(/\+/g, ' ');

        while (tokens = re.exec(search)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
    };

    /**
     * get URL Parameter
     * @param key
     * @returns {*}
     */
    wf.getQueryParam = function (key) {
        var query = wf.getQueryParams();

        if (key in query)
            return query[key];

        return false;
    };

    /**
     * set URL Parameter
     * @param key
     * @param value
     */
    wf.setQueryParam = function (key, value) {
        var query = wf.getQueryParams();

        if (query[key] !== value) {
            value = value.replace(/\s/g, '+');
            query[key] = value;
            var search = buildSearch(query),
                url = document.location.href.split('?')[0];
            url += search + document.location.hash;
            wf.setLocationHistory(url);
        }
    };

    /**
     * set URL Parameter
     * @param key
     * @param value
     */
    wf.removeQueryParam = function (key) {
        var query = wf.getQueryParams();
        if (key in query) {
            delete query[key];
            var search = buildSearch(query),
                url = document.location.href.split('?')[0];
            url += search + document.location.hash;
            wf.setLocationHistory(url);
        }
    };

    /**
     * helper function for setQueryParam and removeQueryParam
     * @param query
     * @returns {string}
     */
    var buildSearch = function (query) {
        var search = '',
            i = 0;

        for (oKey in query) {
            var oValue = query[oKey],
                seperator = '&';
            if (i === 0) {
                seperator = '?'
            }
            i++;
            search += seperator + oKey + '=' + oValue;
        }
        return search;
    };

    /**
     * returns the parend DOM Element
     *
     * @param node position to search recursive
     * @param parentClass class from parent element as inicator
     * @returns {*}
     */
    wf.getParentElement = function (node, parentClass) {
        var parent = node.parentNode;
        if (parent.className.indexOf(parentClass) !== -1) {
            return parent;
        } else {
            if (parent.nodeName === 'BODY') {
                return false;
            } else {
                return wf.getParentElement(parent, parentClass);
            }
        }
    };

    /**
     * returns the max screen with
     * @returns int
     */
    wf.getMaxScreenWidth = function () {
        if (wf.isMobile) {
            return Math.max(screen.width, screen.height);
        } else {
            return screen.width;
        }
    };

    wf.cloneObj = function (obj) {
        if (obj == null || typeof(obj) !== 'object')
            return obj;

        var temp = {};

        for (var key in obj) {
            temp[key] = obj[key];
        }
        return temp;
    };

    wf.toggleClass = function (obj, className) {
        if (!obj) {
            return;
        }

        className = className || 'active';
        if (obj.className.indexOf(className) === -1) {
            className = ' ' + className;
            obj.className += className;
            obj.className = obj.className.trim()
        } else {
            obj.className = obj.className.replace(className, '');
        }
    };

    wf.random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
};














