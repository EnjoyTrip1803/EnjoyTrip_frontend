<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member.js"
import { listPlan } from "@/api/plan.js"


const router = useRouter();
// const { userInfo } = storeToRefs(useMemberStore());
// const userId = ref(userInfo.value.userId);
const userId = ref(5);
const planList = ref([]);

onMounted(() => {
  getPlanList(userId.value);
})

const movePlan = (planId, title) => {
  router.push({ name: "makeList", state: { userId: userId.value, planId: planId, title: title } });
}
const createPlan = () => {
  router.push({ name: "createPlan", state: { userId: userId.value } });
}

const getPlanList = (userId) => {
  listPlan(
    userId,
    ({ data }) => {
      var list = [];
      data.forEach((plan) => {
        list.push(plan)
      });
      planList.value = list;
    },
    (err) => {
      console.log(err);
    }
  );
}

const getDateFomr = (timestamp) => {
  // Create a date object from a date string
  var date = new Date(timestamp);

  // Get year, month, and day part from the date
  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy-mm-dd date string
  var formattedDate = year + " " + month + " " + day;
  // console.log(formattedDate);  // Prints: 2022-05-04
  return formattedDate;
}
</script>

<template>
  <div id="plan-list">
    <div class="justify-content-center" >
      <a href="#"
        class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom justify-content-between">
        <div class="d-flex align-items-center">
          <img src="@\assets\icon\check.png" alt="check" style="width: 20px; margin: 0 10px;">
          <span class="fs-5 fw-semibold">Plans</span>
        </div>
        <img src="@\assets\icon\plus.png" style="width: 30px; margin: 0 10px;" @click="createPlan" />
      </a>
      <div class="list-group list-group-flush border-bottom scrollarea" v-for="plan in planList" :key="plan.planId">
        <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-between" @click="movePlan(plan.planId, plan.title)">
            <div class="d-flex align-items-center">
              <img src="@\assets\icon\plane.png" style="width: 25px; margin: 0 10px 5px 5px;"  />
              <strong class="mb-1">{{ plan.title }}</strong>
            </div>
            <small class="text-muted"> -</small>
          </div>
          <div class="col-10 mb-1 small">{{ getDateFomr(plan.startDate) + " ~ " + getDateFomr(plan.endDate) }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#plan-list {
  width: 100%;
  height: 100%;

}

</style>
