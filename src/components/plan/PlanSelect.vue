<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";

import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue"


onMounted(() => {
    
})

const router = useRouter();

const planList = ref([{
    trip_start_date: "20-2-2",
    trip_end_date: "20-2-2",
    title: "서울여행",
}])

const movePlan = (planId) => {
    router.push({ name: "map", params: {planId: planId} });
}
const createPlan = () => {
    console.log("createPlan clicked")
    router.push({ name: "createPlan" });
}

const userId = "test";
// console.log(planList.value.length)
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
                        <div @click="movePlan(plan.planId)">
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