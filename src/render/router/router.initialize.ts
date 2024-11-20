import { routeStore } from '@render/stores/route-store/route.store';
import { Pinia } from 'pinia';
import { App } from 'vue';

export const RouterInit = (app: App<Element>, pinia: Pinia) => {
  const { router } = routeStore(pinia);
  router && app.use(router);
  router.push({ name: 'Home' });
}
