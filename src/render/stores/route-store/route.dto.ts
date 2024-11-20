import { RouteRecordRaw, Router } from 'vue-router';

export interface IRouteMeta extends Record<string | number | symbol, unknown> {
  subMenuName: string; // 子菜单名称
  groupName?: string; // 路由组名称
  routeName?: string; // 路由名称
  icon: string;
  order: number;
}

export interface RouteGroup {
  menuName: string; // 菜单名称
  groupName?: string; // 路由组名称
  icon: string;
  order: number;
  hidden?: boolean;
  disable?: boolean;
  isOpen?: boolean;
}

export interface Menus {
  group: RouteGroup,
  routeMetas: IRouteMeta[],
}

export interface RouteStore {
  routeGroups: RouteGroup[],
  routes: RouteRecordRaw[],
  router: Router,
  menus: Menus[],
}
