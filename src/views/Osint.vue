<script setup>
import { ref } from 'vue'
import axios from 'axios'

const mainInput = ref('')
const inputData = ref({})
const checkedItems = ref({})

const socialApp = ref([
  { id: 'ptt', name: 'PTT', url: 'https://www.pttweb.cc/user/', result: '' },
  {
    id: 'gamer',
    name: '巴哈姆特',
    url: 'https://home.gamer.com.tw/homeindex.php?owner=',
    result: ''
  },
  { id: 'ruten', name: '露天市集', url: 'https://www.ruten.com.tw/store/', result: '' },
  {
    id: 'mobile01',
    name: 'Mobile01',
    url: 'https://www.mobile01.com/googlesearch.php?query=',
    result: ''
  },
  { id: 'carousell', name: '旋轉拍賣', url: 'https://tw.carousell.com/u/', result: '' },
  { id: 'shopee', name: '蝦皮', url: 'https://shopee.tw/', result: '' },
  { id: 'dcard', name: 'Dcard', url: 'https://www.dcard.tw/@', result: '' },
  { id: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/search/top?q=', result: '' },
  { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/', result: '' },
  { id: 'threads', name: 'Threads', url: 'https://www.threads.net/@', result: '' },
  { id: 'xtwitter', name: 'X (Twitter)', url: 'https://x.com/', result: '' },
  { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/@', result: '' },
  { id: 'tiktok', name: 'TikTok', url: 'https://www.tiktok.com/@', result: '' },
  { id: 'douyin', name: '抖音', url: 'https://www.douyin.com/search/', result: '' },
  { id: 'xiaohongshu', name: '小紅書', url: 'https://www.xiaohongshu.com/', result: '' }
])

const ghacking = ref([
  { id: 'intext', placeholder: 'intext:關鍵字', note: '搜尋網頁中的內容' },
  { id: 'intitle', placeholder: 'intitle:關鍵字', note: '搜尋網頁中的標題' },
  {
    id: 'filetype',
    placeholder: 'filetype:pdf ( doc, docx, ppt, xls...)',
    note: '搜尋指定類型的文件'
  },
  { id: 'info', placeholder: 'info:網址', note: '搜尋指定網站的基本資訊' },
  { id: 'cache', placeholder: 'cache:網址', note: '搜尋google中的緩存' },
  { id: 'related', placeholder: 'related:網址', note: '搜尋類似於指定網站的其他網站' },
  { id: 'inurl', placeholder: 'inurl:網址', note: '搜尋包含該字串的url' },
  { id: 'site', placeholder: 'site:網址', note: '搜尋指定網站' }
])

const gAdvanced = ref([
  {
    id: 'google_advanced_search',
    name: 'google 進階搜尋',
    url: 'https://www.google.com/advanced_search',
    col: 2
  },
  {
    id: 'google_advanced_image',
    name: 'google 進階圖片搜尋',
    url: 'https://www.google.com/advanced_image_search',
    col: 3
  },
  {
    id: 'google_advanced_video',
    name: 'google 進階影片搜尋',
    url: 'https://www.google.com/advanced_video_search',
    col: 3
  }
])

const otherOSINT = ref([
  { id: 'Epieos', url: 'https://epieos.com/', col: 1 },
  { id: 'Email Reputation', url: 'https://emailrep.io/', col: 3 },
  {
    id: 'Email-Validator',
    url: 'https://www.site24x7.com/zhcn/tools/email-validator.html',
    col: 2
  },
  {
    id: 'Quick Email Verification',
    url: 'https://quickemailverification.com/tools/email-checker',
    col: 3
  },
  { id: 'IntelTechniques', url: 'https://inteltechniques.com/tools/', col: 2 },
  { id: 'Name Checkup', url: 'https://namecheckup.com/', col: 2 },
  { id: 'Namech_k', url: 'https://namechk.com/', col: 2 }
])

const updateAllInputs = () => {
  socialApp.value.forEach((x) => {
    inputData.value[x.id] = mainInput.value
    x.result = `<img src="./img/loading.gif" alt="Icon" class="img-icon" style="max-width: 30px; max-height: 30px;"/>`


    const sa_sel = ['instagram', 'threads', 'xtwitter', 'carousell']
    const sa_err = ['shopee', 'dcard', 'facebook']
    const sa_number = ['douyin', 'xiaohongshu', 'mobile01']
    if (sa_sel.includes(x.id)) {
      query_sel(x.id)
    } else if (sa_err.includes(x.id)) {
      x.result = '👈 點他'
    }else if (sa_number.includes(x.id)) {
      x.result = '👈 點他，帳號為流水號'
    } else {
      query(x.id)
    }
  })

  ghacking.value.forEach((x) => {
    inputData.value[x.id] = mainInput.value
  })

  inputData.value['googleid'] = mainInput.value
}
async function query(id) {
  let rt = ''
  const sApp = socialApp.value.find((x) => x.id === id)
  try {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/${sApp.url}${inputData.value[id]}`
    )
    if (id == 'ptt') {
      if (!response.data.includes('沒有此作者')) {
        rt = '&#10004;'
      } else {
        rt = '查無此帳號'
      }
    } else if (id == 'gamer') {
      if (response.data.includes('的小屋')) {
        rt = '&#10004;'
      } else {
        rt = '查無此帳號'
      }
    } else if (id == 'ruten') {
      if (!response.data.includes('A0005')) {
        rt = '&#10004;'
      } else {
        rt = '查無此帳號'
      }
    } else if (id == 'youtube') {
      if (response.data.includes(inputData.value[id])) {
        rt = '&#10004;'
      } else {
        rt = '查無此帳號'
      }
    } else if (id == 'tiktok') {
      if (response.data.includes('uniqueId')) {
        rt = '&#10004;'
      } else {
        rt = '查無此帳號'
      }
    }
  } catch (error) {
    rt = error.message
    if (error.response) {
      if (error.response.status === 404) {
        rt = '查無此帳號'
      }
    }
  }
  sApp.result = rt
}

async function query_sel(id) {
  let rt = ''
  const sApp = socialApp.value.find((x) => x.id === id)
  try {
     const response = await axios.get(
      // `https://cors-anywhere.herokuapp.com/${sApp.url}${inputData.value[id]}`
      `https://1dc7-1-175-194-184.ngrok-free.app/OSINT_api?sapp=${sApp.id}&skey=${inputData.value[id]}`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        }
      }
    )
    rt = '👈 點他'
    if (id == 'instagram') {
      rt = response.data.instagram
    } else if (id == 'threads') {
      rt = response.data.threads
    } else if (id == 'xtwitter') {
      rt = response.data.xtwitter
    } else if (id == 'carousell') {
      rt = response.data.carousell
    } else if (id == 'shopee') {
      rt = response.data.shopee
    } else if (id == 'facebook') {
      rt = response.data.facebook
    }
  } catch (error) {
    rt = error.message
    if (error.response) {
      if (error.response.status === 404) {
        rt = '查無此帳號'
      }
    }
  }
  sApp.result = rt
}

