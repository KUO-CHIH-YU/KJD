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
    api: `https://api.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${import.meta.env.VITE_ETH_APIKEY}&address=`,
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
    api: 'https://tools-gateway.api.btc.com/rest/api/v1.0/nodeapi/address/summary/', //'https://chain.api.btc.com/v3/address/',
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
  {
    id: 'CoinMarketCap',
    name: 'CoinMarketCap',
    url: 'https://coinmarketcap.com/zh-tw/',
    note: '市值前 100 加密貨幣'
  },
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
    const tmpUrl = `https://thingproxy.freeboard.io/fetch/${sApp.api}${inputDic.value[id]}` //https://cors-anywhere.herokuapp.com/
    if (id == 'btc') {
      const response = await axios.get(tmpUrl, {
        headers: {
          'X-API-TOKEN': import.meta.env.VITE_BTC_X_API_TOKEN,
          'content-type': 'application/json'
        }
      })

      if ('address' in response.data.data && response.data.data.address != '') {
        rt = '✔️'
      } else {
        rt = '❌'
      }
    } else {
      const response = await axios.get(tmpUrl)
      if (id == 'tron') {
        if ('data' in response.data && response.data.data.length > 0) {
          rt = '✔️'
        } else {
          rt = '❌'
        }
      } else if (id == 'eth') {
        if (response.data.message.includes('NOTOK')) {
          rt = '❌'
        } else if (response.data.result.length > 0) {
          rt = '✔️'
        } else {
          rt = response.data.message
        }
      } else if (id == 'bsc') {
        if (response.data.message.includes('NOTOK')) {
          rt = '❌'
        } else if (response.data.result.length > 0) {
          rt = '✔️'
        } else {
          rt = response.data.message
        }
      } else if (id == 'ploygon') {
        if (response.data.message.includes('NOTOK')) {
          rt = '❌'
        } else if (response.data.result.length > 0) {
          rt = '✔️'
        } else {
          rt = response.data.message
        }
      }
    }
  } catch (error) {
    rt = error.message
    if (error.response) {
      if (error.response.status === 404) {
        rt = 'Error'
      } else if (error.response.status === 400) {
        rt = '❌'
      } else if (error.response.status === 429) {
        rt = '請求次數過多'
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
      <div class="stateshort">{{ x.note }}</div>
    </div>

    <br />
    <ul>
      幣流流向
    </ul>
    <SearchBar :weps="flowApp" :inputDic="inputDic" widthBar="6" />
    <ul>
      跨鏈瀏覽器
    </ul>
    <SearchBar :weps="swapApp" :inputDic="inputDic" widthBar="6" />
    <div class="row mb-9">
      <div class="col-2"></div>
      <div class="col-md-8 note">
        <p>ETH：0x92e929d8B2c8430BcAF4cD87654789578BB2b786</p>
        <p>BSC：0x1eD5685F345b2fa564Ea4a670dE1Fde39e484751</p>
      </div>
    </div>
    <hr />
    <ul>
      其他
    </ul>
    <div class="row mb-3" v-for="x in otherApp" :key="x.id">
      <div class="col-md-1"></div>
      <div class="col-auto">
        <img :src="`./img/${x.id}.png`" :alt="`${x.name} Icon`" style="height: 40px" />
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-info" @click="openUrl(x.url)">
          {{ x.name }}
        </button>
      </div>
      <div class="stateshort">{{ x.note }}</div>
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

.stateshort {
  width: 330px;
  text-align: left;
  color: rgb(13, 186, 166);
  block-size: auto;
}

.icon {
  width: 40px;
  height: 40px;
}
.note {
  color: rgb(54, 161, 156);
}
</style>
