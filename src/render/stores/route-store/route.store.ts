import { defineStore } from 'pinia';
import { EStoreNamespace } from '../store.namespace';
import { RouteStore } from './route.dto';
import { createRouter, createWebHashHistory } from 'vue-router';
import { RouteService } from '@render/router/router.service';

export const routeStore = defineStore(EStoreNamespace.route, {
  state: (): RouteStore => {
    const { routeGroups, routes, menus } = RouteService.instance();
    return {
      routeGroups,
      routes,
      menus,
      router: createRouter({
        history: createWebHashHistory(),
        routes,
      }),
    }
  },
});
