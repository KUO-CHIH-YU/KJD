<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['weps', 'inputDic', 'widthBar'])
const emit = defineEmits(['inputDic'])

const returninputDic = (inputDic, id) => {
  const result = props.inputDic
  result[id] = inputDic[id]
  emit('inputDic', result)
}

const openWep = (id) => {
  const wep = props.weps.find((x) => x.id === id)
  const input = props.inputDic[id]
  let fullUrl = ''
  if (wep) {
    // if (wep.open) {
    //   fullUrl = `${wep.open}`
    // } else if (wep.url) {
    //   fullUrl = `${wep.url}`
    // }

    if (input) {
      fullUrl = `${wep.open}${input}`
    } else {
      fullUrl = `${wep.url}`
    }

    window.open(fullUrl, '_blank')
  }
}
</script>

<template>
  <div class="row mb-3 searchbar" v-for="x in weps" :key="x.id">
    <div class="col-md-1"></div>
    <div class="col-auto">
      <img :src="`./img/${x.id}.png`" :alt="`${x.name} Icon`" class="icon" />
    </div>
    <div class="col-auto label">
      <label>{{ x.name }}</label>
    </div>
    <div :class="`col-md-${widthBar}`">
      <input
        v-model="inputDic[x.id]"
        @input="returninputDic(inputDic, x.id)"
        :id="x.id"
        :placeholder="x.name"
        class="form-control"
      />
    </div>
    <div class="col-auto">
      <button type="button" class="btn btn-success" @click="openWep(x.id)">開啟</button>
    </div>
    <div class="col-auto">
      <div class="state" v-html="x.result"></div>
    </div>
  </div>
</template>

<style scoped>
.label {
  width: 90px;
  text-align: center;
}

.state {
  /* width: 500px; */
  text-align: left;
  color: rgb(13, 186, 166);
  block-size: auto;
}

.icon {
  width: 40px;
  height: 40px;
}
</style>
