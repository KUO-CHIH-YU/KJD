<script setup>
import { ref } from 'vue'
import axios from 'axios'
import SearchBar from '@/components/SearchBar.vue'

const mainInput = ref('')
const inputDic = ref({})

const originalApp = ref([
  {
    id: 'tron',
    name: 'TRON',
    url: 'https://tronscan.org/',
    open: 'https://tronscan.org/#/address/',
    api: 'https://apilist.tronscanapi.com/api/transfer/trx?&start=0&limit=1&direction=0&reverse=true&fee=true&db_version=1&start_timestamp=&end_timestamp=&address=',
    result: ''
  },
  {
    id: 'eth',
    name: 'ETH',
    url: 'https://etherscan.io/',
    open: 'https://etherscan.io/address/',
    api: 'https://api.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=TK82T9BHK6XDG5YJ775XP2W3BI33U6BDFB&address=',
    result: ''
  },
  {
    id: 'bsc',
    name: 'BSC',
    url: 'https://bscscan.com/',
    open: 'https://bscscan.com/address/',
    api: 'https://api.bscscan.com/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&address=',
    result: ''
  },
  {
    id: 'ploygon',
    name: 'Polygon',
    url: 'https://polygonscan.com/',
    open: 'https://polygonscan.com/address/',
    api: 'https://api.polygonscan.com/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&address=',
    result: ''
  },
  {
    id: 'btc',
    name: 'BTC',
    url: 'https://btc.com/zh-HK',
    open: 'https://btc.com/zh-HK/btc/search/',
    api: 'https://chain.api.btc.com/v3/address/',
    result: ''
  }
])

const multApp = ref([
  {
    id: 'oklink',
    name: 'Oklink',
    url: 'https://www.oklink.com/hk',
    open: 'https://www.oklink.com/zh-hant/multi-search#key=',
    api: 'https://www.oklink.com/api/v5/explorer/address/address-active-chain?address=',
    result: ''
  }
])

const flowApp = ref([
  {
    id: 'bitquery',
    name: 'Bitquery',
    url: 'https://explorer.bitquery.io/',
    open: 'https://explorer.bitquery.io/search/',
    api: '',
    result: ''
  }
])

const multApp1 = ref([
  {
    id: 'misttrack',
    name: 'Misttrack',
    url: 'https://dashboard.misttrack.io/home',
    note: '錢包剖繪、錢包標籤、交易上下層的情況'
  }
])

const otherApp = ref([
  { id: 'bip39', name: '還原錢包', url: 'https://iancoleman.io/bip39/', note: '註記詞還原成錢包' }
])

const updateInputs = () => {
  originalApp.value.forEach((x) => {
    inputDic.value[x.id] = mainInput.value
  })
  multApp.value.forEach((x) => {
    inputDic.value[x.id] = mainInput.value
  })
  flowApp.value.forEach((x) => {
    inputDic.value[x.id] = mainInput.value
  })
}

const querybutton = () => {
  originalApp.value.forEach((x) => {
    inputDic.value[x.id] = mainInput.value
    x.result = `<img src="./img/loading.gif" alt="Icon" class="img-icon" style="max-width: 30px; max-height: 30px;"/>`
    query(x.id)
  })
}

async function query(id) {
  let rt = ''
  const sApp = originalApp.value.find((x) => x.id === id)
  try {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/${sApp.api}${inputDic.value[id]}`
    )
    // console.log(response.data.data.length)
    if (id == 'tron') {
      if (response.data.data.length > 0) {
        rt = '✔️'
      } else {
        rt = '❌'
      }
    } else if (id == 'eth') {
      if (response.data.result.includes('Error')) {
        rt = '❌'
      } else if (response.data.result.length > 0) {
        rt = '✔️'
      } else {
        rt = response.data.message
      }
    } else if (id == 'bsc') {
      if (response.data.result.includes('Error')) {
        rt = '❌'
      } else if (response.data.result.length > 0) {
        rt = '✔️'
      } else {
        rt = response.data.message
      }
    } else if (id == 'ploygon') {
      if (response.data.result.includes('Error')) {
        rt = '❌'
      } else if (response.data.result.length > 0) {
        rt = '✔️'
      } else {
        rt = response.data.message
      }
    } else if (id == 'btc') {
      if (response.data.status.includes('success')) {
        rt = '✔️'
      } else {
        rt = '❌'
      }
    }
  } catch (error) {
    rt = error.message
    if (error.response) {
      if (error.response.status === 404) {
        rt = 'Error'
      } else if (error.response.status === 400) {
        rt = '❌'
      }
    }
  }
  sApp.result = rt
}

const openUrl = (url) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-1"></div>
      <div class="col">
        <h3>　BlockChain　</h3>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-1"></div>
      <div class="col-md-8">
        <input
          class="form-control"
          placeholder="address"
          v-model="mainInput"
          @input="updateInputs"
        />
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-primary" @click="querybutton">查詢</button>
      </div>
    </div>
    <hr />
    <ul>
      原生帳本　
      <i class="fa-solid fa-clock"></i>
      UTC+8　
      <i class="fa-solid fa-arrow-right"></i
      >　TRON、BTC
    </ul>
    <SearchBar :weps="originalApp" :inputDic="inputDic" widthBar="6" />
    <br />
    <ul>
      綜合幣流　
      <i class="fa-solid fa-clock"></i>
      UTC+8
    </ul>
    <SearchBar :weps="multApp" :inputDic="inputDic" widthBar="6" />

    <div class="row mb-3" v-for="x in multApp1" :key="x.id">
      <div class="col-md-1"></div>
      <div class="col-auto">
        <img class="icon" :src="`./img/${x.id}.png`" :alt="`${x.name} Icon`" />
      </div>
      <div class="col-auto label">
        <label>{{ x.name }}</label>
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-primary" @click="openUrl(x.url)">
          {{ x.name }}
        </button>
      </div>
      <div class="state">{{ x.note }}</div>
    </div>

    <br />
    <ul>
      幣流流向
    </ul>
    <SearchBar :weps="flowApp" :inputDic="inputDic" widthBar="6" />

    <hr />

    <div class="row">
      <div class="col-1" style="width: 100px; text-align: right">其他</div>
    </div>
    <div class="row mb-3" v-for="x in otherApp" :key="x.id">
      <div class="col-md-1"></div>
      <div class="col-auto">
        <img :src="`./img/${x.id}.png`" :alt="`${x.name} Icon`" style="width: 80px" />
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-info" @click="openUrl(x.url)">
          {{ x.name }}
        </button>
      </div>
      <div class="state">{{ x.note }}</div>
    </div>
  </div>
  <br />
  <br />
  <br />
</template>

<style scoped>
.label {
  width: 90px;
  text-align: center;
}

.state {
  width: 500px;
  text-align: left;
  color: rgb(13, 186, 166);
  block-size: auto;
}

.icon {
  width: 40px;
  height: 40px;
}
</style>
