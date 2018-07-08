
export default {
  install(Vue, defaultOptions = {}) {

    function aa(cp) {
      const CONSTRUCTOR = Vue.extend(cp)
    }


    Vue.aa = Vue.prototype.$aa = aa;

  }
}
