/* eslint-env jest */
import infiniteApplication from './infiniteApplication.js';

describe('infiniteApplication', () => {
	describe('The "Contstructor" function', () => {
		const testFn = (a, b) => a+b;
		test('It is defined', () => {
			expect(infiniteApplication).toBeDefined();
		});
		test('It is a function', () => {
			expect(typeof infiniteApplication).toBe('function');
		});
		test('It throws an error when called but not passed anything', () => {
			expect(() => infiniteApplication()).toThrowError(/^infiniteApplication expects to be called with a function as the first argument.$/);
		});
		test('It throws an error when being with anything other than a function as the first arg', () => {
			const missingFnError = /^infiniteApplication expects to be called with a function as the first argument.$/;
			expect(() => infiniteApplication(null)).toThrowError(missingFnError);
			expect(() => infiniteApplication(true)).toThrowError(missingFnError);
			expect(() => infiniteApplication(3)).toThrowError(missingFnError);
			expect(() => infiniteApplication('test')).toThrowError(missingFnError);
			expect(() => infiniteApplication({hello: 'world'})).toThrowError(missingFnError);
			expect(() => infiniteApplication(['hello', 'world'])).toThrowError(missingFnError);
			expect(() => infiniteApplication(new Date())).toThrowError(missingFnError);
		});
		test('It does not throw an error when called with a function', () => {
			expect(() => infiniteApplication(testFn)).not.toThrowError();
		});
		test('It returns a function when called with a function', () => {
			const wrappedFn = infiniteApplication(testFn);
			expect(typeof wrappedFn).toBe('function');
		});
		test('If the second arg is not `undefined` or a boolean it will throw an error', () => {
			const badSecondArgError = /^infiniteApplication expects that a second argument, if present, be a boolean.$/;
			expect(() => infiniteApplication(testFn, null)).toThrowError(badSecondArgError);
			expect(() => infiniteApplication(testFn, 3)).toThrowError(badSecondArgError);
			expect(() => infiniteApplication(testFn, 'test')).toThrowError(badSecondArgError);
			expect(() => infiniteApplication(testFn, {hello: 'world'})).toThrowError(badSecondArgError);
			expect(() => infiniteApplication(testFn, ['hello', 'world'])).toThrowError(badSecondArgError);
			expect(() => infiniteApplication(testFn, new Date())).toThrowError(badSecondArgError);
		});
		test('It does not throw an error when the second arg is a boolean or undefined', () => {
			expect(() => infiniteApplication(testFn)).not.toThrowError();
			expect(() => infiniteApplication(testFn, true)).not.toThrowError();
		});
	});
	describe('The wrapped function', () => {
		describe('Common functionality to both plain and config arg versions', () => {
			const testModule = {
				testMethod: () => {}
			};
			const spy = jest.spyOn(testModule, 'testMethod');
			afterEach(() => {
				spy.mockClear();
			});
			test('The original function will be called if the wrapped function is called without any args.', () => {
				const wrappedMethod = infiniteApplication(testModule.testMethod);
				expect(spy).not.toHaveBeenCalled();
				wrappedMethod();
				expect(spy).toHaveBeenCalled();
			});
			test('The original function will not be called if the wrapped function is called with any args (including `undefined` and `null`).', () => {
				const wrappedMethod = infiniteApplication(testModule.testMethod);
				expect(spy).not.toHaveBeenCalled();
				wrappedMethod(null);
				expect(spy).not.toHaveBeenCalled();
				wrappedMethod(3);
				expect(spy).not.toHaveBeenCalled();
				wrappedMethod('test');
				expect(spy).not.toHaveBeenCalled();
				wrappedMethod({hello: 'world'});
				expect(spy).not.toHaveBeenCalled();
				wrappedMethod(['hello', 'world']);
				expect(spy).not.toHaveBeenCalled();
				wrappedMethod(new Date());
				expect(spy).not.toHaveBeenCalled();
				wrappedMethod(true);
				expect(spy).not.toHaveBeenCalled();
			});
		});
		describe('For the plain args (called w/ no second arg) wrapped fn version', () => {
			const testFn = function () {
				return [...arguments];
			};
			let wrappedTestFn;
			beforeEach(() => {
				wrappedTestFn = infiniteApplication(testFn);
			});
			test('It will take single args passed and apply them when the function is finally invoked', () => {
				wrappedTestFn(3);
				wrappedTestFn('test');
				wrappedTestFn(true);
				wrappedTestFn({hello: 'world'});
				wrappedTestFn(null);
				wrappedTestFn(undefined);
				expect(wrappedTestFn()).toEqual([3, 'test', true, {hello: 'world'}, null, undefined]);
			});
			test('It will take multiple args passed and apply them when the function is finally invoked', () => {
				wrappedTestFn(3);
				wrappedTestFn('test', true);
				expect(wrappedTestFn()).toEqual([3, 'test', true]);
			});
			test('It will take any arguments passed to the initial wrapper beyond the first two and cache them as part of the partial application, and apply them when the function is finally invoked', () => {
				wrappedTestFn = infiniteApplication(testFn, false, 'apple', 'orange');
				wrappedTestFn('pear');
				wrappedTestFn('bear!');
				expect(wrappedTestFn()).toEqual(['apple', 'orange', 'pear', 'bear!']);
			});
			test('It will return itself when called with new arguments', () => {
				const fnReturn = wrappedTestFn(3);
				expect(wrappedTestFn).toBe(fnReturn);
				expect(fnReturn(false, 'doctor')()).toEqual([3, false, 'doctor']);
			});
		});
		describe('For config args', () => {
			let testConfigFn = function (argsConfig) {
				return argsConfig;
			};
			let wrappedTestFn;
			beforeEach(() => {
				wrappedTestFn = infiniteApplication(testConfigFn, true);
			});
			test('If passing the `true` as the second arg to the wrapper, subsequent object args will be cached and applied when the function is finally invoked', () => {
				wrappedTestFn({main: 'veggie burger'});
				wrappedTestFn({
					side: 'french fries',
					beverage: 'milk shake'
				});
				expect(wrappedTestFn()).toEqual({
					side: 'french fries',
					beverage: 'milk shake',
					main: 'veggie burger',
				});
			});
			test('It can take multiple args passed and will extend them in, in order', () => {
				wrappedTestFn({main: 'veggie burger'}, {side: 'french fries'}, {beverage: 'milk shake'});
				expect(wrappedTestFn()).toEqual({
					side: 'french fries',
					beverage: 'milk shake',
					main: 'veggie burger',
				});
			});
			test('New args using the same property names will simply override previous values', () => {
				wrappedTestFn({
					main: 'veggie burger',
					side: 'french fries',
					beverage: 'milk shake'
				});
				wrappedTestFn({side: 'cheese curds'});
				expect(wrappedTestFn()).toEqual({
					side: 'cheese curds',
					beverage: 'milk shake',
					main: 'veggie burger',
				});
			});
			test('It will take any arguments passed to the initial wrapper beyond the first two and cache them as part of the partial application, and apply them when the function is finally invoked', () => {
				wrappedTestFn = infiniteApplication(testConfigFn, true, {safe: 1627}, {euclid: 1975, keter: 725});
				wrappedTestFn({thaumiel: 75});
				expect(wrappedTestFn()).toEqual({
					safe: 1627,
					euclid: 1975,
					keter: 725,
					thaumiel: 75,
				});
			});
			test('It will return itself when called with new arguments', () => {
				const fnReturn = wrappedTestFn({light: 'dark'});
				expect(wrappedTestFn).toBe(fnReturn);
				expect(fnReturn({up: 'down'})()).toEqual({
					light: 'dark',
					up: 'down'
				});
			});
			test('If passed non-object args, an error will be thrown', () => {
				expect(() => wrappedTestFn(3)).toThrowError(/^infiniteApplication expects objects as subsequent args when using `useConfigForArgs` mode$/);
			});
		});
		describe('Multiple Instances', () => {
			test('Multiple instances of the same type can be maintained without any issue', () => {
				const testFn = function () {
					return [...arguments];
				};
				const testFn2 = function () {
					return ([...arguments]).join(' ');
				};
				const wrappedOne = infiniteApplication(testFn, false, 'King', 'Bidgood\'s');
				const wrappedTwo = infiniteApplication(testFn2);

				wrappedOne('in', 'the', 'bathtub', 'and', 'he', 'won\'t', 'come', 'out');
				wrappedTwo('A', 'sick', 'day', 'for', 'amos', 'mcgee');

				expect(wrappedOne()).toEqual(['King', 'Bidgood\'s', 'in', 'the', 'bathtub', 'and', 'he', 'won\'t', 'come', 'out']);
				expect(wrappedTwo()).toBe('A sick day for amos mcgee');
			});
		});
	});
});