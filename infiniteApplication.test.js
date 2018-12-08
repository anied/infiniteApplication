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
			expect(() => {infiniteApplication()}).toThrowError(/^infiniteApplication expects to be called with a function as the first argument.$/);
		});
		test('It throws an error when being with anything other than a function as the first arg', () => {
			const missingFnError = /^infiniteApplication expects to be called with a function as the first argument.$/;
			expect(() => {infiniteApplication(null)}).toThrowError(missingFnError);
			expect(() => {infiniteApplication(true)}).toThrowError(missingFnError);
			expect(() => {infiniteApplication(3)}).toThrowError(missingFnError);
			expect(() => {infiniteApplication('test')}).toThrowError(missingFnError);
			expect(() => {infiniteApplication({hello: 'world'})}).toThrowError(missingFnError);
			expect(() => {infiniteApplication(['hello', 'world'])}).toThrowError(missingFnError);
			expect(() => {infiniteApplication(new Date())}).toThrowError(missingFnError);
		});
		test('It does not throw an error when called with a function', () => {
			expect(() => { infiniteApplication(testFn) }).not.toThrowError();
		});
		test('It returns a function when called with a function', () => {
			const wrappedFn = infiniteApplication(testFn);
			expect(typeof wrappedFn).toBe('function');
		});
		test('If the second arg is not `undefined` or a boolean it will throw an error', () => {
			const badSecondArgError = /^infiniteApplication expects that a second argument, if present, be a boolean.$/;
			expect(() => {infiniteApplication(testFn, null)}).toThrowError(badSecondArgError);
			expect(() => {infiniteApplication(testFn, 3)}).toThrowError(badSecondArgError);
			expect(() => {infiniteApplication(testFn, 'test')}).toThrowError(badSecondArgError);
			expect(() => {infiniteApplication(testFn, {hello: 'world'})}).toThrowError(badSecondArgError);
			expect(() => {infiniteApplication(testFn, ['hello', 'world'])}).toThrowError(badSecondArgError);
			expect(() => {infiniteApplication(testFn, new Date())}).toThrowError(badSecondArgError);
		});
		test('It does not throw an error when the second arg is a boolean or undefined', () => {
			expect(() => {infiniteApplication(testFn)}).not.toThrowError();
			expect(() => {infiniteApplication(testFn, true)}).not.toThrowError();
		});
	})
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
				expect(wrappedTestFn()).toEqual([3, 'test', true]);
			});
		});
		xdescribe('For config args', () => {});
	});
});