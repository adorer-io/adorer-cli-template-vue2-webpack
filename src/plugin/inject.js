
export default {
  install: ( Vue, options ) => {
    // 需要挂载的都放在这里
    Vue.prototype.$jump = function (title,path){
      window.history.pushState(null,title,path)
    }
  }
}
