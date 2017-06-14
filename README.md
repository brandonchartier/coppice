# Coppice

A functional `this`-less framework for creating web UIs.

---

## Installation

`npm install --save coppice`

---

## Sample

```js
import { h, mount, program } from 'coppice';

const model = {
  count: 0,
};

const update = {
  increment: (state) => ({ count: state.count + 1 }),
  decrement: (state) => ({ count: state.count - 1 }),
};

const view = (state, msg) => (
  <div>
    <h1>{state.count}</h1>
    <button onclick={msg.increment}>+</button>
    <button onclick={msg.decrement} disabled={state.count <= 0}>-</button>
  </div>
);

const counter = program({
  model,
  update,
  view,
});

mount(counter, '#app');
```

---

## API

### Program

`program({ model, update, view })`

Takes an object with a `model`, an `update`, and a `view`. Technically, only a `view` is required.

```js
const app = program({
  model: {...},
  update: {...},
  view: (state, msg) => (...),
});
```

#### Model

`model: {...}`

An object that initializes the state of your program.

#### Update

`update: { fn: (state, msg, data) => (...) }`

Contains functions that will update your state. Functions must return the parts of the state that they wish to change. When an update returns, the view is automatically rendered with the new state, if any changes occurred.

- `state` refers to the current state of your program, which was initialized with the model passed into the program originally.
- `msg` refers to the update object itself, allowing you to run multiple actions, and async operations.
- `data` refers to the first argument when called. For example, in the case of an `onclick` event, data would be the `event` object, allowing you to access `event.target.value`.

#### View

`view: (state, msg) => (...)`

A function that returns a pure representation of your state. Can be written in JSX, or anything that can compile down to hyperscript - `h` is provided by the framework, as a way to begin writing programs quickly.

### H

`h(element, attributes, children)`

An implementation of [hyperscript](https://github.com/hyperhype/hyperscript).

### Mount

`mount(program, selector)`

A function that allows you to attach your program to an element of the DOM. `selector` defaults to "body".

---

### Prior Art

- [This tweet](https://twitter.com/youyuxi/status/849993029012168705) from Evan You
- [The Elm Architecture](https://guide.elm-lang.org/architecture/)
- [Hyperapp](https://github.com/hyperapp/hyperapp)
- [The SAM Pattern](http://sam.js.org/)

### Differences between other frameworks

- Although the library is only 5-6 kB gzipped, Coppice is not totally concerned about filesize. Check out the Roadmap for planned features.
- Single state - No local state between views, which erases the complexity of managing parent/child communication. See Redux, Vuex or The Elm Architecture to understand why this is beneficial.
- Focused on reusable functions instead of reusable components.
- Testability - testing updates is as easy as passing in dummy data and making sure it did what you wanted.

### Quick start

[Coppice App](https://github.com/brandonchartier/coppice-app) gets you running in seconds. It comes preloaded with the encouraged defaults - Webpack, Babel, and JSX. `npm run dev` sets up a dev server with hot module replacement and `npm run build` produces a production-ready program.

---

## Roadmap

- Immutable state handling, for easier rollback to previous states.
