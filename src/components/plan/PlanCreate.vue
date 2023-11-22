<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';
import { useRouter } from "vue-router";

import { createTripPlan } from "@/api/plan";

const router = useRouter();
const { userId } = history.state;

const formState = reactive({
  title: ''
});

const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const onFinish = values => {
  console.log('Success:', {
      title: values["title"],
      userId: userId,
      startDate: Date.parse(values["date"][0]) / 1000,
      endDate: Date.parse(values["date"][1]) / 1000,
    });
  createTripPlan(
    {
      title: values["title"],
      userId: userId,
      startDate: Date.parse(values["date"][0]) / 1000,
      endDate: Date.parse(values["date"][1]) / 1000,
    },
      ({data}) => {
        router.push({ name: "makeList", state: {userId: data.userId, planId: data.planId, title: data.title} });
      },
      (err) => {
          console.log(err);
      }
  );
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

</script>

<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Title"
      name="title"
      :rules="[{ required: true, message: 'Please input title!' }]"
    >
      <a-input v-model:value="formState.title" />
    </a-form-item>


    <a-form-item name="date" label="Date" v-bind="rangeConfig">
      <a-range-picker v-model:value="formState['date']" value-format="YYYY-MM-DD HH:MM:ss" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
