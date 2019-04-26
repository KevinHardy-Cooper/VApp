import Vue from "vue";
import Router from "vue-router";

// This format for lazy loading
const Login = () => import("./views/Login.vue");
const SignUp = () => import("./views/SignUp.vue");
const Home = () => import("./views/Home.vue");
const Dashboard = () => import("./views/Dashboard");
const History = () => import("./views/History");
const About = () => import("./views/About");
const Settings = () => import("./views/Settings");
const FacebookFlow = () => import("./views/FacebookFlow");
const InstagramFlow = () => import("./views/InstagramFlow");
const TwitterFlow = () => import("./views/TwitterFlow");

Vue.use(Router);

// Router endpoints should only point to a view
// TODO: Add meta data to each link

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/history",
      name: "history",
      component: History
    },
    {
      path: "/settings/:socialMedia",
      name: "settings",
      component: Settings
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signUp",
      component: SignUp
    },
    {
      path: "/facebook",
      name: "facebook",
      component: FacebookFlow
    },
    {
      path: "/instagram",
      name: "instagram",
      component: InstagramFlow
    },
    {
      path: "/twitter",
      name: "twitter",
      component: TwitterFlow
    }
  ]
});
