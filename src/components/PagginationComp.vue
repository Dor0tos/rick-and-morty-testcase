<script setup>
import NavButton from "@/elements/Paggination/PagginationButton.vue";
import PageButton from "@/elements/Paggination/PagginationPageButton.vue";
import { defineProps, defineEmits, watch, ref, computed } from "vue";

defineEmits(["click", "next", "prev"]);

const props = defineProps({
  from: {
    type: Number,
    default: 1,
  },
  to: {
    type: Number,
    default: 1,
  },
  current: {
    type: Number,
    default: 1,
  },
});

watch(
  () => props.from,
  (newVal) => {
    pageFrom.value = newVal;
  }
);

watch(
  () => props.to,
  (newVal) => {
    pageTo.value = newVal;
  }
);

const range = computed(() => {
  let arr = [];
  for (let i = pageFrom.value; i <= pageTo.value; i++) {
    arr.push(i);
  }
  return arr;
});

const pageTo = ref(props.to);
const pageFrom = ref(props.from);
</script>

<template>
  <nav
    class="w-full h-16 p-4 flex flex-row items-center gap-2 justify-center my-5"
  >
    <NavButton
      buttonType="back"
      :disable="current == from"
      @click="$emit('prev')"
    />
    <PageButton
      :pageId="pageId"
      :current="pageId == props.current"
      v-for="pageId in range"
      v-bind:key="pageId"
      @click="(pageId) => $emit('click', pageId)"
    />
    <NavButton
      buttonType="forward"
      :disable="current == to"
      @click="$emit('next')"
    />
  </nav>
</template>
