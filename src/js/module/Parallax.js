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
            img: container.querySelector('img')
        };
        container.wf.rect.bottom = container.wf.rect.top + container.wf.rect.height;
        if(container.wf.img){
            container.wf.imgPercentage = getPercentage(container);
        }

        console.log( container.wf.imgPercentage );
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
        var m = container.wf.imgPercentage * scrollTop;
        console.log( m );
        return (Math.round(m * -10) / 10) + 'px'
    };

    var getPercentage = function (container) {
        var duration = (container.offsetTop > visibleArea) ? visibleArea : (container.offsetTop + container.wf.rect.height) - headerHeight,
            diff = container.wf.img.offsetHeight -  container.wf.rect.height;
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