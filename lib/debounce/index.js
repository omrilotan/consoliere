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
export function debounce(subscriber, delay = 200) {
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
};
