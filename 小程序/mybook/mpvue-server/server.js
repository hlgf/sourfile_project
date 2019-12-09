// koa 搭建 服务器
// 引入Koa
let Koa = require('koa')
// 引入KoaRouter
let KoaRouter = require('koa-router')
// 实例化Koa
let koa = new Koa()
// 实例化KoaRouter
let koaRouter = new KoaRouter()
let datas = require('./datas/data.json')
// 引入fly
var Fly = require('flyio/src/node')
var fly = new Fly
// 定义接口
// ajax发送异步请求 http://localhost:4000/login?name=123
koaRouter.get('/', (ctx, next) => {
  // ctx可以获取调用接口的时候传入的参数数据(ctx同时也可以把数据响应回去),next就相当于放行
  const req = ctx.query.req
  console.log(req)
  // 响应相关的数据
  ctx.body = '真香'
})

// 登录的接口
koaRouter.get('/login', (ctx) => {
  console.log(ctx)
  const req = ctx.query.req
  console.log(req)
  ctx.body = { name: '小明', age: 18 }
})
// 获取商品的接口
koaRouter.get('/shops', (ctx) => {
  const sname = ctx.query.sname
  console.log(sname)
  ctx.body = [
    {
      name: '华哥',
      price: '0.08'
    },
    {
      name: '健哥',
      price: '8元'
    },
    {
      name: '杨哥',
      price: '0.01'
    }
  ]
})
// 搜索的接口
koaRouter.get('/search', (ctx) => {
  const req = ctx.query.req
  console.log(req)
  ctx.body = datas
})
// 需要定义一个获取openid的接口
koaRouter.get('/getcode', async (ctx) => {
  const code = ctx.query.req
  const appid = 'wx8dc92766a09575de'
  const secret = '8cc9978fb559e68c8b37ae4b71ee2788'
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
  // 自己的后台中向微信的服务器发送异步的请求,而且最好能够获取到有用数据信息
  const result = await fly.get(url)
  console.log(typeof result.data)
  const body = JSON.parse(result.data)
  // 最好不要把openid直接返回给界面,而是返回一个登陆的状态
  ctx.body = body.openid
})
// 使用koa的路由的相关的方法
koa
  .use(koaRouter.allowedMethods()) // 路由中所有的方法
  .use(koaRouter.routes()) // 所有的路由
// 监视对应的端口
koa.listen('4000', () => {
  console.log('服务器启动了')
  console.log('服务器的地址:http://localhost:4000')
})
