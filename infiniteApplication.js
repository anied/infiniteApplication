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
		cachedArgs = Object.assign({}, ...initialArgs);
	} else {
		cachedArgs = [...initialArgs];
	}

	const infiniteApplicationWrappedFunction = function () {
		if (arguments.length === 0) {
			if (useConfigForArgs) {
				return fn.call(null, cachedArgs);
			} else {
				return fn.apply(null, cachedArgs);
			}
		}

		if (useConfigForArgs) {
			for (const arg of arguments) {
				if(typeof arg !== 'object' || arg === null) {
					throw new Error('infiniteApplication expects objects as subsequent args when using `useConfigForArgs` mode');
				}
			}
			Object.assign(cachedArgs, ...arguments);
		} else {
			cachedArgs.push(...arguments);
		}

		return infiniteApplicationWrappedFunction;
	};

	return infiniteApplicationWrappedFunction;
}

export default infiniteApplication;