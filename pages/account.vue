<style lang="less">
#page-account {
  // display:flex; flex-direction:column; min-height:calc(100% - 51px);
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
    @hei:36px;
    .top {
      display:flex; flex-direction:row; margin-bottom:20px;
    }
    .left {
      display:flex; flex-direction:column; margin-right:10px; width:120px; white-space:nowrap;
      text-align:center;
      h2 { display:flex; flex:1; align-items:center; justify-items:center; font-size:30px; }
      h2 span { display:block; flex:1; text-align:center; }
      .btn { height:@hei; line-height:@hei; }
    }
    .explain {
      // input { display:block; background:#fff;  }
      flex:1;
    }
    .inp-group {
      display:flex; margin:3px 15px; font-size:12px; color:#666;
      input { flex:1; width:0; padding:0 10px; height:@hei; background:#fff; color:inherit; }
      // &:last-child {
      //   // margin:0;
      //   input { width:70px; }
      // }
      .btn { 
        padding:0 10px; width:120px; height:@hei; line-height:@hei; 
        white-space:nowrap; font-size:12px; 
        border-top-left-radius:0;
        border-bottom-left-radius:0;
      }
    }
  }
  #award {
    .copy {
      display:flex; flex-direction:row; margin-top:10px;
      input { min-width:0; flex:1; padding-left:10px; color:#666;  }
      // .btn { color:inherit; }
    }
  }
  .flex-space { flex:1; }
  #footer { 
    // display:flex; flex-direction:row; justify-content:space-around; 
    // padding-left:0; padding-right:0;
    // display:flex; flex-direction:column; justify-content:center;
    ul { list-style:none;  margin:0 auto; width:250px; }
    // li { padding-left:20px; }
    // li p { display:inline-block; }
    .label { display:inline-block; width:70px; }
    // .left { margin-right: }
  }
}
@media screen and (min-width: 640px){
    #page-account #footer ul {
        width:350px;
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
      <div class="top">
        <div class="left">
          <h3>{{lang.balance.title}}</h3>
          <h2><span>&nbsp;{{userInfo.balance}} VTB</span></h2>
        </div>
        <div class="explain">
          {{lang.balance.explain}}
          <br>{{lang.verifyNote}}
        </div>
      </div>
      <div class="inp-group">
        <input id="mobile" type="text" :placeholder="lang.mobile.placeholder" v-model.trim="mobile" />
        <a href="javascript:void(0);" class="btn" :class="vfCodeButton.disabled?'disabled':'warning'" @click="receiveVfCode">{{vfCodeButton.text||lang.vfCodeButtonText}}</a>
      </div>
      <div class="inp-group">
        <input id="vfCode" type="text" :placeholder="lang.vfCode.placeholder" v-model.trim="vfCode" />
        <a href="javascript:void(0)" class="btn warning" @click="doWithdraw">{{lang.widthdraw.button}}</a>
      </div>
    </div>
    <div id="project" class="panel">
      <h3 class="text-center">{{lang.project.title}}</h3>
      <p>{{lang.project.explain}}</p>
    </div>
    <div id="award" class="panel">
      <h3 class="text-center">{{lang.award.title}}</h3>
      <p>{{lang.award.explain}}</p>
      <div class="copy">
        <input id="myRefCode" :value="inviteURL" readonly class="text-wallet" />
        <!-- <p class="text-wallet">{{inviteURL}}</p> -->
        <a id="copyMyRefCode" class="btn primary"
          data-clipboard-action="copy" data-clipboard-target="#myRefCode" @click="preventClick"
        >{{lang.award.btn}}</a>
      </div>
    </div>
    <div class="flex-space"></div>
    <div id="footer" class="panel">
      <h3 class="text-center">{{lang.community.title}}</h3>
      <ul>
        <li v-for="(item,i) in lang.community.list" :key="`c-${i}`">
          <span class="label">{{item.name}}</span>
          <a :href="item.link">{{item.link}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// let host = 'http://192.168.1.170:8008'
let host = 'http://47.89.11.105:8091'
let host2 = 'http://localhost:9977'
export default {
  fetch({store,redirect,query}) {
    if ( !store.state.userInfo ) {
      redirect(`/sign?lang=${(query.lang||store.state.lang)}`)
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
        en:{
          account: {
            logout:'Log Out',
          },
          balance: {
            title:'My VTB tokens',
            explain:`Join and share the $120K USD (30,0000VTB) Air Drop Activity Time:July 1th at 9:00 a.m. to July 7th at 24:00 p.m`,
          },
          project: {
            title:'VTB(Vehicle-to-Everything Blockchain)',
            explain:'is a self-governing V2X Blockchain network for Autonomous Driving and 5G Communication. Based on Blockchain technology, VTB has the capacity to digitalize V2X devices, which allows them to be authenticated, traded and consumed, and achieve a decentralized and autonomous operation.'
          },
          award: {
            title:'Invite your friend, earn VTB',
            explain:'You can refer your friends to earn 2 VTB tokens for each new user that you refer who submits Email and ETH address. You can refer up to 50 friends. To invite friends to participate in the VTB airdrop, follow the link below.',
            btn:'Copy',
            success:'Copy Successfully!'
          },
          mobile:{
            placeholder:'Phone number',
            empty:'Please input your phone number',
            error:'Invalid phone number',
            repeat:'The phone number has been used!',
            release:'Too much error. Your phone number is locked for 60 min.'
          },
          vfCode: {
            placeholder:'Verify code',
            empty:'Please input the verify code',
            error:'Invalid code',
            timeLimit:'Please withdraw VTB after July 8, 2018.',
            success:'Require successfully!',
          },
          widthdraw:{
            button:'Withdraw',
            success:'Thank you for submitting. We will tansfer VTB to your wallet in the next 3 weeks. Please check.',
            failure:'Withdraw failed!'
          },
          verifyNote:'Please input your phone number to receive the voice verify code',
          vfCodeButtonText:'vioce verify code',
          community:{
            title:'Join us',
            list:[{
              name:'Telegram',
              link:'https://t.me/VTB_blockchain',
            },{
              name:'Biyong',
              link:'https://0.plus/VTB_Blockchain',
            },{
              name:'website',
              link:'http://vtb.space'
            }]
          }
        },
        // ------------------------------- 中文
        zh:{
          account: {
            logout:'退出',
          },
          balance: {
            title:'我的VTB通证',
            explain:`参与空投活动，获取价值2美元通证
            活动时间：7月1日9时至7月7日24时
            限时空投价值12万美元通证`,
          },
          project: {
            title:'VTB (Vehicle-to-Everything Blockchain)',
            explain:'是面向自动驾驶、5G通讯的自治V2X区块链网络。基于区块链技术，可以实现V2X (Vehicle-to-Everything) 设备数字化，从而使其可以被确权、交易和消费，实现去中心化自主运作。'
          },
          award: {
            title:'邀请您的朋友获得2个VTB通证',
            explain:'将以下链接分享给您的50位朋友，每邀请一位获得2个VTB通证。',
            btn:'复制',
            success:'复制成功'
          },
           mobile:{
            placeholder:'手机号码',
            empty:'手机号码不能为空',
            error:'手机号格式错误',
            repeat:'手机号已绑定',
            release:'错误次数超过5次，锁定60分钟'
          },
          vfCode: {
            placeholder:'验证码',
            empty:'验证码不能为空',
            error:'验证码错误',
            timeLimit:'请在本次空投结束后（2018-7-8以后）提币。',
            success:'请求发送成功!'
          },
          widthdraw:{
            button:'提币',
            success:'如果成功，弹框提示。提交成功，我们将在3周内打币到您的钱包，请注意查收。',
            failure:'提币失败!'
          },
          verifyNote:'已使用邮箱注册的朋友，请添加手机号接受语音验证码',
          vfCodeButtonText:'语音验证码',
          community:{
            title:'欢迎加入项目社区交流',
            list:[{
              name:'Telegram',
              link:'https://t.me/VTB_blockchain',
            },{
              name:'币用',
              link:'https://0.plus/VTB_Blockchain',
            },{
              name:'项目网站',
              link:'http://vtb.space'
            }]
          }
        }
      },
      mobile:'',
      vfCode:'',
      vfCodeButton:{
        disabled:false,
        timer:-1,
        dura:60, // second
        text:'',
        textModel:'*s'
      },

      inviteURL:'',
      // wallet:'0xlsdkdkfkskfj1lskdjf',
      // inviteURL:'https://sdfsdfsdfsdsk.cosmshjsd.sofn?skfj=123l'
      // inviteURL:location.href+'&from=123'
      community:[{
        name:'Telegram',
        link:'https://t.me/VTB_blockchain',
      },{
        name:'币用',
        link:'https://0.plus/VTB_Blockchain',
      },{
        name:'项目网站',
        link:'vtb.space'
      }]
    }
  },
  computed: {
    lang() {
      return this.text[this.$store.state.lang];
      // return this.text.zh
    },
    userInfo() {
      return this.$store.state.userInfo || {
        balance:50,
        mobile:'1313131313',
      };
    }
  },
  methods: {
    logout() {
      this.$router.replace('/sign?lang='+this.query.lang||this.$store.state.lang)
    },
    initCopyEvent() {
      try {
        var clipboard1 = new Clipboard('#copyMyRefCode');
        clipboard1.on('success', (e)=>{
          // this.copy();
          // console.log('111111111');
          this.$store.commit('showDialog', {type:'success',text:this.lang.award.success});
          e.clearSelection();
        });
      } catch(e) {
        setTimeout(this.initCopyEvent, 300);
      }
    },
    preventClick(e) {
      e.preventDefault();
      // e.stopPropagation();
      // console.log('z')
    },
    receiveVfCode() {
      let button = this.vfCodeButton;
      if ( button.disabled ) return;

      let error = ''
      if ( !this.mobile ) {
        error = this.lang.mobile.empty
      } else if ( !/^(\+?\d{1,3} *)?\d+([\- ]\d+)*$/.test(this.mobile) ) {
        error = this.lang.mobile.error
      }
      if ( error ) {
        this.$store.commit('showDialog', {text:error})
        return
      }

      $.ajax({
          url: host+'/vtb/customer/sendSmsCode',
          dataType: 'json',
          data: {
            mobile:this.mobile,
            token:this.userInfo.token
          },
          success: (resp)=>{
            if ( resp.state === 0 ) {
              if ( resp.errorCode == 1020 ) {
                this.$store.commit('showDialog', {text:this.lang.vfCode.timeLimit})
              } else if ( resp.errorCode == 1030 ) {
                this.$store.commit('showDialog', {text:this.lang.mobile.repeat})
              } else if ( resp.errorCode == 1040 ) {
                this.$store.commit('showDialog', {text:this.lang.mobile.release})
              } else {
                this.$store.commit('showDialog', {text:resp.message})
              }
              return 
            }
            this.$store.commit('showDialog', {text:this.lang.vfCode.success})

          },
          error: ()=>{
            this.resetVfCodeCountdown();
          }
        });
      // ..
      button.disabled = true;
      this.vfCodeCountdown();
    },
    resetVfCodeCountdown() {
      let button = this.vfCodeButton;
      button.text  = '';
      button.timer = -1;
      button.dura  = 60;
      button.disabled = false;
    },
    vfCodeCountdown() {
      let button = this.vfCodeButton;
      if ( button.dura === 0 ) {
        this.resetVfCodeCountdown();
        return;
      }

      button.text=button.textModel.replace('*',button.dura--)
      clearTimeout( button.timer )
      button.timer = setTimeout(this.vfCodeCountdown, 1000)
    },
    doWithdraw() {
      let error = ''
      if ( !this.mobile ) {
        error = this.lang.mobile.empty
      } else if ( !/^(\+?\d{1,3} *)?\d+([\- ]\d+)*$/.test(this.mobile) ) {
        error = this.lang.mobile.error
      } else if ( !this.vfCode ) {
        error = this.lang.vfCode.empty
      }
      if ( error ) {
        this.$store.commit('showDialog', {text:error})
        return 
      }
      $.ajax({
        url: host+'/vtb/customer/bindMobile',
        dataType: 'json',
        data: {
          mobile:this.mobile,
          token:this.userInfo.token,
          code:this.vfCode
        },
        success: (resp)=>{
          if ( resp.state === 0 ) {
            // if ( resp.errCode == 1030 ) {
            //   this.$store.commit('showDialog', {text:this.lang.mobile.repeat})
            // } else {
            // }
            this.$store.commit('showDialog', {text:resp.message})
            return 
          }
          this.$store.commit('showDialog', {text:this.lang.widthdraw.success})
        },
        error: ()=>{
          this.resetVfCodeCountdown();
        }
      });
    }
  },
  // beforeCreate() {
  //   this.userInfo = {
  //     balance:2,
  //     inviteCode:'sdfkt',
  //     user:'xksdlf@qq.com',
  //     wallet:'0x44aef4165A48aA48b35fC81eB63fbf638938B0Fc'
  //   }
  // },
  mounted() {
    this.initCopyEvent();
    this.inviteURL = location.origin +
    '/sign?sign=up&lang='+(this.query.lang||this.$store.state.lang) +
    '&from='+this.userInfo.inviteCode

    // this.mobile = this.userInfo.mobile||''
  }
}
</script>

