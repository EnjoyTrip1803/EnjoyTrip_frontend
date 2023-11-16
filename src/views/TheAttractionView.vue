<script setup>
import { ref, onMounted } from "vue";
import { listArea, listAttractions } from "@/api/attraction";

import VKakaoMap from "@/components/common/VKakaoMap.vue";
import VSelect from "@/components/common/VSelect.vue";

// const serviceKey = import.meta.env.VITE_OPEN_API_SERVICE_KEY;

const sidoList = ref([]);
const gugunList = ref([{ text: "구군선택", value: "" }]);
const attractions = ref([]);
const selectAttraction = ref({});

const param = ref({
  sidoCode: 0,
  gugunCode: 0,
  contentTypeId: 0,
  word: ""
});

onMounted(() => {
  // getChargingStations();
  getSidoList();
});

const getSidoList = () => {
  listArea(
    0,
    ({ data }) => {
      // console.log(data)
      let options = [];
      options.push({ text: "시도선택", value: "" });
      data.forEach((sido) => {
        options.push({ text: sido.sidoName, value: sido.sidoCode });
      });
      sidoList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeSido = (val) => {
  param.value.sidoCode = val;
  listArea(
    val,
    ({ data }) => {
      let options = [];
      options.push({ text: "구군선택", value: "" });
      data.forEach((gugun) => {
        options.push({ text: gugun.gugunName, value: gugun.gugunCode });
      });
      gugunList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeGugun = (val) => {
  param.value.gugunCode = val;
};

const getAttractions = () => {
  listAttractions(
    param.value,
    ({ data }) => {
      console.log(data.length)
      attractions.value = [data[0]];
    },
    (err) => {
      console.log(err);
    }
  );
};

const viewAttraction = (attraction) => {
  selectAttraction.value = attraction;
};
</script>

<template>
  <!-- KAKAO MAP start -->
  <h1 class="trip-title">Enjoy Your Trip!</h1>
  
  <div class="main-container">
      <div class="col-md-9">
          <div class="alert alert-primary mt-3 text-center fw-bold" role="alert">
              전국 관광지 정보
          </div>
          <!-- 관광지 검색 start -->
          <div class="row mb-2">
            <div class="col d-flex flex-row-reverse">
              <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
            </div>
            <div class="col"><VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" /></div>
            <select id="search-content-id" class="form-select me-2" v-model="param.contentTypeId" >
                  <option value="0" selected>관광지 유형</option>
                  <option value="12">관광지</option>
                  <option value="14">문화시설</option>
                  <option value="15">축제공연행사</option>
                  <option value="25">여행코스</option>
                  <option value="28">레포츠</option>
                  <option value="32">숙박</option>
                  <option value="38">쇼핑</option>
                  <option value="39">음식점</option>
            </select>
            <input id="search-keyword" class="form-control me-2" type="search" placeholder="검색어" v-model="param.word"
                      aria-label="검색어"  />
            <button id="btn-search" class="btn btn-outline-success" type="button" @click="getAttractions">검색</button>
              
          </div>
          <VKakaoMap :attraction="attractions" :selectAttraction="selectAttraction" />
          
          <table class="table table-hover">
            <thead>
              <tr class="text-center">
                <th>contentId</th>
                <th>overview</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center"
                v-for="attraction in attractions"
                :key="attraction.contentId"
                @click="viewAttraction(attraction)"
              >
                <td>{{ attraction.contentId }}</td>
                <td>{{ attraction.overview }}</td>
              </tr>
            </tbody>
          </table>
      </div>
  </div>
</template>

<style>
mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}
</style>
