(function (window) {
    var devtools;

    // Update each window resize event
    window.addEventListener('resize', debounce(detectDevTools));

    // Allow to trigger 'devtools' event
    window.addEventListener('trigger-devtools', debounce(detectDevTools));

    function detectDevTools (e) {
        var conditions = [

                // width diff
                (window.outerWidth - window.innerWidth > 150),

                // height diff
                (window.outerHeight - window.innerHeight > 150),

                // Firebug initialized
                (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized)
            ],
            before = devtools;

        // We only assume whether dev tools are open
        devtools = conditions.indexOf(true) !== -1;

        // Only if status has changed, trigger the event
        if (devtools !== before) {
            window.dispatchEvent(new CustomEvent("devtools", { detail: { devtools: devtools } }));
        }
    };
}(window));

function debounce(subscriber, delay = 200) {
    let timer = 0;

    function debounced() {
        clearTimeout(timer);
        let args = arguments;
        [].unshift.call(args, this);

        timer = setTimeout(Function.prototype.bind.apply(register, args), delay);
    }

    function register() {
        timer = 0;
        subscriber.apply(this, arguments);
    }
    return debounced;
};