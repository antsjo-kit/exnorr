const c1 = () => import(/* webpackChunkName: "page--src-pages-slideshow-vue" */ "C:\\Users\\Anton\\Documents\\GitHub\\exnorr\\src\\pages\\Slideshow.vue")
const c2 = () => import(/* webpackChunkName: "page--src-pages-persons-vue" */ "C:\\Users\\Anton\\Documents\\GitHub\\exnorr\\src\\pages\\Persons.vue")
const c3 = () => import(/* webpackChunkName: "page--src-pages-about-vue" */ "C:\\Users\\Anton\\Documents\\GitHub\\exnorr\\src\\pages\\About.vue")
const c4 = () => import(/* webpackChunkName: "page--node-modules-gridsome-app-pages-404-vue" */ "C:\\Users\\Anton\\Documents\\GitHub\\exnorr\\node_modules\\gridsome\\app\\pages\\404.vue")
const c5 = () => import(/* webpackChunkName: "page--src-pages-index-vue" */ "C:\\Users\\Anton\\Documents\\GitHub\\exnorr\\src\\pages\\Index.vue")

export default [
  {
    path: "/slideshow/",
    component: c1
  },
  {
    path: "/persons/",
    component: c2
  },
  {
    path: "/about/",
    component: c3
  },
  {
    name: "404",
    path: "/404/",
    component: c4
  },
  {
    name: "home",
    path: "/",
    component: c5
  },
  {
    name: "*",
    path: "*",
    component: c4
  }
]
