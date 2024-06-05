<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "Data title",
  },
});
</script>

<template>
  <section>
    <h3 class="opacity-50">{{ props.title }}:</h3>
    <p><slot></slot></p>
  </section>
</template>

<style scoped>
p {
  font-size: large;
}
</style>
