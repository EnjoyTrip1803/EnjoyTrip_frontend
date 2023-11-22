<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member.js"
import { listPlan } from "@/api/plan.js"
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue"

const router = useRouter();
const { userInfo } = storeToRefs(useMemberStore());
const userId = ref(userInfo.value.userId);
const planList = ref([{
    trip_start_date: "20-2-2",
    trip_end_date: "20-2-2",
    title: "서울여행",
}])

onMounted(() => {
    console.log(userInfo.value);
    getPlanList(userId.value);
})

const movePlan = (planId, title) => {
// console.log(userId.value, planId)
// console.log(typeof(userId.value), typeof(planId))
    router.push({ name: "makeList", state: {userId: userId.value, planId: planId, title: title} });
}
const createPlan = () => {
    // console.log("createPlan clicked")
    // console.log(userId.value)
    router.push({ name: "createPlan", state: {userId: userId.value} });
}

// console.log(planList.value.length)

const getPlanList = (userId) => {
    listPlan(
        userId,
        ({ data }) => {
            // console.log(data);
            var list = [];
            data.forEach((plan) => {
                // console.log(plan);
                list.push(plan)
            });
            planList.value = list;
        },
        (err) => {
          console.log(err);
        }
    );
}
</script>

<template>
    <TheHeadingNavbar/>
    <div class="row" id="plan-choice-container">
        <div class="col-3" id="plan-choice">
                <div v-if="planList.length == 0" >
                    <h4>no plan</h4>
                </div>
                <div v-else>
                    여행 계획 선택하기
                    <div v-for="plan in planList" :key="plan.planId">
                        <div @click="movePlan(plan.planId, plan.title)">
                            {{ plan.title }}
                        </div>
                    </div>
                </div>
        </div>
        <div class="col-2 d-flex justify-content-center" id="new-plan-choice" >
            <img src="https://cdn-icons-png.flaticon.com/128/9572/9572704.png" @click="createPlan"/>
        </div>
    </div>
</template>

<style scoped>
#plan-choice-container {
    position: absolute;
    width: 100%;
    height: 100%;
    /* margin: auto; */
    justify-content: center;
    
}

#plan-choice {
    margin: 20px;
    width: 300px;
    height: 300px;
    border-radius: 5%;
    background-color: antiquewhite;    
}


#new-plan-choice {
    margin: 20px;
    width: 100px;
    height: 100px;
    border-radius: 5%;
    /* background-color: whitesmoke;     */
}

#plan-list {
    width: 90%;
    height: 90%;
    background-color: aliceblue;
}
</style>