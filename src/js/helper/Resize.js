var Resize = function () {
    var that = this,
        isActive = false,
        listener = [],
        listenerLength = 0;

    that.windowSizes = {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
    that.windowSizes.maxSize = Math.max(that.windowSizes.width, that.windowSizes.height);

    var resize = function (e) {
        that.windowSizes.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        that.windowSizes.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        that.windowSizes.maxSize = Math.max(that.windowSizes.width, that.windowSizes.height);

        var i = 0;
        for (; i < listenerLength; i++) {
            var fu = listener[i];
            fu();
        }
    };

    /**
     * public function to trigger private resize function
     */
    that.triggerResize = function () {
        resize();
    };

    that.registerListener = function (fu) {
        listener.push(fu);
        listenerLength++;
    };

    that.removeListener = function (fu) {
        var i = listener.indexOf(fu);
        listener.splice(i, 1);
        listenerLength--;
    };

    that.initResizeEvent = function () {
        if (!isActive) {
            initResizeEvent();
            isActive = true;
        }
    };

    var init = function () {
        resize();
    };

    that.init = function () {
        init();
    };
};
