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
    // console.log(wep)
    // console.log(input)
    if (input) {
      if (input.length > 60) {
        fullUrl = `${wep.open_hash}${input}`
      } else {
        console.log(fullUrl)
        fullUrl = `${wep.open}${input}`
      }
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
      <div
        :class="{
          'error-state':
            x.result === 'Network Error' || x.result === '404' || x.result === '查無此帳號',
          'verify-state': x.result === '請先點右上角verify',
          state:
            x.result !== 'Network Error' &&
            x.result !== '404' &&
            x.result !== '請先點右上角verify' &&
            x.result !== '查無此帳號'
        }"
        v-html="x.result"
      ></div>
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
  block-size: auto;
  color: rgb(13, 186, 166);
}
.verify-state {
  /* width: 500px; */
  text-align: left;
  block-size: auto;
  color: rgb(247, 12, 0);
  background-color: rgb(223, 223, 223);
  font-weight: bold;
}
.error-state {
  text-align: left;
  block-size: auto;
  color: gray;
}

.icon {
  width: 40px;
  height: 40px;
}
</style>
