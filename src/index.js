import { patch, h as hyperscript } from 'turbodom';

export const h = hyperscript;

export const mount = (selector = 'body', app) => {
	document.querySelector(selector).appendChild(app);
};

export const program = ({ model = {}, update = {}, view }) => {
	let element, oldNode;
	let root = document.createElement(null);

	// View
	const render = newNode => {
		return (element = patch(
			root,
			element,
			oldNode,
			(oldNode = newNode)
		));
	};

	// Update
	Object.keys(update).forEach(key => {
		const msg = update[key];

		update[key] = (...payload) => {
			Object.assign(model, msg(
				model,
				update,
				...payload
			));

			render(view(model, update));
		};
	});

	return render(view(model, update));
};
