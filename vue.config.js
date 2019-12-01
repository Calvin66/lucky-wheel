
module.exports = {
  devServer: {
    open: true
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer')(),
          require('postcss-px2rem')({
            rootValue: 37.5, // 基准值(计算公式：设计图宽度/10)，设计图尺寸为750X1134(iPhone6)，基准值为750/10=75
            propList: ['*']
          })
        ]
      }
    }
  }
};
