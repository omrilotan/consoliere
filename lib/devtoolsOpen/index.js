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
export const devtoolsOpen = () => panelOpen() || firebugInitialized();
