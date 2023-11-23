<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { listArea, listAttractions, listContentType } from "@/api/attraction";
import type { SelectProps, TableColumnsType } from 'ant-design-vue';
import { createTripPlanAttraction, listTripPlanAttraction, ramoveTripPlanAttraction } from '@/api/plan.js'

import ASelect from '@/components/common/ASelect.vue';
import VKakaoMap from '@/components/common/VKakaoMap.vue';

// const { userId, planId, title } = history.state;
const userId = 5;
const planId = 10;
const title = "it's a title";

const sidoList = ref<SelectProps['options']>();
const gugunList = ref<SelectProps['options']>([{ label: "구군선택", value: "" }]);
const contentTypeList = ref<SelectProps['options']>();
const attractionList = ref([]);
const planAttractionList = ref([]);
const selectAttraction = ref({});

const searchCondition = ref({
    sidoCode: 1,
    gugunCode: 1,
    contentTypeId: 12,
    word: ""
});

const planCondition = ref({
    planId: planId,
    contentId: 0,
});

const tableCellWidth = 5;
const columns: TableColumnsType = [
    { title: 'Title', width: 2, dataIndex: 'title', key: 'name', fixed: "left" },
    { title: 'Image', width: 2, dataIndex: 'firstImage', key: 'image' },
    { title: 'Address', dataIndex: 'addr1', key: 'addr', width: tableCellWidth },
    { title: 'Tel', dataIndex: 'tel', key: 'tel', width: tableCellWidth },
    { title: 'Add', key: 'operation', fixed: 'right', width: 2 }
];

onMounted(() => {
    getSidoList();
    getContentTypeList();
    getPlanList();
    // console.log(planId)
    // getAttractions();
});


const onChangeSido = (val) => {
    searchCondition.value.sidoCode = val;
    listArea(
        val,
        ({ data }) => {
            let options = [];
            options.push({ label: "구군선택", value: "" });
            data.forEach((gugun) => {
                options.push({ label: gugun.gugunName, value: gugun.gugunCode });
            });
            gugunList.value = options;
        },
        (err) => {
            console.log(err);
        }
    );
    // console.log(sidoList.value)
    // console.log(gugunList.value)
};

const onChangeGugun = (val) => {
    searchCondition.value.gugunCode = val;
};

const onContentType = (val) => {
    searchCondition.value.contentTypeId = val;
};

const getAttractions = () => {
    listAttractions(
        searchCondition.value,
        ({ data }) => {
            attractionList.value = data;
            // console.log(attractionList.value);
        },
        (err) => {
            console.log(err);
        }
    );
};


const getSidoList = () => {
    listArea(
        0,
        ({ data }) => {
            // console.log(data)
            let options = [];
            options.push({ label: "시도선택", value: "" });
            data.forEach((sido) => {
                options.push({ label: sido.sidoName, value: sido.sidoCode });
            });
            sidoList.value = options;
        },
        (err) => {
            console.log(err);
        }
    );
};

const getContentTypeList = () => {
    listContentType(
        ({ data }) => {
            // console.log(data)
            let options = [];
            options.push({ label: "콘텐츠 타입 선택", value: "" });
            data.forEach((type) => {
                options.push({ label: type.contentTypeName, value: type.contentTypeId });
            });
            contentTypeList.value = options;
        },
        (err) => {
            console.log(err);
        }
    );
};


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
const viewAttraction = (attraction) => {
    selectAttraction.value = attraction;
};

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
    <div class="row" id="map-container">
        <div class="col-3" id="map-side">
            <div id="search-condition">
                <div>
                    area
                    <ASelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
                    <ASelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
                </div>
                <div>
                    content
                    <ASelect :selectOption="contentTypeList" @onKeySelect="onContentType" />
                </div>
                <div>
                    word
                    <a-input-search v-model:value="searchCondition.word" placeholder="input search text"
                        @search="getAttractions" />
                </div>
            </div>

            <div id="attraciton-list">
                <a-table :columns="columns" :data-source="attractionList" :scroll="{ x: 1000, y: 500 }">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'title'">
                            <a href="#" @click="viewAttraction(record)"> {{ text }}</a>
                        </template>
                        <template v-if="column.key === 'operation'">
                            <a href="#" @click="addPlanAttraction(record.contentId)"> {{
                                column.title }}</a>
                        </template>
                        <template v-if="column.key === 'image'">
                            <img :src="`${text}`" />
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
        <div class="col-6">
            <VKakaoMap :attractions="attractionList" :selectAttraction="selectAttraction" />
        </div>
    </div>
</template>

<style scoped>  
#map-container {
      position: absolute;
      width: 100%;
      height: 100%;
  }

  #map-side {
      background: #fff
  }

  img {
      /* position: absolute; */
      width: 100px;
      height: 100px;
      border-radius: 10%;
  }

  #attraciton-list {
      width: 100%;
      height: 100%;
      /* background-color: antiquewhite; */
  }
</style>