/**
 * Lazy loading for Images
 * replace al placeholder with images
 *
 * @constructor
 */
var LazyImageLoader = function () {
    var that = this,
        dataSelector = 'data-src',
        threshold = 500,
        placeholders,
        placeholdersLength;

    var isInLoadableArea = function (placeholder) {
        var viewPortSice = wf.resize.windowSizes.maxSize,
            placeholderBound = placeholder.getBoundingClientRect();
        return ((viewPortSice + threshold) > placeholderBound.top) && (-threshold < placeholderBound.bottom);
    };

    /**
     * gets all placeholders
     */
    var initImages = function () {
        placeholders = document.querySelectorAll('img[' + dataSelector + ']');
        placeholdersLength = placeholders.length;
        loadImages();
    };

    var scrollEvent = function () {
        window.attachEvent('scroll', function () {
            wf.delay(loadImages, 200);
        });
    };

    var loadImages = function () {
        var i = 0;
        for (; i < placeholdersLength; i++) {
            var placeholder = placeholders[i];
            if (!placeholder.loaded && isInLoadableArea(placeholder)) {
                loadImage(placeholder, i);
            }
        }
    };

    /**
     * Load Image
     * @param placeholder
     * @param i
     */
    var loadImage = function (placeholder, i) {
        var img = new Image();
        placeholders[i].loaded = true;
        onLoaded(img, placeholder, i);
        img.src = placeholder.getAttribute(dataSelector);
    };

    /**
     * on Image is loading: Replace placeholder with image
     *
     * @param img
     * @param placeholder
     */
    var onLoaded = function (img, placeholder) {
        img.onload = function () {
            placeholder.src = img.src;
            this.removeEventListener('load');
        };
    };

    that.init = function () {
        init();
    };

    that.loadImages = function () {
        loadImages();
    };

    /**
     * initialize constructor
     * self-executing!
     */
    var init = function () {
        initImages();
        scrollEvent();
    };

    that.init = function () {
        init();
    };
};
