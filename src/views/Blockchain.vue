<script setup>
import { ref } from 'vue'
import axios from 'axios'

const mainInput = ref('')
const inputData = ref({})
const checkedItems = ref({})

const originalApp = ref([
  { id: 'tron', name: 'TRON', url: 'https://tronscan.org/', open:'https://tronscan.org/#/address/', api:'https://apilist.tronscanapi.com/api/transfer/trx?&start=0&limit=1&direction=0&reverse=true&fee=true&db_version=1&start_timestamp=&end_timestamp=&address=',result: '' },
  { id: 'eth', name: 'ETH', url: 'https://etherscan.io/', open:'https://etherscan.io/address/', api:'https://api.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=TK82T9BHK6XDG5YJ775XP2W3BI33U6BDFB&address=', result: '' },
  { id: 'bsc', name: 'BSC', url: 'https://bscscan.com/', open:'https://bscscan.com/address/','api':'https://api.bscscan.com/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&address=', result: '' },
  { id: 'ploygon', name: 'Polygon', url: 'https://polygonscan.com/', open:'https://polygonscan.com/address/',api:'https://api.polygonscan.com/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&address=', result: '' },
  { id: 'btc', name: 'BTC', url: 'https://btc.com/zh-HK', open:'https://btc.com/zh-HK/btc/search/','api':'https://chain.api.btc.com/v3/address/',result: '' },
])

const multApp = ref([
  { id: 'oklink', name: 'Oklink', url: 'https://www.oklink.com/hk', open:'https://www.oklink.com/zh-hant/multi-search#key=',api:'https://www.oklink.com/api/v5/explorer/address/address-active-chain?address=', result: '' },
  { id: 'bitquery', name: 'Bitquery', url: 'https://explorer.bitquery.io/', open:'https://explorer.bitquery.io/search/',api:'', result: '' },
 ])

const multApp1 = ref([
  { id: 'misttrack', name: 'Misttrack', url: 'https://dashboard.misttrack.io/home', note: '錢包剖繪、錢包標籤、交易上下層的情況' },
])

const otherApp = ref([
  { id: 'bip39', name: '還原錢包', url: 'https://iancoleman.io/bip39/', note: '註記詞還原成錢包' }
])

const updateAllInputs = () => {
  originalApp.value.forEach((x) => {
    inputData.value[x.id] = mainInput.value
    x.result = `<img src="./img/loading.gif" alt="Icon" class="img-icon" style="max-width: 30px; max-height: 30px;"/>`
    query(x.id)
  })

  multApp.value.forEach((x) => {
    inputData.value[x.id] = mainInput.value

  })

}

