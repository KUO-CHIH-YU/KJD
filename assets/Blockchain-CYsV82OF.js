import{_ as N,r as i,c as d,a as s,w as O,v as $,b as v,S as b,F as f,d as y,e as B,o as u,t as p,p as x,f as A,g as h}from"./index-COKnaPEJ.js";const o=m=>(x("data-v-e1e43cc4"),m=m(),A(),m),K={class:"container"},S=o(()=>s("div",{class:"row"},[s("div",{class:"col-1"}),s("div",{class:"col"},[s("h3",null,"　BlockChain　")])],-1)),q=o(()=>s("br",null,null,-1)),U={class:"row"},H=o(()=>s("div",{class:"col-1"},null,-1)),V={class:"col-md-8"},z=o(()=>s("hr",null,null,-1)),F=o(()=>s("ul",null,[h(" 原生帳本　 "),s("i",{class:"fa-solid fa-clock"}),h(" UTC+8　 "),s("i",{class:"fa-solid fa-arrow-right"}),h("　TRON、BTC ")],-1)),P=o(()=>s("br",null,null,-1)),X=o(()=>s("ul",null,[h(" 綜合幣流　 "),s("i",{class:"fa-solid fa-clock"}),h(" UTC+8 ")],-1)),M=o(()=>s("div",{class:"col-md-1"},null,-1)),R={class:"col-auto"},j=["src","alt"],G={class:"col-auto label"},J={class:"col-auto"},L=["onClick"],W={class:"state"},Y=o(()=>s("br",null,null,-1)),Q=o(()=>s("ul",null," 幣流流向 ",-1)),Z=o(()=>s("hr",null,null,-1)),ss=o(()=>s("div",{class:"row"},[s("div",{class:"col-1",style:{width:"100px","text-align":"right"}},"其他")],-1)),ts=o(()=>s("div",{class:"col-md-1"},null,-1)),es={class:"col-auto"},as=["src","alt"],os={class:"col-auto"},ls=["onClick"],ns={class:"state"},cs=o(()=>s("br",null,null,-1)),is=o(()=>s("br",null,null,-1)),rs=o(()=>s("br",null,null,-1)),ds={__name:"Blockchain",setup(m){const r=i(""),c=i({}),_=i([{id:"tron",name:"TRON",url:"https://tronscan.org/",open:"https://tronscan.org/#/address/",api:"https://apilist.tronscanapi.com/api/transfer/trx?&start=0&limit=1&direction=0&reverse=true&fee=true&db_version=1&start_timestamp=&end_timestamp=&address=",result:""},{id:"eth",name:"ETH",url:"https://etherscan.io/",open:"https://etherscan.io/address/",api:"https://api.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=TK82T9BHK6XDG5YJ775XP2W3BI33U6BDFB&address=",result:""},{id:"bsc",name:"BSC",url:"https://bscscan.com/",open:"https://bscscan.com/address/",api:"https://api.bscscan.com/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&address=",result:""},{id:"ploygon",name:"Polygon",url:"https://polygonscan.com/",open:"https://polygonscan.com/address/",api:"https://api.polygonscan.com/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&address=",result:""},{id:"btc",name:"BTC",url:"https://btc.com/zh-HK",open:"https://btc.com/zh-HK/btc/search/",api:"https://tools-gateway.api.btc.com/rest/api/v1.0/nodeapi/address/summary/",result:""}]),g=i([{id:"oklink",name:"Oklink",url:"https://www.oklink.com/hk",open:"https://www.oklink.com/zh-hant/multi-search#key=",api:"https://www.oklink.com/api/v5/explorer/address/address-active-chain?address=",result:""}]),k=i([{id:"bitquery",name:"Bitquery",url:"https://explorer.bitquery.io/",open:"https://explorer.bitquery.io/search/",api:"",result:""}]),T=i([{id:"misttrack",name:"Misttrack",url:"https://dashboard.misttrack.io/home",note:"錢包剖繪、錢包標籤、交易上下層的情況"}]),I=i([{id:"bip39",name:"還原錢包",url:"https://iancoleman.io/bip39/",note:"註記詞還原成錢包"}]),C=()=>{_.value.forEach(t=>{c.value[t.id]=r.value}),g.value.forEach(t=>{c.value[t.id]=r.value}),k.value.forEach(t=>{c.value[t.id]=r.value})},D=()=>{_.value.forEach(t=>{c.value[t.id]=r.value,t.result='<img src="./img/loading.gif" alt="Icon" class="img-icon" style="max-width: 30px; max-height: 30px;"/>',E(t.id)})};async function E(t){let e="";const a=_.value.find(l=>l.id===t);try{const l=`https://cors-anywhere.herokuapp.com/${a.api}${c.value[t]}`;if(t=="btc")(await B.get(l,{headers:{"X-API-TOKEN":"t77b0ca050f524521345f3e39e222c624cc8e5fa1f063cc1825434bb5b4d61770","content-type":"application/json"}})).data.data.address!=""?e="✔️":e="❌";else{const n=await B.get(l);t=="tron"?n.data.data.length>0?e="✔️":e="❌":t=="eth"?n.data.result.includes("Error")?e="❌":n.data.result.length>0?e="✔️":e=n.data.message:(t=="bsc"||t=="ploygon")&&(n.data.message.includes("NOTOK")?e="❌":n.data.result.length>0?e="✔️":e=n.data.message)}}catch(l){e=l.message,l.response&&(l.response.status===404?e="Error":l.response.status===400&&(e="❌"))}a.result=e}const w=t=>{t&&window.open(t,"_blank")};return(t,e)=>(u(),d(f,null,[s("div",K,[S,q,s("div",U,[H,s("div",V,[O(s("input",{class:"form-control",placeholder:"address","onUpdate:modelValue":e[0]||(e[0]=a=>r.value=a),onInput:C},null,544),[[$,r.value]])]),s("div",{class:"col-auto"},[s("button",{type:"button",class:"btn btn-primary",onClick:D},"查詢")])]),z,F,v(b,{weps:_.value,inputDic:c.value,widthBar:"6"},null,8,["weps","inputDic"]),P,X,v(b,{weps:g.value,inputDic:c.value,widthBar:"6"},null,8,["weps","inputDic"]),(u(!0),d(f,null,y(T.value,a=>(u(),d("div",{class:"row mb-3",key:a.id},[M,s("div",R,[s("img",{class:"icon",src:`./img/${a.id}.png`,alt:`${a.name} Icon`},null,8,j)]),s("div",G,[s("label",null,p(a.name),1)]),s("div",J,[s("button",{type:"button",class:"btn btn-primary",onClick:l=>w(a.url)},p(a.name),9,L)]),s("div",W,p(a.note),1)]))),128)),Y,Q,v(b,{weps:k.value,inputDic:c.value,widthBar:"6"},null,8,["weps","inputDic"]),Z,ss,(u(!0),d(f,null,y(I.value,a=>(u(),d("div",{class:"row mb-3",key:a.id},[ts,s("div",es,[s("img",{src:`./img/${a.id}.png`,alt:`${a.name} Icon`,style:{width:"80px"}},null,8,as)]),s("div",os,[s("button",{type:"button",class:"btn btn-info",onClick:l=>w(a.url)},p(a.name),9,ls)]),s("div",ns,p(a.note),1)]))),128))]),cs,is,rs],64))}},ps=N(ds,[["__scopeId","data-v-e1e43cc4"]]);export{ps as default};
