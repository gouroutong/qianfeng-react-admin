import Login from "../pages/Login";
import List from "../pages/admin/products/List";
import Index from "../pages/admin/dashboard";
import Edit from "../pages/admin/products/Edit";
import PageNotFound from '../pages/PageNotFound'
import Notice from '../pages/admin/notice'

export const mainRoutes = [
  {
    path: "/login",
    component: Login,
  },{
    path: "/404",
    component: PageNotFound,
  }
];

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    component: Index,
    isShow:true,
    title:"看板",
    icon:"area-chart"
  },
  {
    path: "/admin/products",
    component: List,
    exact:true,
    isShow:true,
    title:"商品管理",
    icon:"shop"
  },
  {
    path: "/admin/products/edit/:id",
    component: Edit,
    isShow:false
  },
  {
    path: "/admin/notice",
    component: Notice,
    isShow:false
  },
];
