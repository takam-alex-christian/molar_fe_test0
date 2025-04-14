<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  useTemplateRef,
  onMounted,
  reactive,
  watch,
  computed,
} from "vue";
import type { EntryType } from "./types";

import CustomCheckbox from "./CustomCheckbox.vue";

const props = defineProps<{
  entryTypeList: Array<string>;
  initialValue: string;
}>();

const emits = defineEmits<{
  change: [entry: EntryType];
  blur: [];
}>();

const inputFieldRef = useTemplateRef("inputField");
const featureWrapperRef = useTemplateRef("featureWrapper");

const inputFieldState = reactive<{
  textValue: string;
  entryTypeList: Array<{ entryType: string; isChecked: boolean }>;
}>({
  textValue: props.initialValue,
  entryTypeList: props.entryTypeList.map((eachEntryType) => {
    return { entryType: eachEntryType, isChecked: false };
  }),
});

const matchingEntries = computed(() => {
  let res = inputFieldState.entryTypeList;

  res = res.filter((eachEntry) =>
    eachEntry.entryType
      .toLowerCase()
      .includes(inputFieldState.textValue.toLowerCase())
  );

  return res;
});

function setInputTextValue(textValue: string) {
  inputFieldState.textValue = textValue;
}

function setEntryCheckState(entryType: EntryType, isChecked: boolean) {
  const entryTypeIndex = inputFieldState.entryTypeList.findIndex(
    (eachEntry) => {
      return eachEntry.entryType == entryType;
    }
  );

  if (entryTypeIndex)
    inputFieldState.entryTypeList[entryTypeIndex].isChecked = isChecked;
}

function handleCheckBoxChange(entryType: EntryType, isChecked: boolean) {
  if (isChecked) setInputTextValue(entryType);
  //set checked over selected entry type

  setEntryCheckState(entryType, isChecked);

  console.log(entryType);
  console.log(isChecked);
}

function handleInputFieldChange(e: Event) {
  inputFieldState.textValue = (e.target as HTMLInputElement).value;
  // console.log((e.target as HTMLInputElement).value);
}

function handleFormSubmit() {
  emits("change", inputFieldState.textValue);
}

// watch(
//   () => inputFieldState.textValue,
//   (textValue) => {
//     console.log(textValue);
//   }
// );

onMounted(() => {
  inputFieldRef.value?.focus();
});
</script>

<template>
  <div ref="featureWrapper" class="entry_type_selection">
    <form @submit.prevent="handleFormSubmit">
      <!-- search input -->
      <div class="entry__input">
        <div class="input__img_wrapper">
          <img src="./icons/icon_search@2x.png" />
        </div>
        <div class="input__text_field_wrapper">
          <input
            ref="inputField"
            type="search"
            placeholder="搜索"
            :value="inputFieldState.textValue"
            @input="handleInputFieldChange"
          />
        </div>
      </div>
      <div v-if="props.entryTypeList.length > 0" class="entry__suggestion">
        <ul>
          <li v-for="eachEntryType in matchingEntries">
            <!-- <input type="checkbox" :key="eachEntryType" /> -->
            <CustomCheckbox
              :label-text="eachEntryType.entryType"
              :checked="eachEntryType.isChecked"
              @change="
                (isChecked) => {
                  handleCheckBoxChange(eachEntryType.entryType, isChecked);
                }
              "
            />
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<style></style>

<style scoped>
.entry_type_selection {
  position: absolute;
  /* inset: 3px; */
  width: calc(100% + 6px);
  top: 4px;
  left: -3px;
  border-radius: 12px;
  padding: 8px;
  /* backdrop-filter: blur(24px); */
  border: 1px solid #43434380;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  z-index: 1;
}

.entry_type_selection > form {
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
}
.entry_type_selection .entry__input {
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
  align-items: center;
  border: 0.5px solid #434343;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  padding: 0 12px;

  height: 32px;
}

.entry_type_selection .entry__input .input__img_wrapper {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}
.entry_type_selection .entry__input .input__img_wrapper :is(img) {
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
}

.entry_type_selection .entry__input .input__text_field_wrapper {
  width: 100%;
  height: 80%;
}

.entry_type_selection .entry__input .input__text_field_wrapper > input {
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: white;
  border: none;

  letter-spacing: 2px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  font-family: "PingFang SC";
}

.entry_type_selection
  .entry__input
  .input__text_field_wrapper
  > input:is(:focus, :focus-within) {
  outline: 0;
}
.entry_type_selection
  .entry__input
  .input__text_field_wrapper
  > input::placeholder {
  color: #969696;
}

.entry__suggestion > ul {
  display: flex;
  flex-flow: column nowrap;
  gap: 0;
  list-style-type: none;
}

.entry__suggestion > ul li {
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0 13.5px;
  /* padding: 0 14px; */
}
</style>
