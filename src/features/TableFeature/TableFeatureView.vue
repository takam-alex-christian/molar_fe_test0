<script lang="ts" setup>
import DisplayTable from "@/components/DisplayTable/ComponentView.vue";

import { reactive } from "vue";

const optionKeys: Array<string> = ["订单统计", "订单列表"] as const;

type TableOptionType = (typeof optionKeys)[number];

const internalState = reactive<{
  activeOption: TableOptionType;
}>({
  activeOption: "订单统计",
});

function changeActiveOption(option: TableOptionType) {
  internalState.activeOption = option;
}
</script>

<template>
  <div class="feature__wrapper">
    <div class="empty_left"></div>
    <div class="table_feature">
      <div class="">
        <div class="table_feature__title_wrapper">
          <h1 class="table_feature__title">Title</h1>
        </div>

        <hr />
      </div>

      <div class="table_feature__options_wrapper">
        <button
          v-for="(optionString, optionKey) in optionKeys"
          :key="optionKey"
          @click.prevent="changeActiveOption(optionString)"
          :class="`option_btn ${
            internalState.activeOption == optionString
              ? 'option__btn--active'
              : ''
          }`"
        >
          {{ optionString }}
        </button>
      </div>
      <div class="table_feature__table_wrapper">
        <DisplayTable />
      </div>
    </div>
  </div>
</template>

<style></style>

<style scoped>
.feature__wrapper {
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 1fr;
  width: 736px;
  height: 407px;
  background-color: #101010;
}
.feature__wrapper .empty_left {
  background-color: rgba(0, 0, 0, 0.6);
}
.table_feature {
  padding: 0 60px 0 24px;
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
}

.table_feature__title_wrapper {
  padding: 21px 0 13px 0;
  /* background-color: red; */
}

.table_feature__title_wrapper + hr {
  /* background-color: red; */
  height: 1px;
  border: none;
  border-radius: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
}

.table_feature__title {
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  letter-spacing: 1px;
  color: white;

  /* color: green; */
  /* background-color: blue; */
}

.table_feature__options_wrapper {
  padding: 0 8px;
  display: flex;
  flex-flow: row nowrap;
  gap: 3px;
}

.table_feature__options_wrapper .option_btn {
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 20px;
  font-weight: 400;

  cursor: pointer;
  border: none;
  padding: 5.5px 7px 5.5px 4px;
  background-color: transparent;
  color: #969696;
  position: relative;
}

.table_feature__options_wrapper .option__btn--active::after {
  content: "";
  bottom: 0;
  left: 0;
  height: 1px;
  width: 100%;

  display: block;
  position: absolute;

  border-radius: 1px;
  background-color: white;
}

.table_feature__options_wrapper .option__btn--active {
  color: white;
}
/* .table_feature; */
</style>
