import curry from 'just-curry-it';
import extend from 'just-extend';
import { patch, h as hyperscript } from 'picodom';

export const h = hyperscript;

export const mount = (app, selector = 'body') => {
  document.querySelector(selector).appendChild(app);
};

export const program = ({ model = {}, update = {}, action = {}, view }) => {
  let element, oldNode;
  let root = document.createElement(null);

  const render = newNode => (
    element = patch(
      root,
      element,
      oldNode,
      (oldNode = newNode)
    )
  );

  const commit = curry((type, payload) => {
    const fn = update[type];

    extend(model, fn(payload)(model));

    render(view({ commit, dispatch })(model));
  });

  const dispatch = curry((type, payload) => {
    const fn = action[type];

    fn(payload, { commit, dispatch });
  });

  return render(view({ commit, dispatch })(model));
};
