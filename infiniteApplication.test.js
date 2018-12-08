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
		xdescribe('Common functionality to both plain and config arg versions', () => {});
		xdescribe('For plain args (called w/ no second arg)', () => {
			// expect('Each time it is called with args, they are appended')
		});
		xdescribe('For config args', () => {});
	});
});