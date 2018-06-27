<style>
  html, body,#__layout, #__nuxt { height:100%; }
  #page-root { min-height:100%; }
  #topbar { text-align:right; color:#aaa; }
  #topbar a { display:inline-block; }
  #topbar #lang { padding:15px 20px; }
</style>


<template>
  <div id="page-root" class="flex flex-dir-col">
    <div id="topbar">
      <a id="lang" href="javascript:void(0)" @click="changeLang">
        {{!$store.state.lang||$store.state.lang==='zh'?'English':'中文'}}
      </a>
    </div>
    <nuxt/>
    <div id="dialog" class="flex-1" :class="dialog.show?'fadeIn':'fadeOut'">
      <div class="outer-wrapper">
        <div class="inner-wrapper">
          {{dialog.text}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import url from 'url';
export default {
  data() {
    return {

    }
  },
  computed: {
    dialog() {
      return this.$store.state.dialog;
    }
  },
  methods: {
    changeLang() {
      let currLang = this.$store.state.lang;
      let nextLang = currLang==='zh' || currLang===''?'en':'zh';
      let search   = location.search;
      this.$store.commit('setLanguage', nextLang);

      if ( search ) {
        if ( search.indexOf('lang=') > 0 ) {
          search = search.replace(/lang\=[ec]n/g, 'lang='+nextLang)
        } else {
          search += '&lang='+nextLang;
        }
      } else {
        search = '?lang='+nextLang;
      }
      this.$router.replace({path:location.pathname+search});
    },
    submitUserInfo() {

    }
  },
}
</script>

