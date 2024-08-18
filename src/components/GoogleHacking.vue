<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['ghacking', 'inputDic', 'checkedItems', 'gAdvanced'])
const emit = defineEmits(['inputDic'])

// const returninputDic = (inputDic, id) => {
//   const result = props.inputDic
//   result[id] = inputDic[id]
//   emit('inputDic', result)
// }

const openWep = () => {
  const input = props.inputDic
  const checkedItems = props.checkedItems

  const parameter = []
  let targetURL = `https://www.google.com/search?q=`
  if (input['googleid']) {
    targetURL += input['googleid'] + ' '
  }
  for (const id in checkedItems) {
    if (checkedItems[id]) {
      if (id == 'intext' || id == 'intitle') {
        parameter.push(`${id}:"${input[id]}"`)
      } else {
        parameter.push(`${id}:${input[id]}`)
      }
    }
  }
  targetURL += parameter.join(' ')
  window.open(targetURL, '_blank')
}

const opengAdvanced = (id) => {
  const platform = props.gAdvanced.find((g) => g.id === id)
  if (platform && platform.url) {
    window.open(platform.url, '_blank')
  }
}
</script>

<template>
  <div class="row mb-3">
    <img src="/img/GoogleHacking.png" alt="Icon" style="width: 250px" />
  </div>
  <div class="row mb-3">
    <div class="col-md-1"></div>
    <div class="col-md-7">
      <input
        class="form-control text-box single-line"
        placeholder="key word"
        v-model="inputDic['googleid']"
      />
    </div>
    <div class="col-auto">
      <button type="button" class="btn btn-primary btn-query" @click="openWep()">查詢</button>
    </div>
  </div>
  <div class="row mb-3">
    <div class="col-md-1"></div>
    <div class="col-auto">
      <div>【 + 】 增加關鍵字 <br />【 - 】 忽略某個字</div>
    </div>
    <div class="col-auto">
      <div>【 ~ 】 同意詞 <br />【 . 】 單一的通配符</div>
    </div>
    <div class="col-auto">
      <div>【 * 】 代表多個字母 <br />【 "" 】 精確查詢</div>
    </div>
  </div>

  <div class="row mb-3 searchbar" v-for="g in ghacking" :key="g.id">
    <div class="col-md-1"></div>
    <div class="col-auto">
      <input type="checkbox" v-model="checkedItems[g.id]" />
    </div>
    <div class="col-auto">
      <label class="label">{{ g.id }}</label>
    </div>
    <div class="col-md-5">
      <input class="form-control" :placeholder="g.placeholder" v-model="inputDic[g.id]" />
    </div>
    <div class="col-auto">{{ g.note }}</div>
  </div>

  <div class="row mb-3">
    <div class="col-md-1"></div>
    <div class="col-auto mb-3" v-for="g in gAdvanced" :key="gAdvanced.id">
      <button type="button" class="btn btn-info" @click="opengAdvanced(g.id)">
        {{ g.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.label {
  width: 40px;
  text-align: center;
}
input[type='checkbox'] {
  transform: scale(1.5); /* 調整比例大小 */
}
</style>
