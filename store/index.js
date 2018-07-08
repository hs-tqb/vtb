import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// window.fetch() 的 Polyfill
// require('whatwg-fetch')

const store = () => new Vuex.Store({
  state: {
    lang:'zh',
    userInfo:null,
    userCandy:null,
    dialog: {
      show:false,
      text:'',
      delay:3000,
      timer:-1,
    }
  },
  mutations: {
    setLanguage(state, lang) {
      state.lang = lang;
    },
    setUserInfo(state, obj) {
      state.userInfo = obj;
    },
    setUserCandy(state, obj) {
      state.userCandy = obj;
    },
    showDialog(state, obj) {
      let dialog = state.dialog;
      clearTimeout(dialog.timer);
      dialog.timer = setTimeout(()=>{
        dialog.show = false;
      }, obj.delay||dialog.delay);
      dialog.text = obj.text;
      dialog.show = true;
    }
  }
})

export default store
