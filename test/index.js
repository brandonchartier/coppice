import { program } from '../src';
import store from './store';
import * as update from './update';
import view from './view';

const chooser = program({
  model: store,
  update,
  view,
});

chooser.mount();
