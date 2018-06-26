<style lang="less">
#page-sign {
  flex:1; display:flex; flex-direction:column;
  padding:0 10px 20px 10px;
  h1 { margin:15px 0; }
  .fill { 
    display:flex; flex:1; flex-direction:column; justify-content:center;
    margin:15px 0; min-height:96px;
    input { 
      margin:4px 0; height:40px;
      text-align:inherit;
      background:#eaeaea;
      border:0 none; border-radius:3px;
    }
    #captcha {
      p {
        margin-top:4px; 
        line-height:40px; color:#7a7a7a;
        background:#eaeaea;
      }
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
      <input type="text" :placeholder="lang.placeholder.user" v-model.trim="user">
      <input type="text" :placeholder="lang.placeholder.wallet" v-model.trim="wallet">
      <div>
        <div id="captcha">
          <p id="wait" class="show">正在加载验证码......</p>
        </div>
      </div>
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
      // 语言
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
      // 变量
      user:'',
      wallet:'',
      captchaObj:null,
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
      if ( !this.wallet ) return;
      $.post('http://bot.valp.io/telegrambot/userAuth', {
        userWalletUrl:this.wallet,
      }, resp=>{
        if ( resp.state !== 1 ) {
          return this.walletCheckFailed = true;
        }
        resp.data.wallet = this.wallet;
        this.$store.commit('setUserCandy', resp.data);
        this.$router.push({path:'/candy?lang='+this.$store.state.lang});
      })
    },
    initCaptcha() {
      $.ajax({
        url: "gt/register-click?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
          // 调用 initGeetest 进行初始化
          // 参数1：配置参数
          // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
          initGeetest({
            // 以下 4 个配置参数为必须，不能缺少
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success, // 表示用户后台检测极验服务器是否宕机
            new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
            product: "popup", // 产品形式，包括：float，popup
            // width: "300px"
            // 更多前端配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
          }, handler);
        }
      });
    },
    loadCaptcha(obj) {
      obj.appendTo('#captcha');
      obj.onReady(function () {
          $("#wait").hide();
      });
      this.captchaObj = obj;
    },
    doVerify() {
      let captchaObj = this.captchaObj;
      let result = captchaObj.getValidate();
      if (!result) {
          return alert('请完成验证');
      }
      $.ajax({
        url: 'gt/validate-click',
        type: 'POST',
        dataType: 'json',
        data: {
          username: this.user,
          password: this.wallet,
          geetest_challenge: result.geetest_challenge,
          geetest_validate: result.geetest_validate,
          geetest_seccode: result.geetest_seccode
        },
        success: function (data) {
          if (data.status === 'success') {
            alert('登录成功');
          } else if (data.status === 'fail') {
            alert('登录失败，请完成验证');
            captchaObj.reset();
          }
        }
      });
    }
  },
  mounted() {
    // this.$store.commit('showDialog', { text:'123' })
  }
}
</script>
