(function () {
	'use strict';

	/**
	 * Detect an open panel (assumed when outer window is significantly larger than inner window)
	 * @return {Boolean}
	 */
	const panelOpen = () => ['Width', 'Height'].some(
		measurement => window[`outer${measurement}`] - window[`inner${measurement}`] > 150
	);

	/**
	 * Detect Firebug available and initialised
	 * @return {Boolean}
	 */
	const firebugInitialized = () => window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized;

	/**
	 * Make an assumption whether the devtools are open
	 * @return {Boolean}
	 */
	const devtoolsOpen = () => panelOpen() || firebugInitialized();

	/**
	 * debounce a function
	 * @param  {Function} subscriber
	 * @param  {Number}   delay
	 * @return {Function}
	 *
	 * @example
	 *
	 * let cb = () => console.log(document.documentElement.scrollTop);
	 * cb = debounce(cb, 100);
	 * document.addEventListener('scroll', cb);
	 *
	 * // Will fire after scrolling has stopped for 100ms
	 */
	function debounce(subscriber, delay = 200) {
		let timer = 0;

		/**
		 * Call the function with a delay
		 * @param  {...Any} args
		 * @return {undefined}
		 */
		function debounced(...args) {
			clearTimeout(timer);

			timer = setTimeout(
				Function.prototype.bind.call(register, this, ...args),
				delay
			);
		}

		/**
		 * Wrap original function with a closure
		 * @param  {...Any} args
		 * @return {undefined}
		 */
		function register(...args) {
			timer = 0;
			subscriber.apply(this, args);
		}

		return debounced;
	}

	function warn() {
		const map = messages => messages.reduce(
			(accumulator, [text, ...styles]) => {
				accumulator[0] += `%c${text}`;
				accumulator.push(...styles);

				return accumulator;
			},
			['']
		);

		const callback = debounce(function() {
			const isOpen = devtoolsOpen();
			if (!isOpen) {
				return;
			}

			const messages = [
				[ 'Be careful with what you paste in here!', 'color:red; font-size:120%; font-weight:bold; line-height:180%' ],
				[ 'If someone told you to copy and paste something here, it very well could be a scam and may grant them access to your account.', 'font-size:120%; line-height:150%' ],
				[ '> Learn more about self XXS: %c https://en.wikipedia.org/wiki/Self-XSS ', 'line-height: 150%', 'font-family:monospace; border:1px solid; line-height:150%; background:black; color:white; border:1px solid white; border-radius:1em' ],
			];

			setTimeout(() => console.log(...map(messages)), 1000);

			window.removeEventListener('resize', callback);
		});

		window.addEventListener('resize', callback);
		callback();
	}

	warn();

}());
