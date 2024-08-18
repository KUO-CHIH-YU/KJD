<script setup>
import { defineProps } from 'vue'

const props = defineProps(['webs', 'name'])

const openUrl = (url) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<template>
  <div class="row">
    <div class="col-md-1"></div>
    <div class="col-auto mb-3 label">
      <label>{{ name }}</label>
    </div>
    <div class="col-auto mb-3" v-for="g in webs" :key="g.id">
      <button type="button" class="btn btn-secondary" @click="openUrl(g.url)">
        {{ g.id }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.label {
  width: 100px;
  text-align: center;
}
</style>
