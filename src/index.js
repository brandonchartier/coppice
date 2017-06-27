import create from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import hyperscript from 'virtual-dom/h';
import patch from 'virtual-dom/patch';

export const h = hyperscript;

export const mount = (app, selector = 'body') => {
  document.querySelector(selector).appendChild(app);
};

export const program = ({ model = {}, update = {}, view }) => {
  let root, tree;

  // Update
  Object.keys(update).forEach(key => {
    const msg = update[key];

    update[key] = (...payload) => {
      Object.assign(model, msg(...payload, update)(model));

      const newTree = view(update)(model);
      const patches = diff(tree, newTree);

      tree = newTree;
      root = patch(root, patches);
    };
  });

  // View
  tree = view(update)(model);
  root = create(tree);

  return root;
};
