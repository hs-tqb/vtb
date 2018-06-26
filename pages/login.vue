<style lang="less">
#page-sign {
  flex:1; display:flex; flex-direction:column;
  padding:0 10px 20px 10px;
  h1 { margin:15px 0; }
  .fill { 
    display:flex; flex:1; flex-direction:column; justify-content:center;
    margin:15px 0; min-height:96px;
    input { 
      margin:8px 0; height:40px;
      text-align:inherit;
      background:#eaeaea;
      border:0 none; border-radius:3px;
    }
  }
  .btn { margin:15px 0; padding:0; line-height:40px; }
}
</style>

<template>
  <div id="page-sign" class="page-container text-center">
    <img id="logo" src="~/assets/img/logo.png" alt="">
    <h1>{{lang.slogan}}</h1>
    <h2>{{lang.intro}}</h2>
    <div class="fill">
      <input type="text" :placeholder="lang.placeholder.user">
    </div>
    <h3>{{lang.award}}</h3>
    <a href="javascript:void(0);" class="btn primary block">{{lang.btn}}</a>
    <p>{{lang.notes.login}}</p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      text: {
        en  : {
        },
        zh  : {
          slogan:'基于区块链的自治V2X网络',
          intro :'参与空头活动领取 5 枚VTB通证',
          placeholder:{
            user:'邮箱/手机号',
            wallet:'以太坊地址'
          },
          award:'登录邀请您的朋友获得2个VTB',
          btn  :'提交',
          notes:{
            login:'登录用户界面'
          }
        }
      },
    }
  },
  computed: {
    lang() {
      return this.text[this.$store.state.lang];
    }
  },
  created() {
    if( this.$route.query.lang ) {
      this.$store.commit('setLanguage', this.$route.query.lang);
    }
  },
  methods: {
    checkWallet() {
      if ( !this.walletId ) return;
      $.post('http://bot.valp.io/telegrambot/userAuth', {
        userWalletUrl:this.walletId,
      }, resp=>{
        if ( resp.state !== 1 ) {
          return this.walletCheckFailed = true;
        }
        resp.data.walletId = this.walletId;
        this.$store.commit('setUserCandy', resp.data);
        this.$router.push({path:'/candy?lang='+this.$store.state.lang});
      })
    }
  },
  mounted() {
    console.log('zzzzzzzzz')
    this.$store.commit('showDialog', { text:'123' })
  }
}
</script>
