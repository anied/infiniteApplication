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
			expect(() => {infiniteApplication(null)}).toThrowError(/^infiniteApplication expects to be called with a function as the first argument.$/);
			expect(() => {infiniteApplication(3)}).toThrowError(/^infiniteApplication expects to be called with a function as the first argument.$/);
			expect(() => {infiniteApplication('test')}).toThrowError(/^infiniteApplication expects to be called with a function as the first argument.$/);
			expect(() => {infiniteApplication({hello: 'world'})}).toThrowError(/^infiniteApplication expects to be called with a function as the first argument.$/);
			expect(() => {infiniteApplication(['hello', 'world'])}).toThrowError(/^infiniteApplication expects to be called with a function as the first argument.$/);
			expect(() => {infiniteApplication(new Date())}).toThrowError(/^infiniteApplication expects to be called with a function as the first argument.$/);
		});
		test('It does not throw an error when called with a function', () => {
			expect(() => { infiniteApplication(testFn) }).not.toThrowError();
		});
		test('It returns a function when called with a function', () => {
			const wrappedFn = infiniteApplication(testFn);
			expect(typeof wrappedFn).toBe('function');
		});
	})
	xdescribe('The wrapped function', () => {
		xdescribe('For plain args', () => {});
		xdescribe('For config args', () => {});
		xdescribe('Common functionality to both plain and config arg versions', () => {});
	});
});