# Coppice

A functional `this`-less framework for creating web UIs.

*DEPRECATED* - Hyperapp has added a state-last approach and other goodies.

> cop·pice ˈkäpəs<br>
1. an area of woodland in which the trees or shrubs are, or formerly were, periodically cut back to ground level to stimulate growth and provide firewood or timber.

---

## Installation

`npm install --save coppice`

---

## Sample

```js
import { h, mount, program } from 'coppice';

const counter = program({
  model: {
    count: 0
  },
  update: {
    inc: _ => state => ({ count: state.count + 1 }),
    dec: _ => state => ({ count: state.count - 1 }),
    add: n => state => ({ count: state.count + n })
  },
  action: {
    wait: ctx => setTimeout(() => ctx.commit('add', 5), 1000)
  },
  view: ctx => state => (
    <div>
      <h1>{state.count}</h1>
      <button onclick={ctx.commit('inc')}>+</button>
      <button onclick={ctx.commit('dec')} disabled={state.count <= 0}>-</button>
      <button onclick={ctx.dispatch('wait')}>+5</button>
    </div>
  )
});

mount(counter, '#app');
```

Or, when using Ramda:

```js
const countLens = r.lensProp('count');
const overCount = r.over(countLens);

const counter = program({
  model: {
    count: 0
  },
  update: {
    inc: _ => overCount(r.inc),
    dec: _ => overCount(r.dec),
    add: n => overCount(r.add(n))
  },
  action: {
    wait: ctx => setTimeout(() => ctx.commit('add', 5), 1000)
  },
  view: ctx => r.compose(count => (
    <div>
      <h1>{count}</h1>
      <button onclick={ctx.commit('inc')}>+</button>
      <button onclick={ctx.commit('dec')} disabled={count <= 0}>-</button>
      <button onclick={ctx.dispatch('wait')}>+5</button>
    </div>
  ), r.view(countLens))
});
```

---

## API

### Program

`program({ model, update, action, view })`

Takes an object with a `model`, an `update`, an `action`, and a `view`. Technically, only a `view` is required.

```js
const app = program({
  model: {...},
  update: {...},
  action: {...},
  view: ctx => state => (...),
});
```

#### Model

`model: {...}`

An object that initializes the state of your program.

#### Commit

`commit('type', payload)`

A curried function that commits an `update` to the state of your program.

- `type` is a string that specifies which update to call.
- `payload` is a value that you would like to pass to your update.

#### Dispatch

`dispatch('type', payload)`

A curried function that dispatches an action.

- `type` is a string that specifies which action to call.
- `payload` is a value that you would like to pass to your action.

#### Update

`update: { fn: payload => state => (...) }`

Contains functions that will update your state. Functions must return the parts of the state that they wish to change. When an update returns, the view is automatically rendered with the new state, if any changes occurred. Updates must be synchronous.

- `payload` refers to the payload sent by `commit`.
- `state` refers to the current state of your program, which was initialized with the model passed into the program originally.

#### Action

`action: { fn: (ctx, payload) => (...) }`

Contains functions that will commit updates or dispatch more actions. Actions can be asynchronous.

- `ctx` is an object that contains the `commit` and `dispatch` functions.
- `payload` refers to the payload sent by `dispatch`.

#### View

`view: ctx => state => (...)`

A function that returns a pure representation of your state. Can be written in JSX, or anything that can compile down to hyperscript - `h` is provided by the framework, as a way to begin writing programs quickly.

- `ctx` is an object that contains the `commit` and `dispatch` functions.
- `state` refers to the state of your program.

### H

`h(element, attributes, children)`

An implementation of [hyperscript](https://github.com/hyperhype/hyperscript).

### Mount

`mount(program, selector)`

A function that allows you to attach your program to an element of the DOM.

- `program` is your Coppice program.
- `selector` is the class or id of the element (ex. "#app", or ".app"), defaults to "body".

---

### Prior Art

- [The Elm Architecture](https://guide.elm-lang.org/architecture/)
- [Hyperapp](https://github.com/hyperapp/hyperapp)
- [Redux](https://github.com/reactjs/redux) / [Veux](https://github.com/vuejs/vuex)
- [The SAM Pattern](http://sam.js.org/)

### Differences between other frameworks

- Although the framework is only 1-2 kB gzipped, Coppice is not totally concerned about filesize. Check out the Roadmap for planned features.
- Always returns the state of the application last. This makes updates and views simple to integrate with other functional libraries, such as [Ramda](http://ramdajs.com/) or [lodash/fp](https://github.com/lodash/lodash/tree/4.17.4-npm/fp), where functions generally expect data last.
- Single state: No local state between views, which erases the complexity of managing parent/child communication. See Redux, Vuex or The Elm Architecture to understand why this is beneficial.
- Focused on reusable functions instead of reusable components.
- Testability - testing updates is as easy as passing in data and making sure it did what you wanted.

### Quick start

[Coppice App](https://github.com/brandonchartier/coppice-app) gets you running in seconds. It comes preloaded with the encouraged defaults - Webpack, Babel, and JSX. `npm run dev` sets up a dev server with hot module replacement and `npm run build` produces a production-ready program.

---

## Roadmap

- Immutable state handling, to ease rolling back to previous states.
- CLI for Coppice App, and adding examples, to make start-up simpler.
