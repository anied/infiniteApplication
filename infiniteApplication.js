function infiniteApplication(fn) {
	const cachedArgs = {};
	return function (args, execute) {
		if (args && typeof args === 'object') {
			Object.assign(cachedArgs, args);
		}
		if (execute === true || args === true) { // if args is a boolean true we treat it as an execution
			fn(cachedArgs);
		}
	}
}