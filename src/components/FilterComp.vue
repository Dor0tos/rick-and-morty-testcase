<script setup>
import { defineEmits, ref } from "vue";

defineEmits(["submitedFilters"]);

const name = ref("");
const status = ref("any");
</script>

<template>
  <section
    class="mt-10 h-fit lg:h-16 rounded-lg items-center bg-slate-700 shadow-lg flex flex-col lg:flex-row gap-4 p-4 justify-between"
  >
    <div
      class="flex flex-col w-full lg:w-auto lg:flex-row gap-2 lg:gap-4 lg:items-center"
    >
      <label for="name-filter" class="text-white">Имя</label>
      <input
        type="text"
        class="w-full lg:w-52 rounded-md p-1 h-8 text-sm"
        id="name-filter"
        v-model="name"
      />
      <label for="status-filter" class="text-white">Статус</label>
      <select
        v-model="status"
        id="status-filter"
        name="char-status"
        class="w-full lg:w-52 rounded-md p-1 h-8 text-sm"
      >
        <option value="any">Любой</option>
        <option value="alive">Жив</option>
        <option value="dead">Мёртв</option>
        <option value="unknown">Неизветсно</option>
      </select>
    </div>
    <input
      type="button"
      class="p-1 h-8 text-sm w-full lg:w-52 bg-lime-400 font-bold rounded-md cursor-pointer lg:hover:bg-lime-200 active:bg-lime-200 transition-colors"
      value="Применить"
      @click="$emit('submitedFilters', name.toLowerCase(), status)"
    />
  </section>
</template>
