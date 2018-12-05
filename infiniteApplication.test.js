/* eslint-env jest */
import infiniteApplication from './infiniteApplication.js';

describe('infiniteApplication', () => {
	describe('The "Contstructor" function', () => {
		test('It is defined', () => {
			expect(infiniteApplication).toBeDefined();
		});
		test('It is a function', () => {
			expect(typeof infiniteApplication).toBe('function');
		});
		xtest('It throws an error when called but not passed anything', () => {});
		xtest('It throws an error when being with anything other than a function as the first arg', () => {});
	})
	xdescribe('The wrapped function', () => {
		xdescribe('For plain args', () => {});
		xdescribe('For config args', () => {});
		xdescribe('Common functionality to both plain and config arg versions', () => {});
	});
});