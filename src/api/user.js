import { userAxios } from "@/util/http-commons";

const user = userAxios();

async function userConfirm(param, success, fail) {
  await user.post(`/login`, param).then(success).catch(fail);
  console.log("userConfirm ok");
}

async function findById(userid, success, fail) {
  user.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await user.get(`/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  user.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await user.post(`/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await user.get(`/logout/${userid}`).then(success).catch(fail);
}

async function regist(user, success, fail) {
  await user.post(`/join`, user).then(success).catch(fail);
}

export { userConfirm, findById, tokenRegeneration, logout, regist };
