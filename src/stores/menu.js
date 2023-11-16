import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", () => {
  const menuList = ref([
    { name: "회원가입", show: true, routeName: "regist" },
    { name: "로그인", show: true, routeName: "login" },
    // { name: "오늘할일", show: false, routeName: "todos" },
    { name: "내정보", show: false, routeName: "mypage" },
    { name: "로그아웃", show: false, routeName: "logout" },
  ]);

  const changeMenuState = () => {
    
    console.log("변경 전")
    console.log(menuList.value)
    menuList.value = menuList.value.map((item) => ({ ...item, show: !item.show }));
    
    console.log("변경 후")
    console.log(menuList.value)
  };
  return {
    menuList,
    changeMenuState,
  };
});
