# infiniteApplication

<p align="center"><img src="./logo.png" alt="logo -- purple infinity sign inside of parens"/></p>

## Overview

`infiniteApplication` is a wrapper that provides infinite partial application of a function using variable arity, or a single config object.

## Installation

_Coming soon_

## Usage

### Importing/Requiring

#### ES6

```javascript
import infiniteApplication from 'infiniteApplication';
```

#### NodeJS/CommonJS

```javascript
const infiniteApplication = require('infiniteApplication');
```

### The `infiniteApplication` Wrapper

**`infiniteApplication(fn, [useConfigForArgs], [...initialArgs])`**

Returns an `infiniteApplication` _wrapped function_ (see below).

+ **`fn`**: `function` -- The function you wish to use with endless partial application.
+ **`useConfigForArgs`** _(optional)_: `boolean` -- A flag indicating whether the passed `fn` is called with multiple separate arguments, or with a single configuration object argument. Defaults to `false`.
+ **`...initialArgs`** _(optional)_: Any initial arguments you would like to pass for partial application against the passed `fn`.

### The Wrapped Function

The wrapper returned from `infiniteApplication` provides an interface for arbitrary, unlimited partial application of arguments against the passed `fn` value.  The form of the wrapper depends on the `useConfigForArgs` value that was passed to `infiniteApplication`.

#### Separate Arguments Form

_Returned when `useConfigForArgs` is `false` or omitted from the call to `infiniteApplication`_

**`individualArgWrappedFn([...args])`**

Returns itself, so chaining is possible.

+ **`...args`**: Any non-zero number of arguments to be partially applied to the function passed as `fn` to `infiniteApplication`.

If no argument is passed, the original function passed as `fn` will be executed with whatever arguments have been passed thus far.

For example, consider the following function:

```javascript
function sayHello(fname, lname, additionalGreeting) {
    return `Hello${fname ? ` ${fname}` : ''}${lname ? ` ${lname}` : ''}.${additionalGreeting ? ` ${additionalGreeting}` : ''}`;
}
```

This function takes its arguments separately, so we can omit the `useConfigForArgs` flag and just pass it into `infiniteApplication` to get the single arg wrapped version:

```javascript
const wrappedSayHello = infiniteApplication(sayHello);
```

You now have the ability to call this partially, with any number of non-zero args.  Once you are ready to actually invoke the function with the passed args, simply call the wrapper without any arguments.

Consider the examples below:

```javascript
const wrappedSayHello = infiniteApplication(sayHello);
wrappedSayHello('Peter');
wrappedSayHello('Venkman');
wrappedSayHello('What do you see?');
wrappedSayHello(); // returns "Hello Peter Venkman. What do you see?"
```

```javascript
const wrappedSayHello = infiniteApplication(sayHello);
wrappedSayHello('Ray', 'Stantz');
wrappedSayHello('This place is great!');
wrappedSayHello(); //returns "Hello Ray Stanz. This place is great!";
```

```javascript
const wrappedSayHello = infiniteApplication(sayHello);
wrappedSayHello('Egon')('Spengler')('I\'d like to take a few samples.')(); // returns "Hello Egon Spengler. I'd like to take a few samples"
```

```javascript
const wrappedSayHello = infiniteApplication(sayHello, 'Winston', 'Zeddemore');
wrappedSayHello('Ray, when someone asks you if you\'re a god, you say "YES"!');
wrappedSayHello(); // returns "Hello Winston Zeddemore. Ray, when someone asks you if you're a god, you say "YES"!""
```

#### Config Argument Form

_Returned when `useConfigForArgs` is `true` in the call to `infiniteApplication`_

**`configArgWrappedFn(argConfigObj)`**

Returns itself, so chaining is possible.

+ **`argConfigObj`**: An object that will be extended into the previously held object in the closure.

If no argument is passed, the original function passed as `fn` will be executed with whatever the current state of the cached config object is.

For example, consider the following function:

```javascript
function sayHello({fname, lname, additionalGreeting}) {
    return `Hello${fname ? ` ${fname}` : ''}${lname ? ` ${lname}` : ''}.${additionalGreeting ? ` ${additionalGreeting}` : ''}`;
}
```

