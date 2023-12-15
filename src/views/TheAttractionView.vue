<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


import Stomp from 'webstomp-client';
import SockJS from "sockjs-client/dist/sockjs";
import logo from '@/assets/logo/logo.vue';
import PlanMakeList from "@/components/plan/PlanMakeList.vue";
import PlanList from "@/components/plan/PlanList.vue";
import PlanCreate from "../components/plan/PlanCreate.vue";
import PlanAttractionList from "../components/plan/PlanAttractionList.vue";

const router = useRouter();

const mode = ref('map');
const planId = ref();
const title = ref('default title')
const sidoCode = history.state.sidoCode;
const activeKey = ref('');

const planAttractionRef = ref(null);
const planAttractionList = ref([]);

const moveMain = () => {
  router.push({ name: 'main' })
}

const changeMode = (m, p, t) => {
  mode.value = m;
  planId.value = p;
  title.value = t;
  console.log('planId : ', planId.value);
  if (planId.value) {
    connect();
  }
  else {
    disconnect();
  }
  console.log('changeMode!!!!!!!!!')
  console.log(mode.value, planId.value, title.value);
}

const callGetAttractionList = (contentId) => {
  console.log("TheAttractionView 45 Line ContentId = ", contentId);
  planAttractionRef.value.addPlanAttraction(contentId);
}

// const setPlanParam = () => {
// }

/* socket connect */
let stompClient = null;
const connect = () => {
  const serverURL = 'http://localhost:80/ws';
  console.log(serverURL);
  const socket = new SockJS(serverURL);
  console.log(serverURL);
  stompClient = Stomp.over(socket);

  stompClient.connect(
    {},
    (frame) => {
      console.log('소켓 연결 성공', frame);
      stompClient.subscribe('/topic/channel/' + planId.value, (res) => {
        let data = JSON.parse(res.body);
        if (data.type == 'plan') {
          if (data.action == 'insert') {
            let isOn = false;
            for (let i = 0; i < planAttractionList.value.length; i++) {
              if (planAttractionList.value[i].contentId == data.contentId) {
                isOn = true;
                break;
              }
            }
            if (!isOn) planAttractionList.value.push(data);
          }
        }

        console.log('response test : ', data);
      });
    },
    (error) => {
      console.log('소켓 연결 실패', error);
    }
  );
};

/* socket disconnect */
const disconnect = () => {
  if (stompClient) stompClient.disconnect(() => { stompClient = null; });
};

/* 여행지 추가/제거 Socket Send */
const sendAttraction = (data, action) => {
  if (stompClient && stompClient.connected) {
    const msg = {
      type: 'plan',
      planId: planId.value,
      action: action,
      contentId: data.contentId,
      contentTypeId: data.contentTypeId,
      title: data.title,
      addr1: data.addr1,
      addr2: data.addr2,
      tel: data.tel,
      firstImage: data.firstImage,
      firstImage2: data.firstImage2,
      sidoCode: data.sidoCode,
      gugunCode: data.gugunCode,
      latitude: data.latitude,
      longitude: data.longitude,
      mlevel: data.mlevel
    };
    console.log('message : ', msg);
    stompClient.send('/app/plan', JSON.stringify(msg), {});
  }
};


/* 접속한 plan의 계획 초기값 */
const planInit = (data) => {
  data.forEach((item) => {
    planAttractionList.value.push(item);
  });
  console.log("planAttractionList test : ", planAttractionList.value);
}

/* plan에 여행지 추가시 planAttractionList에 추가 및 소켓 통신*/
const addPlan = (data) => {
  console.log("TheAttractionView 105line test : ", data);
  planAttractionList.value.push(data);
  sendAttraction(data, 'insert');
}

</script>

<template>
  <div id="tap-container" class="d-flex">
    <a-tabs v-model="activeKey" tab-position="left" size="large" :defaultActiveKey="mode === 'map' ? 'map' : 'plan'">
      <a-tab-pane key='home' style="margin: 0; padding: 0;" id="tap-home">
        <template #tab>
          <span @click="moveMain">
            <logo width="65px" height="40px" />
          </span>
        </template>
      </a-tab-pane>

      <a-tab-pane key='map' tab="Map" style="margin: 0; padding: 0;">
      </a-tab-pane>

      <a-tab-pane key="plan" tab="Plan" style="margin: 0; padding: 0;">
        <div class="d-flex" id="plan-container">
          <div v-if="mode === 'map'" style="max-width: 400px;">
            <PlanList @changeMode="changeMode" />
          </div>
          <div v-else-if="mode === 'create'" style="max-width: 400px;">
            <PlanCreate @changeMode="changeMode" />
          </div>
          <div v-else-if="mode === 'attraction'" style="max-width: 400px;">
            <PlanAttractionList ref="planAttractionRef" @changeMode="changeMode" @planInit="planInit" @addPlan="addPlan"
              :title="title" :planId="planId" :planAttractionList="planAttractionList" />
          </div>

        </div>
      </a-tab-pane>

      <div id="plan-make-container">
        <PlanMakeList @callGetAttractionList="callGetAttractionList" :mode="mode" :planId="planId" :sidoCode="sidoCode" />
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