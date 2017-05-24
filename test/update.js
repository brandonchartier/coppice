const sample = list => (
	list[Math.floor(Math.random() * list.length)]
);

export const sync = (state, _, evt) => ({
  item: evt.target.value
});

export const add = ({ item, items }) => ({
	item: '',
	items: items.concat(item)
});

export const reset = () => ({
  items: []
});

export const remove = ({ items }, _, evt) => ({
  items: items.filter((item, i) => i !== Number(evt.target.value))
});

export const choose = ({ items }) => ({
  chosen: sample(items)
});
