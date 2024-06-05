<script setup>
import CardData from "@/elements/Cards/CardData.vue";
import CardStatus from "@/elements/Cards/CardStatus.vue";
import { defineProps, onMounted, ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "Default name",
  },
  location: {
    type: String,
    default: "Default location",
  },
  imageUrl: {
    type: String,
    requried: true,
  },
  status: {
    type: String,
    default: "unknown",
  },
  spicies: {
    type: String,
    default: "unknown",
  },
  firstEpisode: {
    type: Promise,
    default: false,
  },
});

onMounted(() => {
  props.firstEpisode.then((episodes) => {
    firstEpisodeName.value = episodes.name;
  });
});

const firstEpisodeName = ref("");
</script>

<template>
  <section
    class="flex min-[650px]:flex-row flex-col w-full min-[650px]:h-56 overflow-hidden rounded-xl bg-slate-700 text-white shadow-lg hover:-translate-y-2 transition-transform"
  >
    <img
      class="w-full min-[650px]:h-full min-[650px]:w-auto aspect-square pointer-events-none"
      :src="props.imageUrl"
    />
    <aside class="p-4 flex flex-col justify-between gap-2">
      <div>
        <h2>{{ props.name }}</h2>
        <CardStatus :status="props.status" :spicies="props.spicies" />
      </div>
      <CardData title="Последняя известная локация">{{
        props.location
      }}</CardData>
      <CardData title="Первое появление">{{ firstEpisodeName }}</CardData>
    </aside>
  </section>
</template>

<style scoped>
h2 {
  font-weight: 700;
  font-size: x-large;
}
</style>
