(function (window) {
    const debounced = debounce(detectDevTools);
    let devtools;

    // Update each window resize event
    window.addEventListener('resize', debounced);

    // Allow to trigger 'devtools' event
    window.addEventListener('trigger-devtools', debounced);

    function detectDevTools (e) {
        const conditions = [

                // width diff
                (window.outerWidth - window.innerWidth > 150),

                // height diff
                (window.outerHeight - window.innerHeight > 150),

                // Firebug initialized
                (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized)
            ];
        const before = devtools;

        // We only assume whether dev tools are open
        devtools = conditions.indexOf(true) !== -1;

        // Only if status has changed, trigger the event
        if (devtools !== before) {
            window.dispatchEvent(new CustomEvent("devtools", { detail: { devtools: devtools } }));
        }
    };
}(window));
