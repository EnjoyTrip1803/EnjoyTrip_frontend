import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", () => {
  const menuList = ref([
    { name: "여행", show: true, routeName: "attraction" },
    { name: "게시판", show: true, routeName: "board" },
    { name: "로그인", show: true, routeName: "user-login" },
    { name: "내정보", show: false, routeName: "mypage" },
    { name: "로그아웃", show: false, routeName: "user-logout" },
  ]);

  const changeMenuState = () => {
    menuList.value[2].show = !menuList.value[2].show;
    menuList.value[3].show = !menuList.value[3].show;
    menuList.value[4].show = !menuList.value[4].show;
  };
  return {
    menuList,
    changeMenuState,
  };
});
