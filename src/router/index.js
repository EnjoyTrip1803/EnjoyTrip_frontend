import { createRouter, createWebHistory } from 'vue-router'
import TheMainView from '@/views/TheMainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: TheMainView
    },
    {
      path: '/attraction',
      name: 'attraction',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/TheAttractionView.vue')
      // redirect: { name: "attraction" },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/components/user/UserLogin.vue")
    },
    {
      path: "/regist",
      name: "regist",
      component: () => import("@/components/user/UserRegist.vue")
    },
    {
      path: "/mypage",
      name: "mypage",
      component: () => import("@/components/user/UserMyPage.vue")
    },
    {
      path: "/board",
      name: "board",
      // component: TheBoardView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/TheBoardView.vue"),
      redirect: { name: "article-list" },
      children: [
        {
          path: "list",
          name: "article-list",
          component: () => import("@/components/board/BoardList.vue"),
        },
        {
          path: "view/:articleno",
          name: "article-view",
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "article-write",
          component: () => import("@/components/board/BoardWrite.vue"),
        },
        {
          path: "modify/:articleno",
          name: "article-modify",
          component: () => import("@/components/board/BoardModify.vue"),
        },
      ],
    },
  ]
})

export default router
