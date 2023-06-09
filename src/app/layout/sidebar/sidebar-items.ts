import { RouteInfo } from "./sidebar.metadata";
export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "MENUITEMS.MAIN.TEXT",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    submenu: [],
  },
  {
    path: "home",
    title: "MENUITEMS.HOME.TEXT",
    iconType: "feather",
    icon: "home",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [],
  },
  {
    path: "",
    title: "MENUITEMS.ALMACEN.TEXT",
    iconType: "feather",
    icon: "square",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [
      {
        path: "almacen/lista",
        title: "MENUITEMS.ALMACEN.LIST.LISTADOALMACEN",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
      {
        path: "almacen/nuevo/0",
        title: "MENUITEMS.ALMACEN.LIST.AGREGARALMACEN",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
      // {
      //   path: "movimiento/lista",
      //   title: "MENUITEMS.ALMACEN.LIST.MOVIMIENTOS",
      //   iconType: "",
      //   icon: "",
      //   class: "ml-menu",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   submenu: [],
      // },
      // {
      //   path: "almacen/transferencia",
      //   title: "MENUITEMS.ALMACEN.LIST.TRANSFERENCIA",
      //   iconType: "",
      //   icon: "",
      //   class: "ml-menu",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   submenu: [],
      // },
    ],
  },
  {
    path: "",
    title: "MENUITEMS.PRODUCTO.TEXT",
    iconType: "feather",
    icon: "target",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [
      {
        path: "producto/lista",
        title: "MENUITEMS.PRODUCTO.LIST.LISTADOPRODUCTO",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
      {
        path: "producto/nuevo/0",
        title: "MENUITEMS.PRODUCTO.LIST.AGREGARPRODUCTO",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "MENUITEMS.INVENTARIO.TEXT",
    iconType: "feather",
    icon: "trending-up",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [
      {
        path: "producto/stock",
        title: "MENUITEMS.INVENTARIO.LIST.STOCK",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
      {
        path: "producto/stock-lote",
        title: "MENUITEMS.INVENTARIO.LIST.STOCKLOTE",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
      {
        path: "inventario/movimientos",
        title: "MENUITEMS.INVENTARIO.LIST.MOVIMIENTOS",
        iconType: "feather",
        icon: "file-text",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
      {
        path: "inventario/correccion-stock",
        title: "MENUITEMS.INVENTARIO.LIST.CORRECCIONSTOCK",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
      {
        path: "inventario/transferencia-stock",
        title: "MENUITEMS.INVENTARIO.LIST.TRANSFERENCIASTOCK",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
    ],
  },
  {
    path: "proveedor",
    title: "MENUITEMS.PROVEEDOR.TEXT",
    iconType: "feather",
    icon: "Truck",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [],
  },
  {
    path: "categoria",
    title: "MENUITEMS.CATEGORIA.TEXT",
    iconType: "feather",
    icon: "Columns",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [],
  },
  {
    path: "grupo",
    title: "MENUITEMS.GRUPO.TEXT",
    iconType: "feather",
    icon: "Trello",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [],
  },
  // Common Modules
  // {
  //   path: "",
  //   title: "Authentication",
  //   iconType: "feather",
  //   icon: "user-check",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   submenu: [
  //     {
  //       path: "/authentication/signin",
  //       title: "Sign In",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/signup",
  //       title: "Sign Up",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/forgot-password",
  //       title: "Forgot Password",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/locked",
  //       title: "Locked",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/page404",
  //       title: "404 - Not Found",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/page500",
  //       title: "500 - Server Error",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     },
  //   ],
  // },
  
];
