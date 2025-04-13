<script lang="ts" setup>
import { reactive } from "vue";
import testData from "@/data/testData.json";
import CategoryInput from "./CategoryInput.vue";

import type { EntryType } from "./types";

const tableHeadCells: Array<string> = [...testData.headers];

const tableData = reactive<{
  tableRows: Array<string[]>;
  currentOrderIndex: number | null; //index of col by which the table rows are ordered
}>({
  tableRows: [...testData.tableRows],
  currentOrderIndex: null,
});

function setEntryType(rowId: string, entryType: EntryType) {}
function setCurrentOrderIndex(orderIndex: number) {
  //just sets currentOrderIndex
  tableData.currentOrderIndex = orderIndex;
}
function orderByColIndex(colIndex: number) {
  setCurrentOrderIndex(colIndex);

  tableData.tableRows.sort((a, b) => {
    if (a[colIndex].toLowerCase() < b[colIndex].toLowerCase()) return -1;
    if (a[colIndex].toLowerCase() > b[colIndex].toLowerCase()) return 1;
    return 0;
  });
}
</script>

<template>
  <!-- BEM - Block Element modifier -->
  <!-- personal convention: block__Element--modifier -->
  <!-- _ replaces space as in table__header_row--dark_obsidium -->
  <div class="table__wrapper">
    <table class="table">
      <thead class="table__head">
        <tr calss="">
          <th
            v-for="(tableHeadCell, cellIndex) in tableHeadCells"
            :key="cellIndex"
          >
            <div>
              <span v-if="cellIndex < 1">{{ tableHeadCell }}</span>

              <div
                v-if="cellIndex > 0"
                role="button"
                tabindex="0"
                @click="orderByColIndex(cellIndex)"
                :class="` ${
                  tableData.currentOrderIndex == cellIndex ? 'lighten' : ''
                }`"
              >
                <span class="content_wrapper_span">
                  {{ tableHeadCell }}
                </span>

                <span class="content_wrapper_span">
                  <img
                    src="./icons/icon_filter@2x.png"
                    width="16"
                    height="16"
                    alt="filter icon"
                  />
                </span>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tableRowData, rowIndex) in tableData.tableRows"
          :key="rowIndex"
        >
          <td
            v-for="(tableRowCell, cellIndex) in tableRowData"
            :key="cellIndex"
          >
            {{ tableRowCell }}
            <!-- <CategoryInput
              v-if="cellIndex == 1 && rowIndex == 0"
              :entry-type-list="testData.entryTypes"
              :set-entry-type="setEntryType"
            /> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>

<style scoped>
/* utility classes */
.lighten {
  filter: contrast(400%);
}
.table {
  position: relative;
  width: 100%;
  border: 1px solid #43434380;
  border-radius: 12px;
  border-spacing: 0;
  /* overflow: hidden; */

  background-color: rgba(0, 0, 0, 0.4);
  color: white;
}

/* cells form factor*/
.table tr td:first-child,
.table tr th:first-child {
  width: 21%;
}

.table tr td:nth-child(2),
.table tr th:nth-child(2) {
  width: 36.7%;
}

.table tr td:last-child,
.table tr td:last-child {
  width: 42.3%;
}

/* start of border fix*/
.table thead tr th:nth-child(odd) {
  border: none;
  border-bottom: 0.5px solid #434343;
}

.table thead tr th:nth-child(even) {
  border: 0.5px solid #434343;
  border-top: none;
}

.table tbody tr td {
  border: none;
  border-bottom: 0.5px solid #434343;

  /*  */
  position: relative;
  height: 40px;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table tbody tr td:nth-child(odd) {
  border-left: none;
  border-right: none;
}

.table tbody tr td:nth-child(even) {
  border-left: 0.5px solid #434343;
  border-right: 0.5px solid #434343;
}

/* end of border fix */

/* styling cell heigh*/

/* custom header style */
/* styles common to all cells*/
.table tr th,
.table tr td {
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  letter-spacing: 2px;
  height: 100%;
  text-align: center;
}

.table thead tr th {
  height: 48px;
  color: #969696;
}

/* .table thead tr th > div {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: pink;
  border-radius: 20px;
} */
.table thead tr th:first-child div {
  justify-content: start;
}
.table thead tr th div {
  display: flex;
  gap: 4px;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.table thead tr th div[role="button"] {
  /* background-color: blue; */
  cursor: pointer;
}

.table thead tr th div .content_wrapper_span {
  display: flex;
  align-items: center;
}
.table thead tr th img {
  width: 16px;
  aspect-ratio: 1/1;
}

.table tr td:first-child {
  font-size: 12px;
}

.table tbody tr td:first-child,
.table thead tr th:first-child {
  text-align: start;
  padding-left: 20px;
}
</style>
