import { attractionAxios } from "@/util/http-commons";

const attraction = attractionAxios();

function listAttractions(param, success, fail) {
  console.log("listAttractions api 호출")
  console.log(param)
  attraction.get("/list/", param).then(success).catch(fail);
}

function listArea(param, success, fail) {
  // console.log("listSido api 호출")
    attraction.get(`/list/${param}`).then(success).catch(fail);
  }

export { listArea, listAttractions };