<script setup>
import { computed, onMounted, ref } from "vue";
import Card from "../components/CardComponent.vue";
import { RequestHandler } from "@/libs/apiRequestHandler";
import FilterComp from "@/components/FilterComp.vue";
import PagginationComp from "@/components/PagginationComp.vue";

function callApi(pageId, filters) {
  if (filters == undefined) {
    filters = savedFilters.value;
  }

  currentPage.value = pageId;

  rh.getFromPage(pageId, filters)
    .then((apiData) => {
      nothingFound.value = false;
      apiInfo.value = apiData.info;
      data.value = apiData.results;
    })
    .catch(() => {
      nothingFound.value = true;
    });
}

function buildFilters(name, status) {
  let result = {};

  if (name) {
    result.name = name;
  }

  if (status != "any") {
    if (status != "unknown") {
      status = status.charAt(0).toUpperCase() + status.slice(1);
    }

    result.status = status;
  }

  savedFilters.value = result;
  return result;
}

const rh = new RequestHandler("https://rickandmortyapi.com/api", "character");
const data = ref([]);
const apiInfo = ref({});
const currentPage = ref(1);
const savedFilters = ref({});
const nothingFound = ref(false);

const firstPage = computed(() => {
  let trueLastPage = apiInfo.value.pages;
  let current = currentPage.value;

  if (current == 1) {
    return 1;
  } else if (current == trueLastPage) {
    return Math.max(1, current - 4);
  } else if (current == trueLastPage - 1) {
    return Math.max(1, current - 3);
  }

  return Math.max(1, current - 2);
});

const lastPage = computed(() => {
  let trueLastPage = apiInfo.value.pages;
  let current = currentPage.value;

  if (trueLastPage == undefined) {
    trueLastPage = current;
  }

  if (current == 1) {
    return Math.min(trueLastPage, current + 4);
  } else if (current == 2) {
    return Math.min(trueLastPage, current + 3);
  } else if (current == trueLastPage) {
    return current;
  }

  return Math.min(trueLastPage, current + 2);
});

onMounted(() => {
  callApi(1);
});
</script>

<template>
  <FilterComp
    id="start-pos"
    @submited-filters="(name, status) => callApi(1, buildFilters(name, status))"
  />
  <p class="text-sm text-white opacity-50 my-5">
    Найдено результатов: {{ nothingFound ? 0 : apiInfo.count }}
  </p>
  <main
    class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5"
    v-if="!nothingFound"
  >
    <Card
      v-bind:key="cardData"
      v-for="cardData in data"
      :name="cardData.name"
      :location="cardData.location.name"
      :image-url="cardData.image"
      :spicies="cardData.species"
      :status="cardData.status"
      :first-episode="rh.getDataDirect(cardData.episode[0])"
    />
  </main>
  <section
    class="flex flex-col gap-5 items-center justify-center text-white"
    v-else
  >
    <h1>Пусто</h1>
    <p>Ууупс... Кажется во всей мультивселенной такого нет</p>
  </section>

  <PagginationComp
    :from="firstPage"
    :to="lastPage"
    :current="currentPage"
    @click="(n) => callApi(n)"
    @prev="callApi(currentPage - 1)"
    @next="callApi(currentPage + 1)"
    v-if="!nothingFound"
  />
</template>
