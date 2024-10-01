<script setup>
import { ref } from 'vue'
import axios from 'axios'
import SearchBar from '@/components/SearchBar.vue'
import GoogleHacking from '@/components/GoogleHacking.vue'
import WebButton from '@/components/WebButton.vue'

const mainInput = ref('')
const inputDic = ref({})
const checkedItems = ref({})

const socialApp = ref([
  {
    id: 'ptt',
    name: 'PTT',
    url: 'https://www.pttweb.cc/user/',
    open: 'https://www.pttweb.cc/user/',
    result: ''
  },
  {
    id: 'gamer',
    name: '巴哈姆特',
    url: 'https://home.gamer.com.tw/',
    open: 'https://home.gamer.com.tw/homeindex.php?owner=',
    result: ''
  },
  {
    id: 'ruten',
    name: '露天市集',
    url: 'https://www.ruten.com.tw/',
    open: 'https://www.ruten.com.tw/store/',
    result: ''
  },
  {
    id: 'carousell',
    name: '旋轉拍賣',
    url: 'https://tw.carousell.com/',
    open: 'https://tw.carousell.com/u/',
    result: ''
  },
  {
    id: 'dcard',
    name: 'Dcard',
    url: 'https://www.dcard.tw/',
    open: 'https://www.dcard.tw/@',
    result: ''
  },
  {
    id: 'shopee',
    name: '蝦皮',
    url: 'https://shopee.tw/',
    open: 'https://shopee.tw/',
    result: ''
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/',
    open: 'https://www.facebook.com/search/top?q=',
    result: ''
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/',
    open: 'https://www.instagram.com/',
    result: ''
  },
  {
    id: 'threads',
    name: 'Threads',
    url: 'https://www.threads.net/',
    open: 'https://www.threads.net/@',
    result: ''
  },
  {
    id: 'xtwitter',
    name: 'X (Twitter)',
    url: 'https://x.com/',
    open: 'https://x.com/',
    result: ''
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com/',
    open: 'https://www.youtube.com/@',
    result: ''
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    url: 'https://www.tiktok.com/',
    open: 'https://www.tiktok.com/@',
    result: ''
  },
  {
    id: 'douyin',
    name: '抖音',
    url: 'https://www.douyin.com/',
    open: 'https://www.douyin.com/search/',
    result: ''
  },
  {
    id: 'xiaohongshu',
    name: '小紅書',
    url: 'https://www.xiaohongshu.com/',
    open: 'https://www.xiaohongshu.com/',
    result: ''
  },
  {
    id: 'mobile01',
    name: 'Mobile01',
    url: 'https://www.mobile01.com/',
    open: 'https://www.mobile01.com/googlesearch.php?query=',
    result: ''
  }
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
    url: 'https://www.google.com/advanced_search'
  },
  {
    id: 'google_advanced_image',
    name: 'google 進階圖片搜尋',
    url: 'https://www.google.com/advanced_image_search'
  },
  {
    id: 'google_advanced_video',
    name: 'google 進階影片搜尋',
    url: 'https://www.google.com/advanced_video_search'
  }
])

const OSINTemail = ref([
  { id: 'Epieos', url: 'https://epieos.com/' },
  { id: 'Email Reputation', url: 'https://emailrep.io/' },
  {
    id: 'Email-Validator',
    url: 'https://www.site24x7.com/zhcn/tools/email-validator.html'
  },
  {
    id: 'Quick Email Verification',
    url: 'https://quickemailverification.com/tools/email-checker'
  }
])

const OSINTuser = ref([
  { id: 'Name Checkup', url: 'https://namecheckup.com/' },
  { id: 'Namech_k', url: 'https://namechk.com/' }
])

const OSINTother = ref([{ id: 'IntelTechniques', url: 'https://inteltechniques.com/tools/' }])

const updateInputs = () => {
  socialApp.value.forEach((x) => {
    inputDic.value[x.id] = mainInput.value
  })
  ghacking.value.forEach((x) => {
    inputDic.value[x.id] = mainInput.value
  })
  inputDic.value['googleid'] = mainInput.value
}

