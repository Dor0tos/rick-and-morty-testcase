<script setup>
import { defineProps, defineEmits } from "vue";

defineEmits(["click"]);

const props = defineProps({
  pageId: {
    type: Number,
    default: -1,
  },
  current: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <a
    href="#start-pos"
    class="h-full aspect-square flex justify-center items-center rounded-md select-none cursor-pointer transition-colors text-white lg:hover:bg-lime-400 active:bg-lime-400 active:text-black lg:hover:text-black"
    :class="{
      'outline-2 outline outline-lime-400': props.current,
    }"
    @click="
      if (!props.current) {
        $emit('click', props.pageId);
      }
    "
  >
    {{ props.pageId }}
  </a>
</template>
