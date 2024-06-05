<script setup>
import { defineProps, defineEmits } from "vue";
import ChevronLeft from "@/icons/chevronLeft.vue";
import ChevronRight from "@/icons/chevronRight.vue";

defineEmits(["click"]);

const props = defineProps({
  buttonType: {
    type: String,
    default: "back",
  },
  disable: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <a
    href="#start-pos"
    class="h-full aspect-square flex justify-center items-center rounded-md transition-colors"
    :class="{
      'bg-lime-400 lg:hover:bg-lime-200 active:bg-lime-200': !props.disable,
      'bg-gray-500 cursor-default': props.disable,
    }"
    @click="$emit('click', props.buttonType)"
  >
    <ChevronLeft v-if="buttonType == 'back'" />
    <ChevronRight v-if="buttonType == 'forward'" />
  </a>
</template>
