import { createApp } from 'vue';
import { Quasar, Dialog } from 'quasar';
import App from './App.vue';
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import 'quasar/src/css/index.sass';
import { PiniaInit } from './stores/store.initialize';
import { RouterInit } from './router/router.initialize';

const app = createApp(App);

app.use(Quasar, {
  plugins: {
    Dialog,
  },
});

const pinia = PiniaInit(app);
// RouterInit(app, pinia);

app.mount('#app');
