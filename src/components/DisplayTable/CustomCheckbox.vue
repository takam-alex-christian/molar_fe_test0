<script setup lang="ts">
import { defineProps, defineEmits, reactive } from "vue";

const props = defineProps<{
  labelText?: string;
  checked?: boolean;
}>();

const emits = defineEmits<{
  onChecked?: [checkState: boolean];
}>();

const checkBoxInternalState = reactive<{
  isChecked: boolean;
}>({
  isChecked: false,
});

function toggleCheckedState() {
  checkBoxInternalState.isChecked = !checkBoxInternalState.isChecked;
}
</script>

<template>
  <div
    class="checkbox_container"
    role="checkbox"
    tabindex="0"
    :aria-checked="true"
    @click="
      () => {
        toggleCheckedState();
      }
    "
  >
    <div class="custom_checkbox">
      <div class="checkbox__square">
        <div v-if="checkBoxInternalState.isChecked" class="checkbox__indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 14L8.5 17.5L19 6.5"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <label>
      {{ props.labelText }}
    </label>
  </div>
</template>

<style scoped>
.checkbox_container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 14px;
}

.checkbox_container > label {
  color: white;
  letter-spacing: 2px;
}
.custom_checkbox {
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
}

.checkbox__indicator {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox__indicator :is(svg) {
  width: 100%;
  height: 100%;
  color: white;
}
</style>
