(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * lodash 4.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var keysIn = require('lodash.keysin'),
    rest = require('lodash.rest');

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if ((!eq(objValue, value) ||
        (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object) {
  return copyObjectWith(source, props, object);
}

/**
 * This function is like `copyObject` except that it accepts a function to
 * customize copied values.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObjectWith(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : source[key];

    assignValue(object, key, newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return rest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = typeof customizer == 'function'
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null &&
    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array constructors, and
  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * function Bar() {
 *   this.d = 4;
 * }
 *
 * Foo.prototype.c = 3;
 * Bar.prototype.e = 5;
 *
 * _.assignIn({ 'a': 1 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
 */
var assignIn = createAssigner(function(object, source) {
  copyObject(source, keysIn(source), object);
});

module.exports = assignIn;

},{"lodash.keysin":2,"lodash.rest":4}],2:[function(require,module,exports){
/**
 * lodash 4.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var root = require('lodash._root');

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    stringTag = '[object String]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Reflect = root.Reflect,
    enumerate = Reflect ? Reflect.enumerate : undefined,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * The base implementation of `_.keysIn` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  object = object == null ? object : Object(object);

  var result = [];
  for (var key in object) {
    result.push(key);
  }
  return result;
}

// Fallback for IE < 9 with es6-shim.
if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
  baseKeysIn = function(object) {
    return iteratorToArray(enumerate(object));
  };
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null &&
    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array constructors, and
  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  var index = -1,
      isProto = isPrototype(object),
      props = baseKeysIn(object),
      propsLength = props.length,
      indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  while (++index < propsLength) {
    var key = props[index];
    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"lodash._root":3}],3:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to determine if values are of the language type `Object`. */
var objectTypes = {
  'function': true,
  'object': true
};

/** Detect free variable `exports`. */
var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
  ? exports
  : undefined;

/** Detect free variable `module`. */
var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
  ? module
  : undefined;

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(objectTypes[typeof self] && self);

/** Detect free variable `window`. */
var freeWindow = checkGlobal(objectTypes[typeof window] && window);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

/**
 * Used as a reference to the global object.
 *
 * The `this` value is used if it's the global object to avoid Greasemonkey's
 * restricted `window` object, otherwise the `window` object is used.
 */
var root = freeGlobal ||
  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
    freeSelf || thisGlobal || Function('return this')();

/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

module.exports = root;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
/**
 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  var length = args.length;
  switch (length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.rest(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function rest(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, array);
      case 1: return func.call(this, args[0], array);
      case 2: return func.call(this, args[0], args[1], array);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array constructors, and
  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3');
 * // => 3
 */
function toInteger(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  var remainder = value % 1;
  return value === value ? (remainder ? value - remainder : value) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3);
 * // => 3
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3');
 * // => 3
 */
function toNumber(value) {
  if (isObject(value)) {
    var other = isFunction(value.valueOf) ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = rest;

},{}],5:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;

},{}],6:[function(require,module,exports){
var Midinette = {
	NOTE_OFF              : 0x80,
	NOTE_ON               : 0x90,
	POLYPHONIC_AFTERTOUCH : 0xa0,
	CONTROL_CHANGE        : 0xb0,
	PROGRAM_CHANGE        : 0xc0,
	CHANNEL_AFTERTOUCH    : 0xd0,
	PITCH_WHEEL           : 0xe0,

	/*
	 * Note Off event.
	 * This message is sent when a note is released (ended).
	 */
	NOTE_OFF_CH1  : 0x80,
	NOTE_OFF_CH2  : 0x81,
	NOTE_OFF_CH3  : 0x82,
	NOTE_OFF_CH4  : 0x83,
	NOTE_OFF_CH5  : 0x84,
	NOTE_OFF_CH6  : 0x85,
	NOTE_OFF_CH7  : 0x86,
	NOTE_OFF_CH8  : 0x87,
	NOTE_OFF_CH9  : 0x88,
	NOTE_OFF_CH10 : 0x89,
	NOTE_OFF_CH11 : 0x8a,
	NOTE_OFF_CH12 : 0x8b,
	NOTE_OFF_CH13 : 0x8c,
	NOTE_OFF_CH14 : 0x8d,
	NOTE_OFF_CH15 : 0x8e,
	NOTE_OFF_CH16 : 0x8f,

	/*
	 * Note On event.
	 * This message is sent when a note is depressed (start).
	 */
	NOTE_ON_CH1  : 0x90,
	NOTE_ON_CH2  : 0x91,
	NOTE_ON_CH3  : 0x92,
	NOTE_ON_CH4  : 0x93,
	NOTE_ON_CH5  : 0x94,
	NOTE_ON_CH6  : 0x95,
	NOTE_ON_CH7  : 0x96,
	NOTE_ON_CH8  : 0x97,
	NOTE_ON_CH9  : 0x98,
	NOTE_ON_CH10 : 0x99,
	NOTE_ON_CH11 : 0x9a,
	NOTE_ON_CH12 : 0x9b,
	NOTE_ON_CH13 : 0x9c,
	NOTE_ON_CH14 : 0x9d,
	NOTE_ON_CH15 : 0x9e,
	NOTE_ON_CH16 : 0x9f,

	/*
	 * Polyphonic Key Pressure (Aftertouch).
	 * This message is most often sent by pressing down on the key after it
	 * "bottoms out".
	 */
	POLYPHONIC_AFTERTOUCH_CH1  : 0xa0,
	POLYPHONIC_AFTERTOUCH_CH2  : 0xa1,
	POLYPHONIC_AFTERTOUCH_CH3  : 0xa2,
	POLYPHONIC_AFTERTOUCH_CH4  : 0xa3,
	POLYPHONIC_AFTERTOUCH_CH5  : 0xa4,
	POLYPHONIC_AFTERTOUCH_CH6  : 0xa5,
	POLYPHONIC_AFTERTOUCH_CH7  : 0xa6,
	POLYPHONIC_AFTERTOUCH_CH8  : 0xa7,
	POLYPHONIC_AFTERTOUCH_CH9  : 0xa8,
	POLYPHONIC_AFTERTOUCH_CH10 : 0xa9,
	POLYPHONIC_AFTERTOUCH_CH11 : 0xaa,
	POLYPHONIC_AFTERTOUCH_CH12 : 0xab,
	POLYPHONIC_AFTERTOUCH_CH13 : 0xac,
	POLYPHONIC_AFTERTOUCH_CH14 : 0xad,
	POLYPHONIC_AFTERTOUCH_CH15 : 0xae,
	POLYPHONIC_AFTERTOUCH_CH16 : 0xaf,

	/*
	 * Control Change.
	 * This message is sent when a controller value changes. Controllers include
	 * devices such as pedals and levers. Controller numbers 120-127 are
	 * reserved as "Channel Mode Messages".
	 */
	CONTROL_CHANGE_CH1  : 0xb0,
	CONTROL_CHANGE_CH2  : 0xb1,
	CONTROL_CHANGE_CH3  : 0xb2,
	CONTROL_CHANGE_CH4  : 0xb3,
	CONTROL_CHANGE_CH5  : 0xb4,
	CONTROL_CHANGE_CH6  : 0xb5,
	CONTROL_CHANGE_CH7  : 0xb6,
	CONTROL_CHANGE_CH8  : 0xb7,
	CONTROL_CHANGE_CH9  : 0xb8,
	CONTROL_CHANGE_CH10 : 0xb9,
	CONTROL_CHANGE_CH11 : 0xba,
	CONTROL_CHANGE_CH12 : 0xbb,
	CONTROL_CHANGE_CH13 : 0xbc,
	CONTROL_CHANGE_CH14 : 0xbd,
	CONTROL_CHANGE_CH15 : 0xbe,
	CONTROL_CHANGE_CH16 : 0xbf,

	/*
	 * Program Change.
	 * This message sent when the patch number changes.
	 */
	PROGRAM_CHANGE_CH1  : 0xc0,
	PROGRAM_CHANGE_CH2  : 0xc1,
	PROGRAM_CHANGE_CH3  : 0xc2,
	PROGRAM_CHANGE_CH4  : 0xc3,
	PROGRAM_CHANGE_CH5  : 0xc4,
	PROGRAM_CHANGE_CH6  : 0xc5,
	PROGRAM_CHANGE_CH7  : 0xc6,
	PROGRAM_CHANGE_CH8  : 0xc7,
	PROGRAM_CHANGE_CH9  : 0xc8,
	PROGRAM_CHANGE_CH10 : 0xc9,
	PROGRAM_CHANGE_CH11 : 0xca,
	PROGRAM_CHANGE_CH12 : 0xcb,
	PROGRAM_CHANGE_CH13 : 0xcc,
	PROGRAM_CHANGE_CH14 : 0xcd,
	PROGRAM_CHANGE_CH15 : 0xce,
	PROGRAM_CHANGE_CH16 : 0xcf,

	/*
	 * Channel Pressure (After-touch).
	 * This message is most often sent by pressing down on the key after it
	 * "bottoms out". This message is different from polyphonic after-touch. Use
	 * this message to send the single greatest pressure value (of all the
	 * current depressed keys).
	 */
	CHANNEL_AFTERTOUCH_CH1  : 0xd0,
	CHANNEL_AFTERTOUCH_CH2  : 0xd1,
	CHANNEL_AFTERTOUCH_CH3  : 0xd2,
	CHANNEL_AFTERTOUCH_CH4  : 0xd3,
	CHANNEL_AFTERTOUCH_CH5  : 0xd4,
	CHANNEL_AFTERTOUCH_CH6  : 0xd5,
	CHANNEL_AFTERTOUCH_CH7  : 0xd6,
	CHANNEL_AFTERTOUCH_CH8  : 0xd7,
	CHANNEL_AFTERTOUCH_CH9  : 0xd8,
	CHANNEL_AFTERTOUCH_CH10 : 0xd9,
	CHANNEL_AFTERTOUCH_CH11 : 0xda,
	CHANNEL_AFTERTOUCH_CH12 : 0xdb,
	CHANNEL_AFTERTOUCH_CH13 : 0xdc,
	CHANNEL_AFTERTOUCH_CH14 : 0xdd,
	CHANNEL_AFTERTOUCH_CH15 : 0xde,
	CHANNEL_AFTERTOUCH_CH16 : 0xdf,

	/*
	 * Pitch Bend Change.
	 * This message is sent to indicate a change in the pitch bender (wheel or
	 * lever, typically). The pitch bender is measured by a fourteen bit value.
	 * Center (no pitch change) is 2000H.
	 */
	PITCH_WHEEL_CH1  : 0xe0,
	PITCH_WHEEL_CH2  : 0xe1,
	PITCH_WHEEL_CH3  : 0xe2,
	PITCH_WHEEL_CH4  : 0xe3,
	PITCH_WHEEL_CH5  : 0xe4,
	PITCH_WHEEL_CH6  : 0xe5,
	PITCH_WHEEL_CH7  : 0xe6,
	PITCH_WHEEL_CH8  : 0xe7,
	PITCH_WHEEL_CH9  : 0xe8,
	PITCH_WHEEL_CH10 : 0xe9,
	PITCH_WHEEL_CH11 : 0xea,
	PITCH_WHEEL_CH12 : 0xeb,
	PITCH_WHEEL_CH13 : 0xec,
	PITCH_WHEEL_CH14 : 0xed,
	PITCH_WHEEL_CH15 : 0xee,
	PITCH_WHEEL_CH16 : 0xef,

	/*
	 * Control change
	 */
	BANK_SELECT                      : 0x00,
	MODULATION_WHEEL                 : 0x01,
	BREATH_CONTROLLER                : 0x02,
	FOOT_CONTROLLER                  : 0x04,
	PORTAMENTO_TIME                  : 0x05,
	DATA_ENTRY_MSB                   : 0x06,
	CHANNEL_VOLUME                   : 0x07,
	BALANCE                          : 0x08,
	PAN                              : 0x0a,
	EXPRESSION_CONTROLLER            : 0x0b,
	EFFECT_CONTROL_1                 : 0x0c,
	EFFECT_CONTROL_2                 : 0x0d,
	GENERAL_PURPOSE_CONTROLLER_1     : 0x10,
	GENERAL_PURPOSE_CONTROLLER_2     : 0x11,
	GENERAL_PURPOSE_CONTROLLER_3     : 0x12,
	GENERAL_PURPOSE_CONTROLLER_4     : 0x13,
	BANK_SELECT_LSB                  : 0x20,
	MODULATION_WHEEL_LSB             : 0x21,
	BREATH_CONTROLLER_LSB            : 0x22,
	FOOT_CONTROLLER_LSB              : 0x24,
	PORTAMENTO_TIME_LSB              : 0x25,
	DATA_ENTRY_LSB                   : 0x26,
	CHANNEL_VOLUME_LSB               : 0x27,
	BALANCE_LSB                      : 0x28,
	PAN_LSB                          : 0x2a,
	EXPRESSION_CONTROLLER_LSB        : 0x2b,
	EFFECT_CONTROL_1_LSB             : 0x2c,
	EFFECT_CONTROL_2_LSB             : 0x2d,
	GENERAL_PURPOSE_CONTROLLER_1_LSB : 0x30,
	GENERAL_PURPOSE_CONTROLLER_2_LSB : 0x31,
	GENERAL_PURPOSE_CONTROLLER_3_LSB : 0x32,
	GENERAL_PURPOSE_CONTROLLER_4_LSB : 0x33,
	PORTAMENTO_ON_OFF                : 0x41,
	SOSTENUTO_ON_OFF                 : 0x42,
	SOFT_PEDAL_ON_OFF                : 0x43,
	LEGATO_FOOTSWITCH                : 0x44,
	HOLD                             : 0x45,
	SOUND_CONTROLLER_1               : 0x46,
	SOUND_CONTROLLER_2               : 0x47,
	SOUND_CONTROLLER_3               : 0x48,
	SOUND_CONTROLLER_4               : 0x49,
	SOUND_CONTROLLER_5               : 0x4a,
	SOUND_CONTROLLER_6               : 0x4b,
	SOUND_CONTROLLER_7               : 0x4c,
	SOUND_CONTROLLER_8               : 0x4d,
	SOUND_CONTROLLER_9               : 0x4e,
	SOUND_CONTROLLER_10              : 0x4f,
	GENERAL_PURPOSE_CONTROLLER_5     : 0x50,
	GENERAL_PURPOSE_CONTROLLER_6     : 0x51,
	GENERAL_PURPOSE_CONTROLLER_7     : 0x52,
	GENERAL_PURPOSE_CONTROLLER_8     : 0x53,
	PORTAMENTO_CONTROL               : 0x54,
	HIGH_RESOLUTION_VELOCITY_PREFIX  : 0x58,

	/*
	 * MIDI notes
	 */
	'C0' : 0, 'C#0' : 1, 'D0' : 2, 'D#0' : 3, 'E0' : 4, 'F0' : 5, 'F#0' : 6,
	'G0' : 7, 'G#0' : 8, 'A0' : 9, 'A#0' : 10, 'B0' : 11, 'C1' : 12, 'C#1' : 13,
	'D1' : 14, 'D#1' : 15, 'E1' : 16, 'F1' : 17, 'F#1' : 18, 'G1' : 19,
	'G#1' : 20, 'A1' : 21, 'A#1' : 22, 'B1' : 23, 'C2' : 24, 'C#2' : 25,
	'D2' : 26, 'D#2' : 27, 'E2' : 28, 'F2' : 29, 'F#2' : 30, 'G2' : 31,
	'G#2' : 32, 'A2' : 33, 'A#2' : 34, 'B2' : 35, 'C3' : 36, 'C#3' : 37,
	'D3' : 38, 'D#3' : 39, 'E3'  : 40, 'F3' : 41, 'F#3' : 42, 'G3' : 43,
	'G#3' : 44, 'A3' : 45, 'A#3' : 46, 'B3' : 47, 'C4' : 48, 'C#4' : 49,
	'D4' : 50, 'D#4' : 51, 'E4' : 52, 'F4' : 53, 'F#4' : 54, 'G4' : 55,
	'G#4' : 56, 'A4' : 57, 'A#4' : 58, 'B4' : 59, 'C5' : 60, 'C#5' : 61,
	'D5' : 62, 'D#5' : 63, 'E5' : 64, 'F5' : 65, 'F#5' : 66, 'G5' : 67,
	'G#5' : 68, 'A5' : 69, 'A#5' : 70, 'B5' : 71, 'C6' : 72, 'C#6' : 73,
	'D6' : 74, 'D#6' : 75, 'E6' : 76, 'F6' : 77, 'F#6' : 78, 'G6' : 79,
	'G#6' : 80, 'A6' : 81, 'A#6' : 82, 'B6' : 83, 'C7' : 84, 'C#7' : 85,
	'D7' : 86, 'D#7' : 87, 'E7' : 88, 'F7' : 89, 'F#7' : 90, 'G7' : 91,
	'G#7' : 92, 'A7' : 93, 'A#7' : 94, 'B7' : 95, 'C8' : 96, 'C#8' : 97,
	'D8' : 98, 'D#8' : 99, 'E8' : 100, 'F8' : 101, 'F#8' : 102, 'G8' : 103,
	'G#8' : 104, 'A8' : 105, 'A#8' : 106, 'B8' : 107, 'C9' : 108, 'C#9' : 109,
	'D9' : 110, 'D#9' : 111, 'E9' : 112, 'F9' : 113, 'F#9' : 114, 'G9' : 115,
	'G#9' : 116, 'A9' : 117, 'A#9' : 118, 'B9' : 119, 'C10' : 120, 'C#10' : 121,
	'D10' : 122, 'D#10' : 123, 'E10' : 124, 'F10' : 125, 'F#10' : 126,
	'G10' : 127,

	/**************************************************************************
	 * Helper functions
	 **************************************************************************/

	isMIDIStatus : function(code) {
		if (typeof code !== 'number') {
			return false;
		}

		return (
			code >= Midinette.NOTE_OFF_CH1 &&
			code <= Midinette.PITCH_WHEEL_CH16
		);
	},

	isMIDIMessage : function(code) {
		return (
			typeof code === 'number' &&
			Number.isInteger(code) &&
			code >= 0x000000 &&
			code <= 0xffffff
		);
	},

	isMIDIByteArray : function(byteArray) {
		return (
			Array.isArray(byteArray) &&
			byteArray.length === 3 &&
			Number.isInteger(byteArray[0]) &&
			Number.isInteger(byteArray[1]) &&
			Number.isInteger(byteArray[2]) &&
			byteArray[0] >= 0x00 && byteArray[0] <= 0xff &&
			byteArray[1] >= 0x00 && byteArray[1] <= 0xff &&
			byteArray[2] >= 0x00 && byteArray[2] <= 0xff
		);
	},

	intToByteArray : function(int) {
		if (Midinette.isMIDIByteArray(int)) {
			return int;
		}
		return [int >> 16, (int >> 8) & 0x00ff,	int & 0x0000ff];
	},

	getMIDIStatus : function(code) {
		if (Midinette.isMIDIStatus(code)) {
			return code;
		}
		else if (Midinette.isMIDIByteArray(code)) {
			return code[0];
		}
		else if (Midinette.isMIDIMessage(code)) {
			return Midinette.getMIDIEvent(Midinette.intToByteArray(code));
		}

		return 0;
	},

	isNoteOn : function(code) {
		return (
			Midinette.isMIDIStatus(code) &&
			code >= Midinette.NOTE_ON_CH1 &&
			code <= Midinette.NOTE_ON_CH16
		);
	},

	isNoteOff : function(code) {
		return (
			Midinette.isMIDIStatus(code) &&
			code >= Midinette.NOTE_OFF_CH1 &&
			code <= Midinette.NOTE_OFF_CH16
		);
	},

	isControlChange : function(code) {
		return (
			Midinette.isMIDIStatus(code) &&
			code >= Midinette.CONTROL_CHANGE_CH1 &&
			code <= Midinette.CONTROL_CHANGE_CH16
		);
	},

	isPitchWheel : function(code) {
		return (
			Midinette.isMIDIStatus(code) &&
			code >= Midinette.PITCH_WHEEL_CH1 &&
			code <= Midinette.PITCH_WHEEL_CH16
		);
	},

	isPolyphonicAftertouch : function(data) {
		return (
			Midinette.isMIDIStatus(code) &&
			code >= Midinette.POLYPHONIC_AFTERTOUCH_CH1 &&
			code <= Midinette.POLYPHONIC_AFTERTOUCH_CH16
		);
	},

	isProgramChange : function(data) {
		return (
			Midinette.isMIDIStatus(code) &&
			code >= Midinette.PROGRAM_CHANGE_CH1 &&
			code <= Midinette.PROGRAM_CHANGE_CH16
		);
	},

	isChannelAftertouch : function(data) {
		return (
			Midinette.isMIDIStatus(code) &&
			code >= Midinette.CHANNEL_AFTERTOUCH_CH1 &&
			code <= Midinette.CHANNEL_AFTERTOUCH_CH16
		);
	},

	constructMIDIMessage : function(event, channel, data1, data2) {
		return [(event & 0xf0) + (channel - 1), data1, data2];
	},

	noteStringToMIDICode : function(note) {
		if (
			typeof note === 'string' &&
			typeof Midinette[note] === 'number'
		) {
			return Midinette[note];
		}
		else if (typeof note === 'number') {
			return note;
		}
		return 0;
	},

	getChannelFromStatus : function(status) {
		return (status % 0x10) + 1;
	},
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Midinette;
}
else if (typeof window !== 'undefined') {
	window.Midinette = Midinette;
}

},{}],7:[function(require,module,exports){
/**
 * Constructor for a port colletion.
 *
 * @param {array} ports
 *
 * @returns {*}
 */
function Midium(ports) {
	this.eventListeners = [];
	this.ports = [];

	for (var i = 0; i < ports.length; i++) {
		this.add(ports[i]);
	}
}

/** @type {object} Midi access object. */
Midium.midiAccess = null;

Midium.isReady = false;

Midium.listenerCounter = 0;

/**
 * Calls back when the MIDI driver is ready.
 *
 * @param {function} callback    Calls when the MIDI connection is ready.
 * @param {function} errorCallback
 *
 * @returns {void}
 */
Midium.ready = function(callback, errorCallback) {
	if (Midium.isReady) {
		callback();
	}

	navigator.requestMIDIAccess({
		sysex : false
	}).then(

		/* MIDI access granted */
		function(midiAccess) {
			Midium.isReady = true;
			Midium.midiAccess = midiAccess;
			callback();
		},

		/* MIDI access denied */
		function(error) {
			Midium.isReady = false;
			if (errorCallback) {
				errorCallback(error);
			}
		}
	);
};

/**
 * Returns with an array of MIDI inputs and outputs.
 *
 * @param {object|number|string|array} selector    Selector
 *
 * @returns {array}
 */
Midium.select = function(selector) {
	if (!Midium.isReady) {
		return [];
	}

	var ports = [];

	/* If the query is a MIDIInput or output. */
	if (
		selector instanceof window.MIDIOutput ||
		selector instanceof window.MIDIInput
	) {
		ports[0] = selector;
	}

	else if (
		typeof selector === 'number' &&
		Midium.midiAccess.inputs.has(query)
	) {
		ports[0] = Midium.midiAccess.inputs.get(query);
	}

	else if (
		typeof query === 'number' &&
		Midium.midiAccess.outputs.has(query)
	) {
		ports[0] = Midium.midiAccess.outputs.get(query);
	}

	else if (selector instanceof Array) {
		selector.forEach(function(item) {
			ports.push(Midium.select(item)[0]);
		});
	}

	else if (
		typeof selector === 'string' ||
		selector instanceof window.RegExp
	) {
		var name = '';

		Midium.midiAccess.inputs.forEach(function each(port) {
			name = port.name + ' ' + port.manufacturer;
			if (new RegExp(selector, 'i').test(name)) {
				ports.push(port);
			}
		});

		Midium.midiAccess.outputs.forEach(function each(port) {
			name = port.name + ' ' + port.manufacturer;
			if (new RegExp(selector, 'i').test(name)) {
				ports.push(port);
			}
		});
	}

	return new Midium(ports);
};

/**
 * Converts byte array to 24 bit integer.
 *
 * @param {number|array} byteArray    Byte array
 *
 * @returns {void}
 */
Midium.byteArrayToInt = function(byteArray) {
	if (typeof byteArray === 'number') {
		return byteArray;
	}

	return byteArray[0] * 0x10000 + byteArray[1] * 0x100 + byteArray[2];
};

/**
 * Converts 24 bit integer to byte array.
 *
 * @param {number|array} int    24 bit integer
 *
 * @returns {void}
 */
Midium.intToByteArray = function(int) {
	if (typeof int === 'array') {
		return int;
	}

	return [int >> 16, (int >> 8) & 0x00ff,	int & 0x0000ff];
};

Midium.prototype = {
	/**
	 * Adds MIDI port to the collection.
	 *
	 * @param {object} port    MIDI port
	 *
	 * @returns {object} Reference of this for method chaining.
	 */
	add : function (port) {
		port.onstatechange = this._onStateChange.bind(this);
		port.onmidimessage = this._onMIDIMessage.bind(this);
		this.ports.push(port);

		return this;
	},

	/**
	 * Removes the references from the selected MIDI ports.
	 *
	 * @returns {void}
	 */
	removeReferences : function () {
		this.ports.forEach(function(port) {
			port.onmidimessage = null;
			port.onstatechange = null;
		})
	},

	/**
	 * Sends raw MIDI data.
	 *
	 * @param {number|array} message    24 bit byte array or integer
	 *
	 * @returns {object} Reference of this for method chaining.
	 */
	send : function (message) {
		message = Midium.intToByteArray(message);

		this.ports.forEach(function (port) {
			if (port.type === 'output') {
				port.send(message);
			}
		});

		return this;
	},

	/**
	 * Register an event listener.
	 *
	 * @param {number|array} event    24 bit byte array or integer
	 * @param {number|array} mask     24 bit byte array or integer
	 * @param {function} callback
	 *
	 * @returns {object} Returns with the reference of the event listener.
	 */
	addEventListener : function (event, mask, callback) {
		this.eventListeners.push({
			event     : Midium.byteArrayToInt(event),
			mask      : Midium.byteArrayToInt(mask),
			reference : Midium.listenerCounter,
			callback  : callback
		});

		return Midium.listenerCounter++;
	},

	/**
	 * Removes the given event listener or event listeners.
	 *
	 * @param {number|array} references    Event listener references.
	 *
	 * @returns {void}
	 */
	removeEventListener : function (references) {
		Array.prototype.concat(references).forEach(function (reference) {
			this.eventListeners.forEach(function (listener, index) {
				if (listener.reference === reference) {
					this.eventListeners.splice(index, 1);
				}
			}, this);
		}, this);
	},

	/**
	 * MIDI message event handler.
	 *
	 * @param {object} event    MIDI event data.
	 *
	 * @returns {void}
	 */
	_onMIDIMessage : function(event) {
		var data = Midium.byteArrayToInt(event.data);
		this.eventListeners.forEach(function (listener) {
			if ((data & listener.mask) === listener.event) {
				listener.callback(event);
			}
		}, this);
	},

	/**
	 * State change event handler.
	 *
	 * @param {object} event    State change event data.
	 *
	 * @returns {void}
	 */
	_onStateChange : function(event) {
		console.log('state', event);
	}
};

if (typeof module !== 'undefined') {
	module.exports = Midium;
}
else {
	window.Midium = Midium;
}

},{}],8:[function(require,module,exports){
'use strict';

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.assignin');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _lodash2.default)(_midiumCore2.default.prototype, {
	/**
  * Setter function for the default channel.
  *
  * @param {number} channel    MIDI channel 1-16.
  *
  * @returns {object}
  */
	setDefaultChannel: function setDefaultChannel(channel) {
		this.defaultChannel = channel;
		return this;
	}
});

},{"lodash.assignin":1,"midium-core":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.channelAftertouch = channelAftertouch;
exports.onChannelAftertouch = onChannelAftertouch;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Send a channel aftertouch message.
 *
 * @param {number} pressure      Pressure 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
function channelAftertouch(pressure, channel) {
	channel = (0, _lodash2.default)(channel) ? this.defaultChannel : channel;

	this.send(_midiumCore2.default.constuctMIDIMessageArray(_midiumCore2.default.CHANNEL_AFTERTOUCH, channel, pressure, 0));

	return this;
};

/**
 * Registers an event listener for the channel aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onChannelAftertouch(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.CHANNEL_AFTERTOUCH, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'channelaftertouch';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.pressure = event.data[1];
		callback(event);
	});
};

},{"lodash.isUndefined":5,"midium-core":7}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.controlChange = controlChange;
exports.onControlChange = onControlChange;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Sets the value of the specified controller
 *
 * @param {note} controller      Controller number 0-127
 * @param {number} pressure      Pressure 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
function controlChange(controller, value, channel) {
	channel = (0, _lodash2.default)(channel) ? this.defaultChannel : channel;

	this.send(_midiumCore2.default.constuctMIDIMessageArray(_midiumCore2.default.CONTROL_CHANGE, channel, controller, value));

	return this;
};

/**
 * Registers an event listener for the control change events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onControlChange(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.CONTROL_CHANGE, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'controlchange';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.controller = event.data[1];
		event.controllerValue = event.data[2];
		callback(event);
	});
};

},{"lodash.isUndefined":5,"midium-core":7}],11:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _midinette = require('midinette');

var _midinette2 = _interopRequireDefault(_midinette);

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _channelAftertouch = require('./channelAftertouch');

var _controlChange = require('./controlChange');

var _noteOff = require('./noteOff');

var _noteOn = require('./noteOn');

var _pitchWheel = require('./pitchWheel');

var _polyAftertouch = require('./polyAftertouch');

var _programChange = require('./programChange');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.assign(_midiumCore2.default, _midinette2.default);

Object.assign(_midiumCore2.default.prototype, {
	onChannelAftertouch: _channelAftertouch.onChannelAftertouch,
	onControlChange: _controlChange.onControlChange,
	onNoteOff: _noteOff.onNoteOff,
	onNoteOn: _noteOn.onNoteOn,
	onPitchWheel: _pitchWheel.onPitchWheel,
	onPolyAftertouch: _polyAftertouch.onPolyAftertouch,
	onProgramChange: _programChange.onProgramChange,
	channelAftertouch: _channelAftertouch.channelAftertouch,
	controlChange: _controlChange.controlChange,
	noteOff: _noteOff.noteOff,
	noteOn: _noteOn.noteOn,
	pitchWheel: _pitchWheel.pitchWheel,
	polyAftertouch: _polyAftertouch.polyAftertouch,
	programChange: _programChange.programChange
});

global.Midium = _midiumCore2.default;
exports.default = _midiumCore2.default;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./channel":8,"./channelAftertouch":9,"./controlChange":10,"./noteOff":12,"./noteOn":13,"./pitchWheel":21,"./polyAftertouch":22,"./programChange":23,"midinette":6,"midium-core":7}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.noteOff = noteOff;
exports.onNoteOff = onNoteOff;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Sets the specified note off.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} [velocity]     Velocity 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
function noteOff(note, velocity, channel) {
	note = _midiumCore2.default.noteStringToMIDICode(note);
	velocity = (0, _lodash2.default)(velocity) ? 127 : velocity;
	channel = (0, _lodash2.default)(channel) ? this.defaultChannel : channel;

	this.send(_midiumCore2.default.constuctMIDIMessageArray(_midiumCore2.default.NOTE_OFF, channel, note, velocity));

	return this;
};

/**
 * Registers an event listener for the note off events.
 *
 * @param {function} callback
 * @param {number} [channel]
 * @returns {object} Reference of the event listener for unbinding.
 */
function onNoteOff(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message1 = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.NOTE_OFF, channel, 0, 0),
	    message2 = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.NOTE_ON, channel, 0, 0);

	return [this.addEventListener(message1, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'noteoff';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = event.data[2];
		callback(event);
	}), this.addEventListener(message2, mask, function (event) {
		/* By note on event, velocity 0 means note off. */
		if (event.data[2] !== 0) {
			return;
		}
		/* Extending the MIDI event with useful infos. */
		event.status = 'noteoff';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = 0;
		callback(event);
	})];
};

},{"lodash.isUndefined":5,"midium-core":7}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.noteOn = noteOn;
exports.onNoteOn = onNoteOn;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Sets the specified note on.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} [velocity]     Velocity 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
function noteOn(note, velocity, channel) {
	note = _midiumCore2.default.noteStringToMIDICode(note);
	velocity = (0, _lodash2.default)(velocity) ? 127 : velocity;
	channel = (0, _lodash2.default)(channel) ? this.defaultChannel : channel;

	this.send(_midiumCore2.default.constuctMIDIMessageArray(_midiumCore2.default.NOTE_ON, channel, note, velocity));

	return this;
};