const openSocialApp = (id) => {
  const sApp = socialApp.value.find((x) => x.id === id)
  const input = inputData.value[id]

  if (sApp && sApp.url) {
    let fullUrl = `${sApp.url}`
    if (input) {
      fullUrl += input
    }
    window.open(fullUrl, '_blank')
  }
}

const openghacking = () => {
  const parameter = []
  let targetURL = `https://www.google.com/search?q=`
  if (inputData.value['googleid']) {
    targetURL += inputData.value['googleid'] + ' '
  }
  for (const id in checkedItems.value) {
    if (checkedItems.value[id]) {
      if (id == 'intext' || id == 'intitle') {
        parameter.push(`${id}:"${inputData.value[id]}"`)
      } else {
        parameter.push(`${id}:${inputData.value[id]}`)
      }
    }
  }
  targetURL += parameter.join(' ')
  window.open(targetURL, '_blank')
}

const opengAdvanced = (id) => {
  const platform = gAdvanced.value.find((g) => g.id === id)
  if (platform && platform.url) {
    window.open(platform.url, '_blank')
  }
}

const openotherOSINT = (id) => {
  const platform = otherOSINT.value.find((g) => g.id === id)
  if (platform && platform.url) {
    window.open(platform.url, '_blank')
  }
}


</script>

