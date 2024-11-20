import { createPinia, Pinia } from 'pinia';
import { App } from 'vue';

export const PiniaInit = (app: App<Element>): Pinia => {
  const pinia = createPinia();
  app.use(pinia);
  return pinia;
}