/**
 * Registers an event listener for the note on events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onNoteOn(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.NOTE_ON, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		if (event.data[2] === 0) {
			return;
		}
		/* Extending the MIDI event with useful infos. */
		event.status = 'noteon';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = event.data[2];
		callback(event);
	});
};

},{"lodash.isUndefined":5,"midium-core":7}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = onChannelAftertouch;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Registers an event listener for the channel aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onChannelAftertouch(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.CHANNEL_AFTERTOUCH, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'channelaftertouch';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.pressure = event.data[1];
		callback(event);
	});
};

},{"lodash.isUndefined":5,"midium-core":7}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = onControlChange;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Registers an event listener for the control change events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onControlChange(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.CONTROL_CHANGE, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'controlchange';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.controller = event.data[1];
		event.controllerValue = event.data[2];
		callback(event);
	});
};

},{"lodash.isUndefined":5,"midium-core":7}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = onNoteOff;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Registers an event listener for the note off events.
 *
 * @param {function} callback
 * @param {number} [channel]
 * @returns {object} Reference of the event listener for unbinding.
 */
function onNoteOff(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message1 = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.NOTE_OFF, channel, 0, 0),
	    message2 = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.NOTE_ON, channel, 0, 0);

	return [this.addEventListener(message1, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'noteoff';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = event.data[2];
		callback(event);
	}), this.addEventListener(message2, mask, function (event) {
		/* By note on event, velocity 0 means note off. */
		if (event.data[2] !== 0) {
			return;
		}
		/* Extending the MIDI event with useful infos. */
		event.status = 'noteoff';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = 0;
		callback(event);
	})];
};

},{"lodash.isUndefined":5,"midium-core":7}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = onNoteOn;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Registers an event listener for the note on events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onNoteOn(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.NOTE_ON, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		if (event.data[2] === 0) {
			return;
		}
		/* Extending the MIDI event with useful infos. */
		event.status = 'noteon';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.velocity = event.data[2];
		callback(event);
	});
};

},{"lodash.isUndefined":5,"midium-core":7}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = onPitchWheel;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Registers an event listener for the pitch wheel events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onPitchWheel(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.PITCH_WHEEL, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'pitchwheel';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.pitchWheel = event.data[2];
		callback(event);
	});
};

},{"lodash.isUndefined":5,"midium-core":7}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = onPolyAftertouch;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Registers an event listener for the polyphonic aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onPolyAftertouch(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.POLYPHONIC_AFTERTOUCH, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'polyaftertouch';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.pressure = event.data[2];
		callback(event);
	});
};

},{"lodash.isUndefined":5,"midium-core":7}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = onProgramChange;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Registers an event listener for the program change events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onProgramChange(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.PROGRAM_CHANGE, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'programchange';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.program = event.data[1];
		callback(event);
	});
};

},{"lodash.isUndefined":5,"midium-core":7}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.pitchWheel = pitchWheel;
exports.onPitchWheel = onPitchWheel;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Sets the value of the pitch wheel.
 *
 * @param {number} value         Value 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
