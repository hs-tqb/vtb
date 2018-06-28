<style lang="less">
#page-account {
  .base { text-align:right; }
  .panel {
    margin-top:10px; padding:15px 10px; font-size:12px; color:#fff; background-color:#4baafd;
    h3   { margin-bottom:5px; font-weight:bold; font-size:14px; }
    .explain {  }
  }
  .text-wallet { display:block; width:calc(100vw - 20px - 70px); color:#aaa; overflow:hidden; text-overflow:ellipsis; }
  #userInfo {
    // #logo { width:100px; height:122px; }
    display:flex; flex-direction:row; padding:10px;
    .base { flex:1; display:flex; flex-direction:column; justify-content:space-between; padding:15px 0; }
  }
  #balance { 
    display:flex; flex-direction:row; 
    .left { 
      display:flex; flex-direction:column; margin-right:10px; width:350px; white-space:nowrap; 
      h2 { display:flex; flex:1; align-items:center; justify-items:center; font-size:30px; }
      span {  }
    }
  }
  #award {
    .copy { 
      display:flex; flex-direction:row; margin-top:10px;
      input { flex:1; padding-left:10px; color:#666;  }
      // .btn { color:inherit; }
    }
  }
}
</style>

<template>
  <div id="page-account" v-if="userInfo">
    <div id="userInfo">
      <img id="logo" src="~/assets/img/logo.png" alt="">
      <div class="base">
        <h3 @click.prevent="logout">{{userInfo.user}}&nbsp;&nbsp;&nbsp;{{lang.account.logout}}</h3>
        <h4 class="text-wallet">{{userInfo.wallet}}</h4>
      </div>
    </div>
    <div id="balance" class="panel">
      <div class="left">
        <h3>{{lang.balance.title}}</h3>
        <h2><span>&nbsp;{{userInfo.balance}} VTB</span></h2>
      </div>
      <p class="explain">{{lang.balance.explain}}</p>
    </div>
    <div id="project" class="panel">
      <h3 class="text-center">{{lang.project.title}}</h3>
      <p>{{lang.project.explain}}</p>
    </div>
    <div id="award" class="panel">
      <h3>{{lang.award.title}}</h3>
      <p>{{lang.award.explain}}</p>
      <div class="copy">
        <!-- <input id="myRefCode" :value="inviteURL" class="text-wallet" /> -->
        <p class="text-wallet">{{inviteURL}}</p>
        <button id="copyMyRefCode" class="btn primary" 
          data-clipboard-action="copy" data-clipboard-target="#myRefCode"
        >{{lang.award.btn}}</button>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  fetch({store,redirect,query}) {
    if ( !store.state.userInfo ) {
      redirect(`/login?lang=${(query.lang||store.state.lang)}`)
    }
  },
  asyncData({query}) {
    return { query }
  },
  head: {
    script: [ {src:'/js/clipboard.min.js', async:false} ]
  },
  data() {
    return {
      text: {
        en:{},
        zh:{
          account: {
            logout:'退出',
          },
          balance: {
            title:'你的VTB通行证',
            explain:`参与空投活动，获取价值2VTB通证活动时间：7月1日9时至7月7日24时限时空投价值12万VTB通证`,
          },
          project: {
            title:'VTB(Vehicle-to-Everything)',
            explain:'是面向自动驾驶、5G童心的自治区块链网络。基于区块链技术，可以实现设备数字化，从而使其可以被确权、交易和消费，实现去中心化自主运作。'
          },
          award: {
            title:'邀请您的朋友获得2个VTB通证',
            explain:'将一下链接分享给您的50为朋友，每邀请以为获得2个VTB通证。',
            btn:'复制'
          }
        }
      },
      inviteURL:''
      // wallet:'0xlsdkdkfkskfj1lskdjf',
      // inviteURL:'https://sdfsdfsdfsdsk.cosmshjsd.sofn?skfj=123l'
      // inviteURL:location.href+'&from=123'
    }
  },
  computed: {
    lang() {
      return this.text[this.$store.state.lang];
      // return this.text.zh
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    logout() {
      
      this.$router.replace('/login?lang='+this.query.lang)
    },
    initCopyEvent() {
      try {
        var clipboard1 = new Clipboard('#copyMyRefCode');
        clipboard1.on('success', (e)=>{
          // this.copy();
          // console.log('111111111');
          this.$store.commit('showDialog', {type:'success',text:'复制成功'});
          e.clearSelection();      
        });
      } catch(e) {
        setTimeout(this.initCopyEvent, 300);
      }
    },
  },
  mounted() {
    this.initCopyEvent();
    this.inviteURL = location.origin +
    '/register?lang='+(this.query.lang||this.$store.state.lang) + 
    '&from='+this.userInfo.inviteCode
  }
}
</script>

