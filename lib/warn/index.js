import { devtoolsOpen } from '../devtoolsOpen/index.js';
import { debounce } from '../debounce/index.js';

export function warn() {
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
