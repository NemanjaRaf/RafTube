import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const HomePage = () => import('@/pages/HomePage.vue');
const Upload = () => import('@/pages/UploadPage.vue');
const Channel = () => import('@/pages/ChannelPage.vue');
const VideoPage = () => import('@/pages/VideoPage.vue');
const NotFound = () => import('@/pages/NotFound.vue');
const AdminHome = () => import('@/pages/admin/AdminHome.vue');
const AdminUsers = () => import('@/pages/admin/AdminUsers.vue');
const AdminEditUser = () => import('@/pages/admin/AdminEditUser.vue');
const AdminAddUser = () => import('@/pages/admin/AdminAddUser.vue');
const AdminVideos = () => import('@/pages/admin/AdminVideos.vue');
const AdminEditVideo = () => import('@/pages/admin/AdminEditVideo.vue');
const AdminAddVideo = () => import('@/pages/admin/AdminAddVideo.vue');

const Login = () => import('@/pages/LoginPage.vue');

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/upload', component: Upload },
  { path: '/channel', component: Channel },
  { path: '/video/:id', component: VideoPage, props: true },
  { path: '/admin', component: AdminHome },
  { path: '/admin/users', component: AdminUsers },
  { path: '/admin/users/add', component: AdminAddUser },
  { path: '/admin/users/:id', component: AdminEditUser, props: true },
  { path: '/admin/videos', component: AdminVideos },
  { path: '/admin/videos/add', component: AdminAddVideo },
  { path: '/admin/videos/:id', component: AdminEditVideo, props: true },
  { path: '*', component: NotFound }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;