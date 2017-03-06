wf.lib.CountDown = function () {
    var that = this,
        clock,
        interval,
        deadline;

    var getTimeRemaining = function () {
        var t = Date.parse(deadline) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            days = Math.floor(t / (1000 * 60 * 60 * 24));

        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    };

    var initElements = function () {
        clock = document.getElementById('countDown');
        clock.wf = {
            day: clock.querySelector('.days'),
            hour: clock.querySelector('.hours'),
            minutes: clock.querySelector('.minutes'),
            second: clock.querySelector('.seconds')
        };
        deadline = new Date(2017,2,12,20,0,0,0);
        updateCountDown();
        interval = setInterval(updateCountDown, 1000);
    };

    var updateCountDown = function() {
        var t = getTimeRemaining();

        clock.wf.day.innerHTML = t.days;
        clock.wf.hour.innerHTML = ('0' + t.hours).slice(-2);
        clock.wf.minutes.innerHTML = ('0' + t.minutes).slice(-2);
        clock.wf.second.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(interval);
        }
    };

    var init = function () {
        initElements();
    };

    that.init = function () {
        init();
    }
};