async function query(id) {
  let rt = ''
  const sApp = originalApp.value.find((x) => x.id === id)
  try {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/${sApp.api}${inputData.value[id]}`
    )
    // console.log(response.data.data.length)
    if (id == 'tron') {
      if (response.data.data.length > 0) {
        rt = '✔️'
      } else {
        rt = '❌'
      }
    } else  if (id == 'eth') {
      if (response.data.result.includes('Error')){
        rt = '❌'
      }
      else if (response.data.result.length > 0) {
        rt = '✔️'
      } else {
        rt = response.data.message
      }
    }else  if (id == 'bsc') {
      if (response.data.result.includes('Error')){
        rt = '❌'
      }
      else if (response.data.result.length > 0) {
        rt = '✔️'
      } else {
        rt = response.data.message
      }
    }else  if (id == 'ploygon') {
      if (response.data.result.includes('Error')){
        rt = '❌'
      }
      else if (response.data.result.length > 0) {
        rt = '✔️'
      } else {
        rt = response.data.message
      }
    }else  if (id == 'btc') {
      if (response.data.status.includes('success')){
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
      }
      else if(error.response.status === 400){
        rt = '❌'
      }
    }
  }
  sApp.result = rt
}



const openoriginalApp = (id) => {
  let sApp = originalApp.value.find((x) => x.id === id)
  const input = inputData.value[id]
  if (sApp && sApp.url) {
    let fullUrl = `${sApp.url}`
    if (input) {
      fullUrl = `${sApp.open}${input}`
    }
    window.open(fullUrl, '_blank')
  }
}

const openmultApp = (id) => {
  let sApp = multApp.value.find((x) => x.id === id)
  const input = inputData.value[id]
  if (sApp && sApp.url) {
    let fullUrl = `${sApp.url}`
    if (input) {
      fullUrl = `${sApp.open}${input}`
    }
    window.open(fullUrl, '_blank')
  }
}

const openother = (id) => {
  const platform = otherApp.value.find((g) => g.id === id)
  if (platform && platform.url) {
    window.open(platform.url, '_blank')
  }
}



</script>

<template>
  <div class="container">
    <div class="row" style="text-align: center; align-items: center">
      <!-- <img src="/img/LogoKCPD.png" alt="Icon" style="width: 60px" /> -->
      <h3>　BlockChain　</h3>
    </div>
    <br />
    <div class="row">
      <div class="col-12">
        <div class="form-group row">
          <!-- <div class="col-md-1"></div> -->
          <div class="col-md-7">
            <input
              class="form-control text-box single-line"
              id="mainid"
              placeholder="address"
              v-model="mainInput"
            />
          </div>
          <div class="col-md-2">
            <button
              type="submit"
              class="btn btn-primary btn-query"
              id="btn_main"
              @click="updateAllInputs"
            >
              查詢
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <ul>原生帳本</ul>
    <div class="form-group row" v-for="x in originalApp" :key="x.id">
      <!-- <div class="col-md-1"></div> -->
      <img :src="`./img/${x.id}.png`" :alt="`${x.name} Icon`" class="img-icon" />
      <label :for="x.id" class="col-form-label">{{ x.name }}</label>
      <div class="col-md-6">
        <input
          class="form-control text-box single-line"
          v-model="inputData[x.id]"
          :id="x.id"
          :placeholder="x.name"
        />
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-primary btn-query" @click="openoriginalApp(x.id)">
          開啟
        </button>
      </div>
      <div class="col-md-2">
        <div class="col-form-label state" v-html="x.result"></div>
      </div>
    </div>
    <br>
    <ul>綜合幣流</ul>
    <div class="form-group row" v-for="x in multApp" :key="x.id">
      <img :src="`./img/${x.id}.png`" :alt="`${x.name} Icon`" class="img-icon" />
      <label :for="x.id" class="col-form-label">{{ x.name }}</label>
      <div class="col-md-6">
        <input
          class="form-control text-box single-line"
          v-model="inputData[x.id]"
          :id="x.id"
          :placeholder="x.name"
        />
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-primary btn-query" @click="openmultApp(x.id)">
          開啟
        </button>
      </div>
      <div class="col-md-2">
        <div class="col-form-label state" v-html="x.result"></div>
      </div>
    </div>
    <div class="form-group row" v-for="x in multApp1" :key="x.id">
      <img :src="`./img/${x.id}.png`" :alt="`${x.name} Icon`" class="img-icon" />
      <label :for="x.id" class="col-form-label">{{ x.name }}</label>
      <div class="col-md-2">
        <button type="button" class="btn btn-primary btn-query" @click="openmultApp(x.id)">
          {{ x.name }}
        </button>
      </div>
      <div class="col-form-label state">{{ x.note }}</div>

    </div>
    <hr>
    <h4>其他</h4>
    <div class="form-group row" v-for="x in otherApp" :key="x.id">
      <div class="col-md-1"></div>
      <img :src="`./img/${x.id}.png`" :alt="`${x.name} Icon`" class="img-icon" />
      <div class="col-md-2">
        <button type="button" class="btn btn-info btn-query" @click="openother(x.id)">
          {{ x.name }}
        </button>
      </div>
      <div class="col-form-label state">{{ x.note }}</div>
    </div>

  </div>
  <br />
  <br />
  <br />
</template>

<style scoped>
.single-line,
.single-line::placeholder {
  height: 40px;
  line-height: 15;
}

.single-line::placeholder {
  color: rgba(153, 153, 153, 0.3);
  /* 使用 rgba 表示颜色，最後一個參數是透明度（範圍 0 到 1） */
}

.col-form-label {
  width: 80px;
  text-align: center;
}

.state {
  width: 500px;
  text-align: left;
  color: rgb(13, 186, 166);
  block-size: auto;
}

.form-group.row:hover,
.form-group.row:hover {
  background-color: #f0f0f0;
  /* 變更這裡的顏色值來改變背景色 */
}

.img-icon {
  width: 40px;
  height: 40px;
}
</style>
