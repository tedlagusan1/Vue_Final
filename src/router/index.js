import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ManagePlants from '../views/ManagePlants.vue';
import About from '../views/About.vue'; // Import the About component

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/manage', name: 'ManagePlants', component: ManagePlants },
  { path: '/about', name: 'About', component: About }, // Add the About route
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