const querybutton = () => {
  socialApp.value.forEach((x) => {
    if (mainInput.value === '') {
      return
    }
    inputDic.value[x.id] = mainInput.value

    x.result = `<img src="./img/loading.gif" alt="Icon" class="img-icon" style="max-width: 30px; max-height: 30px;"/>`

    const sa_sel = ['instagram', 'threads', 'xtwitter', 'carousell', 'dcard']
    // const sa_sel = ['instagram']
    const sa_err = ['shopee', 'facebook']
    const sa_number = ['douyin', 'xiaohongshu', 'mobile01']
    if (sa_sel.includes(x.id)) {
      query_sel(x.id)
    } else if (sa_err.includes(x.id)) {
      x.result = '👈 點他'
    } else if (sa_number.includes(x.id)) {
      x.result = '👈 點他，帳號為流水號'
    } else {
      query(x.id)
    }
  })

  ghacking.value.forEach((x) => {
    inputDic.value[x.id] = mainInput.value
  })

  inputDic.value['googleid'] = mainInput.value
}
async function query(id) {
  let rt = ''
  const sApp = socialApp.value.find((x) => x.id === id)
  try {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/${sApp.open}${inputDic.value[id]}`
    )
    if (id == 'ptt') {
      if (!response.data.includes('沒有此作者')) {
        rt = '✔️'
      } else {
        rt = '查無此帳號'
      }
    } else if (id == 'gamer') {
      if (response.data.includes('的小屋')) {
        rt = '✔️'
      } else {
        rt = '查無此帳號'
      }
    } else if (id == 'ruten') {
      if (!response.data.includes('A0005')) {
        rt = '✔️'
      } else {
        rt = '查無此帳號'
      }
    } else if (id == 'youtube') {
      if (response.data.includes(inputDic.value[id])) {
        rt = '✔️'
      } else {
        rt = '查無此帳號'
      }
    } else if (id == 'tiktok') {
      if (response.data.includes('uniqueId')) {
        rt = '✔️'
      } else {
        rt = '查無此帳號'
      }
    }
  } catch (error) {
    rt = error.message
    if (error.response) {
      if (error.response.status === 404) {
        rt = '查無此帳號'
      } else if (error.response.status === 403) {
        rt = '請先點右上角verify'
      }
    }
  }
  sApp.result = rt
}

async function query_sel(id) {
  let rt = ''
  const sApp = socialApp.value.find((x) => x.id === id)

  // console.log(
  //   `${import.meta.env.VITE_API_HOST}/OSINT_api?sapp=${sApp.id}&skey=${inputDic.value[id]}`
  // )
  try {
    const response = await axios.get(
      // `https://cors-anywhere.herokuapp.com/${sApp.url}${inputDic.value[id]}`
      `${import.meta.env.VITE_API_HOST}/OSINT_api?sapp=${sApp.id}&skey=${inputDic.value[id]}`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true'
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
    } else if (id == 'dcard') {
      rt = response.data.dcard
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
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-auto">
        <img src="/img/LogoKCPD.png" alt="Icon" style="width: 60px" />
      </div>
      <div class="col">
        <h3>KJD OSINT ★★★</h3>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-auto">
        <label>id</label>
      </div>
      <div class="col-md-6">
        <input
          class="form-control"
          id="mainid"
          placeholder="輸入要查詢的 id"
          v-model="mainInput"
          @input="updateInputs"
        />
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-primary" @click="querybutton">查詢</button>
      </div>
    </div>
    <hr />
    <SearchBar :weps="socialApp" :inputDic="inputDic" widthBar="4" />
    <hr />
    <GoogleHacking
      :ghacking="ghacking"
      :inputDic="inputDic"
      :checkedItems="checkedItems"
      :gAdvanced="gAdvanced"
    />

    <hr />
    <br />
    <h4>其他OSINT網站</h4>
    <br />
    <WebButton :webs="OSINTemail" name="Email" />
    <WebButton :webs="OSINTuser" name="UserName" />
    <WebButton :webs="OSINTother" name="Tool" />
  </div>
  <br />
  <br />
  <br />
</template>