function pitchWheel(value, channel) {
	channel = (0, _lodash2.default)(channel) ? this.defaultChannel : channel;

	this.send(_midiumCore2.default.constuctMIDIMessageArray(_midiumCore2.default.CHANNEL_AFTERTOUCH, channel, 0, value));

	return this;
};

/**
 * Registers an event listener for the pitch wheel events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onPitchWheel(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.PITCH_WHEEL, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'pitchwheel';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.pitchWheel = event.data[2];
		callback(event);
	});
};

},{"lodash.isUndefined":5,"midium-core":7}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.polyAftertouch = polyAftertouch;
exports.onPolyAftertouch = onPolyAftertouch;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Sends a polyphonic aftertouch message.
 *
 * @param {string|number} note    MIDI note 0-127
 * @param {number} pressure       Pressure 0-127
 * @param {number} [channel]      Channel 1-16
 *
 * @returns {object}
 */
function polyAftertouch(note, pressure, channel) {
	note = _midiumCore2.default.noteStringToMIDICode(note);
	channel = (0, _lodash2.default)(channel) ? this.defaultChannel : channel;

	this.send(_midiumCore2.default.constuctMIDIMessageArray(_midiumCore2.default.POLYPHONIC_AFTERTOUCH, channel, note, pressure));

	return this;
};

