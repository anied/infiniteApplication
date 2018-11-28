function infiniteApplication(fn, useConfigForArgs, ...initialArgs) {
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