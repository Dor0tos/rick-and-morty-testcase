<script setup>
import RickAndMorty from "@/icons/rickAndMorty.vue";
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "<Title>",
  },
  subtitle: {
    type: String,
    default: "<subtitle>",
  },
});
</script>

<template>
  <header
    class="h-40 sm:h-72 md:h-[50svh] bg-gradient-to-t from-lime-300 to-lime-100 items-center overflow-hidden justify-center flex flex-col gap-5 rounded-b-3xl shadow-2xl"
  >
    <h1 class="text-slate-900 z-10">{{ props.title }}</h1>
    <p class="z-10">{{ props.subtitle }}</p>
    <div class="relative">
      <RickAndMorty
        class="fill-lime-900 opacity-50 absolute top-0 -translate-x-[50%] -translate-y-[60%] scale-50"
      />
    </div>
  </header>
</template>
