import { patch, h } from 'turbodom';

export const html = h;

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
