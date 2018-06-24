
export default {
  install(Vue, defaultOptions = {}) {
    console.log(1111);

    function aa(cp) {
      const CONSTRUCTOR = Vue.extend(cp)
    }


    Vue.aa = Vue.prototype.$aa = aa;

  }
}
