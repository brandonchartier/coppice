import { h } from '../lib';

const prevent = e => e.preventDefault();

const list = ({ items }, msg) => (
	h('ul', items.map((item, index) => (
		h('li', [
			h('span', `${item} `),
			h('button', {
				onclick: msg.remove,
				value: index
			}, 'x')
		])
	)))
);

const form = (model, msg) => (
	h('div', [
		h('form', { onsubmit: prevent }, [
			h('input', {
				oninput: msg.sync,
				value: model.item
			}),
			h('button', {
				onclick: msg.add,
				type: 'submit'
			}, 'Add')
		])
	])
);

const controls = (model, msg) => (
	h('div', [
		h('button', { onclick: msg.reset }, 'Reset'),
		h('button', { onclick: msg.choose }, 'Choose'),
		h('h1', model.chosen)
	])
);

const view = (model, msg) => (
	h('div', [
		list(model, msg),
		form(model, msg),
		controls(model, msg)
	])
);

export default view;
