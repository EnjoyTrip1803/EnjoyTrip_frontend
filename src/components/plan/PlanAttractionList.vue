<script setup>
import { ref, onMounted } from 'vue';
import { createTripPlanAttraction, listTripPlanAttraction, ramoveTripPlanAttraction } from '@/api/plan.js'

// const { userId, planId, title } = history.state;

const userId = 5;
const planId = 10;
const title = "it's a title";

const planAttractionList = ref([]);

onMounted(() => {
  getPlanList();
});

const planCondition = ref({
  planId: planId,
  contentId: 0,
});


const getPlanList = () => {
  listTripPlanAttraction(
    planId,
    ({ data }) => {
      // console.log(data)
      planAttractionList.value = data;
    },
    (err) => {
      console.log(err);
    }
  )
  console.log("planAttractionList")
  console.log(planAttractionList.value)
}

const addPlanAttraction = (contentId) => {
  planCondition.value.contentId = contentId;
  createTripPlanAttraction(
    planCondition.value,
    () => { getPlanList(); },
    (err) => { console.log(err) }
  )

};

const removePlanAttraction = (contentId) => {
  planCondition.value.contentId = contentId;
  ramoveTripPlanAttraction(
    planCondition.value.planId,
    planCondition.value.contentId,
    () => { getPlanList(); },
    (err) => { console.log(err) }
  )
};


</script>

<template>
  <div class="plan-attraction-list-container justify-content-center overflow-auto">
    <a href="#"
      class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom justify-content-between">
      <div class="d-flex flex-column ">
        <span class="fs-6 fw-semibold">your</span>
        <span class="fs-2 fw-semibold" style="">{{ title }}</span>
      </div>
      <!-- <img src="@\assets\icon\plus.png" style="width: 30px; margin: 0 10px;" @click="createPlan" /> -->
    </a>
    <div v-if="planAttractionList[0] != null">
      <div class="list-group list-group-flush border-bottom scrollarea" v-for="attraction in planAttractionList"
        :key="attraction.contentId">
        <a href="#" class="list-group-item list-group-item-action py-0 lh-tight" @click="viewAttraction(attraction)">
          <div class="d-flex align-items-center" id="attraction-card">
            <div v-if="attraction.firstImage === ''"> <!-- == 2개는 자바스크립트에서는 안돼요. === 3개로 써주세요. 아시겠어요???? -->
              <div class="d-flex justify-content-center align-items-center" style="width: 130px; height: 100px;">
                <img src="@/assets/icon/image.png" :alt="`${attraction.title}`" height="70" width="70">
              </div>
            </div>
            <div v-else>
              <img :src="`${attraction.firstImage}`" :alt="`${attraction.title}`" width="130" height="100"
                style="border-radius: 2%;">
            </div>

            <a href="#" class="list-group-item list-group-item-action py-3 lh-tight" style="border: none;">
              <div class="d-flex align-items-center justify-content-between">
                <strong class="mb-1">{{ attraction.title }}</strong>
                <button type="button" class="btn btn-outline-primary btn-sm"
                  @click="removePlanAttraction(attraction.contentId)">Del</button>
              </div>
              <div class="col-10 mb-1 small">
                <div>{{ attraction.addr1 }}</div>
                <div v-if="!(attraction.tel === '')" class="d-flex align-items-center" style="margin-top: 15px;">
                  <img src="@/assets/icon/phone-call.png" alt="call" height="14" width="14" style="margin-right: 7px;">
                  {{ attraction.tel }}
                </div>
              </div>
            </a>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#plan-attraction-list-container {
  width: 100%;
  height: 100%;
}
</style>