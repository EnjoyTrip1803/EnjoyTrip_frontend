<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import logo from '@/assets/logo/logo.vue';
import PlanMakeList from "@/components/plan/PlanMakeList.vue";
import PlanList from "@/components/plan/PlanList.vue";
import PlanCreate from "../components/plan/PlanCreate.vue";
import PlanAttractionList from "../components/plan/PlanAttractionList.vue";

const router = useRouter();

const activeKey = ref('');
const mode = ref('attraction');
const planId = ref('');

const changeMode = (m, p) => {
    mode.value = m;
    planId.value = p;
}

const moveMain = () => {
  router.push({ name: 'main' })
}
</script>

<template>
  <div id="tap-container" class="d-flex">
    <a-tabs v-model="activeKey" tab-position="left" size="large" defaultActiveKey="map">
      <a-tab-pane key='home' style="margin: 0; padding: 0;" id="tap-home">
        <template #tab >
          <span @click="moveMain" >
            <logo width="65px" height="40px" />
          </span>
        </template>
      </a-tab-pane>
      
      <a-tab-pane key='map' tab="Map" style="margin: 0; padding: 0;">
      </a-tab-pane>
      
      <a-tab-pane key="plan" tab="Plan" style="margin: 0; padding: 0;">
        <div class="d-flex" id="plan-container">
            <div v-if="mode === 'select'" style="max-width: 400px;">
                <PlanList @change-mode="changeMode"/>
            </div>
            <div v-else-if="mode === 'create'" style="max-width: 400px;">
                <PlanCreate @change-mode="changeMode"/>
            </div>
            <div v-else-if="mode === 'attraction'" style="max-width: 400px;">
                <PlanAttractionList @change-mode="changeMode"/>
            </div>

        </div>
      </a-tab-pane>

      <div id="plan-make-container">
        <PlanMakeList :planId="planId"/>
      </div>
    </a-tabs>
  </div>
</template>

<style scoped>
#tap-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>