import { attractionAxios } from "@/util/http-commons";

const attraction = attractionAxios();

function createTripPlan(param, success, fail) {
  console.log("createPlan api 호출")
  attraction.get("/plan/", { params: param }).then(success).catch(fail);
}

function listArea(param, success, fail) {
  // console.log("listSido api 호출")
    attraction.get(`/list/${param}`).then(success).catch(fail);
}
  
function listContentType(success, fail) {
  // console.log("listContentType api 호출")
    attraction.get("/list/type").then(success).catch(fail);
  }

export { createTripPlan };