
<script>
// 引入request
import request from './utils/request.js'
export default {
  // 界面加载完毕
  mounted() {
    wx.login({
      success: async res => {
        // console.log('下面的是code码')
        // console.log(res)
        const code = res.code
        // 发送请求
        const result = await request('/getcode', { req: code })
        // 缓存当前的openid
        wx.setStorage({
          key: 'openid',
          data: {openid:result},
        })
      }
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
page
  width 100%
  height 100%
</style>