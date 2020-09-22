import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import store from './store';

import './styles/index.scss'


import '@/permission'




import { Col, Row, Button, Grid, GridItem, NavBar, Card, Form, Field, Picker, Stepper, Popup, Uploader, Icon, Toast, Switch, List, Cell, PullRefresh, SwipeCell, CellGroup, Sidebar, SidebarItem, Divider } from 'vant';

Vue.use(Col);
Vue.use(Row);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Card);
Vue.use(Form);
Vue.use(Field);
Vue.use(Picker);
Vue.use(Stepper);
Vue.use(Popup);
Vue.use(Uploader);
Vue.use(Icon);
Vue.use(Toast);
Vue.use(Switch);
Vue.use(List);
Vue.use(Cell);
Vue.use(PullRefresh);
Vue.use(SwipeCell);
Vue.use(CellGroup);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Divider);

Vue.prototype.$toast = Toast;



Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(router);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
