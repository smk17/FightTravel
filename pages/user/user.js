// pages/user/user.js
//获取应用实例
var app = getApp()
Page({
  data:{
    isLogin: false,
    loading: false,
    userInfo: {},
    proof_list:[
      {
        id:0,
        icon:"http://wx.qlogo.cn/mmopen/vi_32/qsaib8lVw4vZ0gQJ5wWbT69N8r0HibKPwkE5zjmteOSL7gTIZ3LvWcXApcnUMBic2t7ME2nlakal1XdtiaGa41xhfA/0",
        title:"sengmitnick",
        qrcode: "564756758976",
        desc:{
          icon:"https://dn-AMV4CnDb.qbox.me/45f473e02e9f6a07b92a.jpg",
          title:"夜爬白云山，陆sir强势归来",
          time:"2017/1/18 9:00",
          money:"免费"
        },
        status:0,
        type:"拼游"
      },
      {
        id:1,
        icon:"http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erXiavprAMVxichACSicUaic4jYBJgBxcIgWVcboNqahicXoib1hbxFgnBGEAQJbk6sjQPnrvENHKyBbTlA/0",
        title:"钢",
        qrcode: "756667678997",
        desc:{
          icon:"https://dn-AMV4CnDb.qbox.me/45f473e02e9f6a07b92a.jpg",
          title:"玩遍广州",
          time:"2017/1/18 9:00",
          money:"￥500"
        },
        status:1,
        type:"专游"
      }
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    try {
      var isLogin = wx.getStorageSync('isLogin')
      if (isLogin) {
        wx.showLoading({
          title: '登录中',
        })
        that.login()
      }
    } catch (e) {
    }
  },
  login:function(){
    this.setData({
      loading: true,
    })
    wx.showNavigationBarLoading()
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(user){
      //更新数据
      wx.hideNavigationBarLoading()
      wx.hideLoading()
      if (user == null) {
        that.setData({
          loading: false,
        })
        return
      }
      that.setData({
        isLogin: true,
        loading: false,
        userInfo:user.userInfo
      })
      wx.setStorage({
        key: "isLogin",
        data: true
      })
    })
  },
  onLogin(){
    wx.navigateTo({
      url: './userinfo/userinfo',
    })
  },
  proofdesc:function(e){
    var id = e.currentTarget.id, list=this.data.proof_list;
    console.log(list[id]);
    wx.navigateTo({
      url: './proof/proof?proofinfo=' + id
    })
  },
  onPullDownRefresh: function(){
    console.log('onPullDownRefresh', new Date())
  }
})