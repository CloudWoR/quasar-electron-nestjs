import { Menus, RouteGroup, IRouteMeta } from '@render/stores/route-store/route.dto';
import { RouteRecordRaw } from 'vue-router';

export class RouteService {
  private static _instance: RouteService;
  private vueFiles: Record<string, () => Promise<unknown>>;
  public routeGroups: RouteGroup[] = [];
  public routes: RouteRecordRaw[] = [
    {
      path: '/',
      name: 'Home',
      component: () => import('@render/pages/home/Home.vue'),
    }
  ];
  public menus: Menus[] = [];
  private constructor() {
    this.initailze();
  }
  static instance() {
    if (!RouteService._instance) {
      RouteService._instance = new RouteService();
    }
    return RouteService._instance;
  }

  // 初始化路由
  private initailze() {
    this.vueFiles = this.searchVueFile();
    this.routes = this.searchRouteMeta();
    console.log('routes: ', this.routes)
    this.menus = this.createMenus(this.routeGroups, this.routes);
  }

  // 设置首字母大写
  private capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private searchVueFile() {
    const search = import.meta.glob('../pages/**/*.vue');
    return search;
  }

  /**
   * 自动获取路由父节点
   * @returns RouteGroup
   */
  private searchRouteGroup() {
    const search = import.meta.glob<RouteGroup>(
      `../pages/**/route.group.ts`,
      {
        eager: true,
        import: 'default',
      },
    );
    return search;
  }

  /**
   * 
   * @param path 传入子菜单路径
   * @param meta 传入子菜单meta
   * 绑定子菜单
   */
  private setRoteGroup(path: string, meta: IRouteMeta) {
    const searchGroup = this.searchRouteGroup();
    const splicePath = path.split('/').filter(Boolean);
    const routeGroups = Object.entries(searchGroup).map(([metaPath, routeGroup]) => {
      const groupName = metaPath.replace('../pages/', '').replace('/route.group.ts', '');
      splicePath.includes(groupName) && (meta.groupName = groupName);
      return {
        ...routeGroup,
        groupName,
      }
    });
    return routeGroups.filter(Boolean);
  }

  /**
   * 自动获取pages目录下所有meta文件
   * @returns pages目录下所有meta文件
   */
  private searchRouteMeta() {
    const search = import.meta.glob<IRouteMeta>(
      '../pages/**/route.meta.ts',
      {
        eager: true,
        import: 'default',
      },
    );
    const routes: RouteRecordRaw[] = Object
      .entries(search)
      .map(([metaPath, meta]): RouteRecordRaw => {
        const path = metaPath
          .replace('../pages', '')
          .replace('/route.meta.ts', '');
        // 处理菜单组信息
        let filter = path.split('/').filter(Boolean);
        filter = filter.length > 1 ? filter.splice(1) : filter;
        const name = filter
        .map((item) => this.capitalize(item)) // 添加子路由可考虑在map中处理
        .join('');
        meta.routeName = name;
        this.routeGroups = this.setRoteGroup(path, meta);
        const vuePath = metaPath.replace('route.meta.ts', `${name}.vue`);
        const component = this.vueFiles[vuePath];
        console.log('path: ', path)
        if (component) {
          return {
            path,
            name,
            component: this.vueFiles[vuePath],
            meta,
          }
        }
      }
    );
    return routes.filter(Boolean);
  }

  // 生成菜单
  private createMenus(routeGroups: RouteGroup[], routes: RouteRecordRaw[]) {
    const menus: Menus[] = [];
    for (let i = 0; i < routeGroups.length; i++) {
      const menu: Menus = {
        group: routeGroups[i],
        routeMetas: [],
      };
      for (let j = 0; j < routes.length; j++) {
        const meta = routes[j].meta as IRouteMeta;
        if (meta.groupName === menu.group.groupName) {
          menu.routeMetas.push(meta);
        }
      }
      menu.routeMetas = menu.routeMetas.sort((a, b) => a.order - b.order);
      menus.push(menu);
    }
    return menus.sort((a, b) => a.group.order - b.group.order);
  }
}