/**
 * Registers an event listener for the polyphonic aftertouch events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onPolyAftertouch(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.POLYPHONIC_AFTERTOUCH, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'polyaftertouch';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.note = event.data[1];
		event.pressure = event.data[2];
		callback(event);
	});
};

},{"lodash.isUndefined":5,"midium-core":7}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.programChange = programChange;
exports.onProgramChange = onProgramChange;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

var _lodash = require('lodash.isUndefined');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MASK_EVENT_ONLY = 0xf00000;
var MASK_EVENT_AND_CHANNEL = 0xff0000;

/**
 * Sets the specified program.
 *
 * @param {note} program         Program number 0-127
 * @param {number} [channel]     Channel 1-16
 *
 * @returns {object}
 */
function programChange(program, channel) {
	channel = (0, _lodash2.default)(channel) ? this.defaultChannel : channel;

	this.send(_midiumCore2.default.constuctMIDIMessageArray(_midiumCore2.default.PROGRAM_CHANGE, channel, program, 0));

	return this;
};

/**
 * Registers an event listener for the program change events.
 *
 * @param {function} callback
 * @param {number} [channel]
 *
 * @returns {object} Reference of the event listener for unbinding.
 */
function onProgramChange(callback, channel) {
	var channel = (0, _lodash2.default)(channel) ? 1 : channel,
	    mask = (0, _lodash2.default)(channel) ? MASK_EVENT_ONLY : MASK_EVENT_AND_CHANNEL,
	    message = _midiumCore2.default.constructMIDIMessage(_midiumCore2.default.PROGRAM_CHANGE, channel, 0, 0);

	return this.addEventListener(message, mask, function (event) {
		/* Extending the MIDI event with useful infos. */
		event.status = 'programchange';
		event.channel = _midiumCore2.default.getChannelFromStatus(event.data[0]);
		event.program = event.data[1];
		callback(event);
	});
};

},{"lodash.isUndefined":5,"midium-core":7}]},{},[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]);
