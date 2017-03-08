wf.lib.Parallax = function () {
    var that = this,
        headerHeight,
        visibleArea,
        containers;

    var initEvents = function () {
        window.addEventListener('scroll', scrolling);
    };

    var initElements = function () {
        var pageHeader = document.getElementById('pageHeader');
        headerHeight = pageHeader.offsetHeight;
        visibleArea = wf.resize.windowSizes.height - headerHeight;
        containers = document.getElementsByClassName('parallax');
        var i = 0,
            l = containers.length;
        for (; i < l; i++) {
            initContainer(containers[i]);
        }

    };

    var initContainer = function (container) {
        container.wf = {
            rect: {
                top: container.offsetTop,
                height: container.offsetHeight
            },
            img: container.querySelector('img'),
            addScreenHeight: (container.offsetTop > visibleArea)
        };
        container.wf.rect.bottom = container.wf.rect.top + container.wf.rect.height;
        if(container.wf.img){
            container.wf.imgPercentage = getPercentage(container);
        }
    };

    var scrolling = function () {
        var scrollTop = document.body.scrollTop,
            i = 0,
            l = containers.length;
        for (; i < l; i++) {
            var container = containers[i];
            if(container.wf.rect.top < (scrollTop + wf.resize.windowSizes.height) && container.wf.rect.bottom > (scrollTop + headerHeight)) {
                container.wf.img.style.marginTop = getImageMargin(container, scrollTop);
            }
        }
};

    var getImageMargin = function (container, scrollTop) {
        var W = container.wf.addScreenHeight
                ? scrollTop + wf.resize.windowSizes.height - container.offsetTop + headerHeight
                : scrollTop + container.offsetTop - headerHeight,
            m = Math.round(container.wf.imgPercentage * W * -10) / 10;

        return m + 'px'
    };

    var getPercentage = function (container) {
        var duration = container.wf.addScreenHeight ? (visibleArea + container.wf.rect.height) : container.offsetTop - headerHeight,
            diff = container.wf.img.offsetHeight -  container.wf.rect.height;
        duration += container.wf.rect.height;
        return diff / duration;
    };

    var init = function () {
        initElements();
        initEvents();
        scrolling();
    };
    that.init = function () {
        init();
    };
};