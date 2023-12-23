import { invitationAxios } from "@/util/http-commons";

const axios = invitationAxios();

function getInvitationByName(name, success, fail) {
  console.log("getInvitationByName api 호출")
  axios.get(`?name=${name}`).then(success).catch(fail);
}

function createInvitation(data, success, fail) {
    console.log("createInvitation api 호출")
    axios.post("", data).then(success).catch(fail);
}
  
function deleteInvitation(id, success, fail) {
    console.log("deleteInvitation api 호출")
    axios.delete("", id).then(success).catch(fail);
  }

export { getInvitationByName, createInvitation, deleteInvitation};