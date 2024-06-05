<script setup>
import { defineProps, onMounted, ref, watch } from "vue";

function applyStatus(status) {
  switch (status.toLowerCase()) {
    case "alive":
      statusStyle.value["background-color"] = "#5ac54f";
      break;
    case "dead":
      statusStyle.value["background-color"] = "#ea323c";
      break;
    default:
      statusStyle.value["background-color"] = "#858585";
      break;
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const props = defineProps({
  status: {
    type: String,
    default: "unknown",
  },
  spicies: {
    type: String,
    default: "unknown",
  },
});

const statusStyle = ref({
  "background-color": "#00ff00",
});

onMounted(() => {
  applyStatus(props.status);
});

watch(
  () => props.status,
  (newVal) => {
    console.log("New status:", newVal);
    applyStatus(newVal);
  }
);
</script>

<template>
  <div class="flex flex-row gap-2 items-center">
    <div class="w-3 aspect-square rounded-full" :style="statusStyle" />
    <p class="text-xs">
      {{ capitalizeFirstLetter(props.status) }} - {{ props.spicies }}
    </p>
  </div>
</template>
