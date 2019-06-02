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
			[ 'Be careful!', 'color:red; font-size:120%; line-height: 180%' ],
			[ 'If someone told you to copy and paste something here, it very well could be a scam and may grant them access to your account.', 'font-size:120%; line-height: 150%' ],
			[ '> Type %c selfxxs %c into this console to learn more', 'font-style:italic; line-height: 150%', 'font-family:monospace; border:1px solid; line-height: 150%', 'font-style:italic; line-height: 150%' ],
		];
		const explenation = [
			[ 'What is Self XXS?', 'font-weight:bold; font-size:120%; line-height: 150%' ],
			[ 'A Self-XSS scam tricks you into compromising your account by claiming to provide some kind of reward, after pasting a special code or link into your web browser.\nIn reality - it can execute code on your behalf with full privileges to anything you have access to yourself.\nThis kind of scam can often result in your account being compromised.\nNever follow such instructions from people you do not know and trust.', '' ],
		];

		setTimeout(() => console.log(...map(messages)), 1000);
		Object.defineProperty(window, 'selfxxs', {
			get: () => console.log(...map(explenation))
		})

		window.removeEventListener('resize', callback);
	});

	window.addEventListener('resize', callback);
	callback();
}
