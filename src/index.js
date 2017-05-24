import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import hyperscript from 'virtual-dom/h';
import patch from 'virtual-dom/patch';

export const h = hyperscript;

export const program = ({ model = {}, update = {}, view }) => {
	let root, tree;

	// Update
	Object.keys(update).forEach(key => {
		const msg = update[key];

		update[key] = (...payload) => {
			Object.assign(model, msg(
				model,
				update,
				...payload
			));

			const newTree = view(model, update);
			const patches = diff(tree, newTree);

			root = patch(root, patches);
			tree = newTree;
		};
	});

	// View
	tree = view(model, update);
	root = createElement(tree);

	const mount = (selector = 'body') => {
		const el = document.querySelector(selector);

		return el.appendChild(root);
	};

	return { mount };
};
