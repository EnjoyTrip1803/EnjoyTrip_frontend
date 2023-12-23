<script setup>
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member.js"
import { getInvitationByName } from "@/api/invitation.js"

const { VITE_VUE_API_URL } = import.meta.env;
const { userInfo } = storeToRefs(useMemberStore());

const userName = ref(null)

var eventSource = null;
const invitationList = ref([])

onMounted(() => {
    (async () => {
      await sleep(0.1); 
    })();
    console.log("####!!!!!!쀼ㅜ려")
    console.log(invitationList.value)
    for(let invitation of invitationList.value) {
        addInvitation(invitation)
    }
})
function sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

watch(userInfo, async () => {
    if (userInfo.value !== null) {
        userName.value = userInfo.value.userName;
        initInvitationList();

        eventSource = new EventSource(VITE_VUE_API_URL + "/subscribe?userId=" + userName.value);

        eventSource.addEventListener('init', function (event) {
            console.log(event.data)
        })

        eventSource.addEventListener('invitation', function (event) {
            const obj = JSON.parse(event.data)
            // console.log(obj)
            addInvitation(obj)
        })

    } else {
        eventSource = null;
    }
})

watch(invitationList, async () => {
    console.log("### invitationList is changed!!!")
    console.log(invitationList.value)
})


function initInvitationList() {
    getInvitationByName(
        userName.value,
        ({ data }) => {
            // console.log(data)
            invitationList.value = data;
            for(let invitation of invitationList.value) {
                addInvitation(invitation)
            }
        },
        (error) => {
            console.log(error);
        }
    )
}

function addInvitation(data) {
    var newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.classList.add('mb-2');
    newCard.innerHTML =
    `
    <div class="card-body d-flex justify-content-between ">
        <div>
            <h3 class="card-title fw-bold">${data.planId}</h3>
            <p class="card-text"><span class="fw-bold">${data.senderName}</span> 님이 초대하셨습니다.</p>
        </div>
        <div class="invitation-option d-flex align-items-center">
            <button type="button" id=${data.invitationId} class="btn btn-outline-primary btn-sm mx-2" @click="acceptInvitation(this.id)">accept</button>
            <button type="button" id=${data.invitationId} class="btn btn-outline-danger btn-sm" @click="rejectInvitation(this.id)">reject</button>
        </div>
    </div>
    `
    newCard.querySelector('.btn-outline-primary').onclick = function() {
        acceptInvitation(data.invitationId);
    };

    newCard.querySelector('.btn-outline-danger').onclick = function() {
        rejectInvitation(data.invitationId);
    };

    // 새로운 div를 원하는 부모 요소에 추가합니다.
    var container = document.querySelector(".invitation-container");
    container.appendChild(newCard);

}

function acceptInvitation(planId) {
    console.log("acceptInvitation is call")
    console.log("planId is " + planId)
}

function rejectInvitation(planId) {
    console.log("rejectInvitation is call")
    console.log("planId is " + planId)
}

function getPlanTitle(planId) {
    
}


</script>

<template>
    <div class="modal-dialog">
        <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
            <h4 class="modal-title">Join Plan</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
            <div class="invitation-container">
                <div class="card mb-1">
                    <div class="card-body d-flex justify-content-between ">
                        <div>
                            <h4 class="card-title fw-bold">##test plan title</h4>
                            <p class="card-text">"<span class="fw-bold">a</span>" 님이 </p>
                        </div>
                        <div class="invitation-option d-flex align-items-center">
                            <button type="button" id='5' class="btn btn-outline-primary btn-sm mx-2" @click="acceptInvitation(this.id)">accept</button>
                            <button type="button" id='5' class="btn btn-outline-danger btn-sm" @click="rejectInvitation(this.id)">reject</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
            <!-- <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button> -->
        </div>

        </div>
    </div>
</template>

<style scoped>
</style>