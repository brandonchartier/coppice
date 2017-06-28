import { patch, h as hyperscript } from 'picodom';

export const h = hyperscript;

export const mount = (app, selector = 'body') => {
  document.querySelector(selector).appendChild(app);
};

export const program = ({ model = {}, update = {}, view }) => {
  let element, oldNode;
  let root = document.createElement(null);

  // View
  const render = newNode => (
    element = patch(
      root,
      element,
      oldNode,
      (oldNode = newNode)
    )
  );

  // Update
  Object.keys(update).forEach(key => {
    const msg = update[key];

    update[key] = (...payload) => {
      Object.assign(model, msg(...payload, update)(model));

      render(view(update)(model));
    };
  });

  return render(view(update)(model));
};
