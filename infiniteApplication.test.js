/* eslint-env jest */
import infiniteApplication from './infiniteApplication.js';

describe('infiniteApplication', () => {
	test('It is defined', () => {
		expect(infiniteApplication).toBeDefined();
	});
	test('It is a function', () => {
		expect(typeof infiniteApplication).toBe('function');
	});
});