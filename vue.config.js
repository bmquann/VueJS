const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  resolve: {
    alias: {
       vue: 'vue/dist/vue.js'
    }
  }

})
