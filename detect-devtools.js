(function (window) {
    var debounce = function debounce (fn, delay) {
        var timer = 0,
            doit = function _doit () {
                timer = 0;
                fn();
            },
            later = function _later () {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(doit, (delay || 200));
            };
        return later;
    };

    var detectDevTools = function () {

            var conditions = [

                    // width diff
                    (window.outerWidth - window.innerWidth > 150),

                    // height diff
                    (window.outerHeight - window.innerHeight > 150),

                    // Firebug initialized
                    (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized)
                ],
                before = window.devtools;

            if (conditions.indexOf(true) !== -1) {

                // We assume dev tools are open
                window.devtools = true;
            } else {
                window.devtools = false;
            }

            // Only if status has changed, trigger the event
            if (window.devtools.open !== before) {
                window.dispatchEvent(new CustomEvent("devtools", { detail: { devtools: window.devtools.open } }));
            }
        };

    window.devtools = false;

    // Detect
    detectDevTools();

    // Update each window resize event
    window.addEventListener('resize', debounce(detectDevTools));
}(window));