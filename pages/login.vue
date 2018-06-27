
<template>
  <div id="page-sign" class="page-container text-center">
    <img id="logo" src="~/assets/img/logo.png" alt="">
    <h1>{{lang.slogan}}</h1>
    <h2>{{lang.intro}}</h2>
    <div class="fill">
      <input type="text" :placeholder="lang.placeholder.user" v-model.trim="user">
      <input type="text" class="text-wallet" :placeholder="lang.placeholder.wallet" v-model.trim="wallet">
      <!-- <div>
        <div id="captcha">
          <p id="wait" class="show">正在加载验证码......</p>
        </div>
      </div> -->
    </div>
    <div class="flexbox"></div>
    <h3>{{lang.award}}</h3>
    <a href="javascript:void(0);" class="btn primary block" @click="doVerify">{{lang.btn}}</a>
    <p class="sign" @click="register">{{lang.notes.login}}</p>
  </div>
</template>

<script>
// let host = 'http://192.168.1.170:8008'
let host = 'http://47.89.11.105:8091'
let host2 = 'http://localhost:9977'
export default {
  asyncData({query}) {
    return { query }
  },
  head: {
    script:[{src:'/js/gt.js'}]
  },
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
          btn  :'登录',
          notes:{
            login:'没有帐号？注册一个',
          },
          validate: {
            captcha:'请完成验证',
            user:{
              empty:'手机号/邮箱不能为空',
              error:'手机号/邮箱格式错误'
            },
            wallet: {
              empty:'钱包地址不能为空',
              error:'钱包地址错误'
            },
            login: {
              success:'登录成功',
              failure:'登录失败，请重新验证'
            },
            register: {
              success:'注册成功',
              failure:'注册失败，请重新验证'
            }
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
    register() {
      this.$router.replace(
        '/register?lang=' + 
        (this.query.lang || this.$store.state.lang ) + 
        (this.query.from? '&from='+this.query.from:'')
      )
    },
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
          // url: host2+"/gt/register-click?t=" + (new Date()).getTime(), // 加随机数防止缓存
          url: host+"/geetest/geeFirst", // 加随机数防止缓存
          type: "get",
          dataType: "json",
          data: { loginName:this.user },
          success: (data)=>{
            // 调用 initGeetest 进行初始化
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
            initGeetest({
              // 以下 4 个配置参数为必须，不能缺少
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success, // 表示用户后台检测极验服务器是否宕机
              new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
              timeout: '5000',
              product: "bind", // 产品形式，包括：float，popup
              width: "100%"
              // 更多前端配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
            // }, handler);
            }, this.initCaptcha2);
          }
      });
    },
    initCaptcha2(obj) {
      this.initCaptchaFinish = true;
      this.captchaObj = obj;
      this.captchaObj.onSuccess(()=>{
        let result = this.captchaObj.getValidate();
        $.ajax({
          // url: 'http://localhost:9977/'+'gt/validate-click',
          url: host+'/geetest/geeSecond',
          type: 'POST',
          dataType: 'json',
          data: {
            loginName: this.user,
            geetest_challenge: result.geetest_challenge,
            geetest_validate: result.geetest_validate,
            geetest_seccode: result.geetest_seccode
          },
          success: (data)=>{
            if (data.status === 'success') {
              this.doRegister();
            } else if (data.status === 'fail') {
              // alert('登录失败，请完成验证');
              this.$store.commit('showDialog', {text:this.lang.validate.login.failure})
              this.captchaObj.reset();
            }
          }
        });
      });

      this.captchaObj.onReady(()=>{
        this.captchaObj.verify();
      })
    },
    doVerify() {
      // 如果为空, 或者既不是手机也不是邮箱
      let error  = '';
      if ( !this.user ) {
        error = this.lang.validate.user.empty
      } else if ( !/^(\+?\d{1,3} *)?\d+(\-\d+)*$/.test(this.user) && 
      !/^[a-zA-Z0-9\u4e00-\u9fa5]+([\.\_\-]?[a-zA-Z0-9\u4e00-\u9fa5])+@([a-zA-Z0-9]+[\.\-])+[a-zA-Z0-9]+$/.test(this.user) ) {
        error = this.lang.validate.user.error;
      } else if ( !this.wallet ) {
        error = this.lang.validate.wallet.empty;
      } else if ( !/^0x[0-9a-zA-Z]{40}$/.test(this.wallet) || !parseInt(this.wallet,16) ) {
        error = this.lang.validate.wallet.error
      } 

      if ( error ) {
        return this.$store.commit('showDialog', { text:error })
      }

      if ( this.initCaptchaFinish ) {
        this.captchaObj.verify();
      } else {
        this.initCaptcha();
      }

    },
    doRegister() {
      $.ajax({
        url:host+'/vtb/customer/login',
        data:{loginName:this.user, account:this.wallet},
        success:(resp)=>{
          // 已存在自动登录
          // if ( resp.state === 0 && resp.message==='Account has already existed' ) {
          //   return this.$store.commit('showDialog', { text:resp.message })
          // } else 
          if ( resp.state !== 1 ) {
            return this.$store.commit('showDialog', { text:resp.message })
          }
          let data = resp.data;
          this.$store.commit('showDialog', { text:this.lang.validate.login.success })
          this.$store.commit('setUserInfo', { user:this.user, wallet:this.wallet, ...data })
          this.$router.push('/account?lang='+(this.query.lang||this.$store.state.lang))
          window.localStorage.setItem('user', this.user)
          window.localStorage.setItem('wallet', this.wallet)
        }
      })
    },
  },
  mounted() {
    this.user = window.localStorage.getItem('user') || ''
    this.wallet = window.localStorage.getItem('wallet') || ''
  }
}
</script>
