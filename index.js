"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.object.assign");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function infiniteApplication(fn, useConfigForArgs) {
  for (var _len = arguments.length, initialArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    initialArgs[_key - 2] = arguments[_key];
  }

  if (typeof fn !== 'function') {
    throw new Error('infiniteApplication expects to be called with a function as the first argument.');
  }

  if (typeof useConfigForArgs === 'undefined') {
    useConfigForArgs = false;
  }

  if (typeof useConfigForArgs !== 'boolean') {
    throw new Error('infiniteApplication expects that a second argument, if present, be a boolean.');
  }

  var cachedArgs;

  if (useConfigForArgs) {
    cachedArgs = Object.assign.apply(Object, [{}].concat(initialArgs));
  } else {
    cachedArgs = [].concat(initialArgs);
  }

  var infiniteApplicationWrappedFunction = function infiniteApplicationWrappedFunction() {
    if (arguments.length === 0) {
      if (useConfigForArgs) {
        return fn.call(null, cachedArgs);
      } else {
        return fn.apply(null, cachedArgs);
      }
    }

    if (useConfigForArgs) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var arg = _step.value;

          if (_typeof(arg) !== 'object' || arg === null) {
            throw new Error('infiniteApplication expects objects as subsequent args when using `useConfigForArgs` mode');
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      Object.assign.apply(Object, [cachedArgs].concat(Array.prototype.slice.call(arguments)));
    } else {
      var _cachedArgs;

      (_cachedArgs = cachedArgs).push.apply(_cachedArgs, arguments);
    }

    return infiniteApplicationWrappedFunction;
  };

  return infiniteApplicationWrappedFunction;
}

var _default = infiniteApplication;
exports["default"] = _default;
