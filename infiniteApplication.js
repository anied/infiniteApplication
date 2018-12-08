function infiniteApplication(fn, useConfigForArgs, ...initialArgs) {

	if (typeof fn !== 'function') {
		throw new Error('infiniteApplication expects to be called with a function as the first argument.');
	}

	if (typeof useConfigForArgs === 'undefined') {
		useConfigForArgs = false;
	}

	if (typeof useConfigForArgs !== 'boolean') {
		throw new Error('infiniteApplication expects that a second argument, if present, be a boolean.');
	}

	let cachedArgs;
	if (useConfigForArgs) {
		cachedArgs = Object.assign({}, initialArgs[0]);
	} else {
		cachedArgs = [...initialArgs];
	}

	return function (args) {
		if (arguments.length === 0) {
			return fn(cachedArgs);
		}

		if (useConfigForArgs) {
			Object.assign(cachedArgs, args);
		} else {
			cachedArgs.push(...arguments);
		}
	}
}

export default infiniteApplication;