<template>
  <div class="container">
    <div class="row" style="text-align: center; align-items: center">
      <img src="/img/LogoKCPD.png" alt="Icon" style="width: 60px" />
      <h3>　KJD OSINT　★★★</h3>
    </div>
    <br />
    <div class="row">
      <div class="col-12">
        <div class="form-group row">
          <div class="col-md-1"></div>
          <label for="mainid" class="col-form-label">id</label>
          <div class="col-md-5">
            <input
              class="form-control text-box single-line"
              id="mainid"
              placeholder="輸入要查詢的 id"
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

    <div class="form-group row" v-for="x in socialApp" :key="x.id">
      <div class="col-md-1"></div>
      <img :src="`./img/${x.id}.png`" :alt="`${x.name} Icon`" class="img-icon" />
      <label :for="x.id" class="col-form-label">{{ x.name }}</label>
      <div class="col-md-3">
        <input
          class="form-control text-box single-line"
          v-model="inputData[x.id]"
          :id="x.id"
          :placeholder="x.name"
        />
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-primary btn-query" @click="openSocialApp(x.id)">
          開啟
        </button>
      </div>
      <div class="col-md-4">
        <div class="col-form-label state" v-html="x.result"></div>
      </div>
    </div>

    <hr />
    <img src="/img/GoogleHacking.png" alt="Icon" style="width: 200px" />
    <!-- <h5>Google Hacking</h5> -->
    <!-- <div class="row"></div> -->
    <div class="form-group row">
      <!-- <div class="col-md-1"></div> -->
      <label for="googleid" class="col-form-label"></label>
      <div class="col-md-6 google_hacking_kw">
        <input
          class="form-control text-box single-line"
          id="googleid"
          placeholder="key word"
          v-model="inputData['googleid']"
        />
      </div>
      <div class="col-md-1 google_hacking_kw">
        <button type="button" class="btn btn-primary btn-query" @click="openghacking()">
          查詢
        </button>
      </div>
      <div class="col-md-2">
        <div>【 + 】 增加關鍵字 <br />【 - 】 忽略某個字 <br />【 ~ 】 同意詞</div>
      </div>
      <div class="col-md-2">
        <div>【 . 】 單一的通配符 <br />【 * 】 代表多個字母 <br />【 "" 】 精確查詢</div>
      </div>
    </div>

    <div class="form-group row" v-for="g in ghacking" :key="g.id">
      <div class="col-md-1"></div>
      <input type="checkbox" v-model="checkedItems[g.id]" />
      <label for="google_intext" class="col-form-label">{{ g.id }}</label>
      <div class="col-md-4">
        <input
          class="form-control text-box single-line"
          :placeholder="g.placeholder"
          v-model="inputData[g.id]"
        />
      </div>
      <div class="col-md-4 google_hacking">{{ g.note }}</div>
    </div>

    <div class="row">
      <div class="col-md-1"></div>
      <div :class="`col-md-${g.col} google_hacking_kw`" v-for="g in gAdvanced" :key="gAdvanced.id">
        <button type="button" class="btn btn-info" @click="opengAdvanced(g.id)">
          {{ g.name }}
        </button>
      </div>
    </div>

    <hr />
    <br />
    <h4>其他OSINT網站</h4>
    <br />
    <div class="row">
      <div class="col-md-1"></div>
      <div :class="`col-md-${g.col} google_hacking_kw`" v-for="g in otherOSINT" :key="g.id">
        <button type="button" class="btn btn-secondary" @click="openotherOSINT(g.id)">
          {{ g.id }}
        </button>
      </div>
    </div>
  </div>
  <br />
  <br />
  <br />
</template>

<style scoped>
.inline {
  display: inline;
}

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

.google_hacking_kw {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.google_hacking {
  /* width: 330px; */
  text-align: left;
  padding-top: calc(0.375rem + 1px);
  padding-bottom: calc(0.375rem + 1px);
  /* font-size: inherit; */
  /* line-height: 1.5; */
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
