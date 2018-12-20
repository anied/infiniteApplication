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
import infiniteApplication from 'infinite-application';
```

#### NodeJS/CommonJS

```javascript
const infiniteApplication = require('infinite-application').default;
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
function speak(fname, lname, line) {
    return `${fname}${lname ? ` ${lname}` : ''}: "${line}"`;
}
```

This function takes its arguments separately, so we can omit the `useConfigForArgs` flag and just pass it into `infiniteApplication` to get the single arg wrapped version:

```javascript
const wrappedSpeak = infiniteApplication(speak);
```

You now have the ability to call this partially, with any number of non-zero args.  Once you are ready to actually invoke the function with the passed args, simply call the wrapper without any arguments.

Consider the examples below:

```javascript
const wrappedSpeak = infiniteApplication(speak);
wrappedSpeak('Peter');
wrappedSpeak('Venkman');
wrappedSpeak('What do you see?');
wrappedSpeak(); // returns "Peter Venkman: "What do you see?""
```

```javascript
const wrappedSpeak = infiniteApplication(speak);
wrappedSpeak('Ray', 'Stantz');
wrappedSpeak('This place is great!');
wrappedSpeak(); //returns "Ray Stanz: "This place is great!""
```

```javascript
const wrappedSpeak = infiniteApplication(speak);
wrappedSpeak('Egon')('Spengler')('I\'d like to take a few samples.')(); // returns "Egon Spengler: "I'd like to take a few samples.""
```

```javascript
const wrappedSpeak = infiniteApplication(speak, false, 'Winston', 'Zeddemore');
wrappedSpeak('Ray, when someone asks you if you\'re a god, you say "YES"!');
wrappedSpeak(); // returns "Winston Zeddemore: "Ray, when someone asks you if you're a god, you say "YES"!"""
```

```javascript
const wrappedSpeak = infiniteApplication(speak);
wrappedSpeak('Slimer');
wrappedSpeak(undefined);
wrappedSpeak('Blaaaaaarghargharghhh!!!!!');
wrappedSpeak(); // return "Slimer: "Blaaaaaarghargharghhh!!!!!""
```

#### Config Argument Form

_Returned when `useConfigForArgs` is `true` in the call to `infiniteApplication`_

**`configArgWrappedFn(argConfigObj)`**

Returns itself, so chaining is possible.

+ **`argConfigObj`**: An object that will be extended into the previously held object in the closure.

If no argument is passed, the original function passed as `fn` will be executed with whatever the current state of the cached config object is.

For example, consider the following function:

```javascript
function speak({fname, lname, line}) {
    return `${fname}${lname ? ` ${lname}` : ''}: "${line}"`;
}
```

_Note that the args are destructured in a single config object._

When we pass this version of `speak` to `infiniteApplication`, we need to pass `true` as the the second `useConfigForArgs` arg:

```javascript
const wrappedSpeak = infiniteApplication(speak, true);
```

You now have a wrapped function that can be called wit a config object containing any subset of the possible keys therein.  If a duplicate key is passed, the latest value overrides the last one.

Just as with the separate args form, to invoke the function with the passed args, simply call the wrapper without any arguments.

Consider the examples below:

```javascript
const wrappedSpeak = infiniteApplication(speak, true);
wrappedSpeak({fname: "Louis", lname: "Tully"});
wrappedSpeak({line: "I am The Keymaster!"});
wrappedSpeak(); // returns "Louis Tully: "I am The Keymaster!""
```

```javascript
const wrappedSpeak = infiniteApplication(speak, true, {fname: 'Dana', lname: 'Barrett'});
wrappedSpeak({fname: 'The GateKeeper'});
wrappedSpeak({lname: undefined});
wrappedSpeak('I am The GateKeeper!');
wrappedSpeak(); // returns "The GateKeeper: "I am The Gatekeeper!""
```

```javascript
const choose = infiniteApplication(speak, true, {fname: 'Gozer'}, {line: 'CHOOSE!!!'})(); // assigns choose as "Gozer: "CHOOSE!!!""
```

