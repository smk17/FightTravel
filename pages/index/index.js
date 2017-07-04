//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    scrollTop:0,
    type_list:[{
      id:0,
      name:"精选",
      select:true
    },{
      id:1,
      name:"附近",
      select:false
    },{
      id:2,
      name:"即刻出发",
      select:false
    },{
      id:3,
      name:"住游",
      select:false
    }],
    activity_list:[]
  },
  onLoad: function () {
    console.log('index-onLoad')
    var sysInfo = app.globalData.sysInfo;
    var tabHeight = 86 * sysInfo.rpxTopx;
    this.setData( {
      scrollHeight: sysInfo.windowHeight - tabHeight,
    })
    var activity_obj={
      id:0,
      icon:"/image/index_HL.png",
      title:"sengmitnick",
      desc:{
          icon:"https://dn-AMV4CnDb.qbox.me/45f473e02e9f6a07b92a.jpg",
          title:"夜爬白云山，sengmitnick强势归来",
          location:"广州 白云区",
          time:"2017/1/18 9:00",
          money:"免费"
        }
    }
    activity_obj.icon = "http://wx.qlogo.cn/mmopen/vi_32/qsaib8lVw4vZ0gQJ5wWbT69N8r0HibKPwkE5zjmteOSL7gTIZ3LvWcXApcnUMBic2t7ME2nlakal1XdtiaGa41xhfA/0";
    var list = []
    for(var i = 0; i < 10; i++){
      activity_obj.id = i;
      list.push(activity_obj);
    }
    this.setData({
      activity_list:list
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })

    setTimeout(function(){
      wx.hideToast()
    },2000)
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    console.log('index-onShow')
    this.setData( {
      city:app.globalData.city
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    console.log('index-onReady')
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    console.log('index-onHide')
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    console.log('index-onUnload')
  },
  onPullDownRefresh: function(){
    console.log('onPullDownRefresh', new Date())
  },
  tabtap(e){
    var id = e.currentTarget.id, list = this.data.type_list;
    for (var i = 0, len = list.length; i < len; ++i){
      list[i].select = false
    }
    list[id].select = true
    this.setData({
      scrollTop: 0,
      type_list: list
    })
  },
  loadMore(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })

    setTimeout(function(){
      wx.hideToast()
    },2000)
  },
  refesh(){
    
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })

    setTimeout(function(){
      wx.hideToast()
    },2000)
  },
  scroll(event){
    
  },
  switchcity(){
    wx.navigateTo({
      url: './switchcity/switchcity'
    })
  },
  publish(){
    if(app.globalData.user == null){
      wx.showModal({
        title: '请登录',
        content: '已登录用户才可以进行发布',
        confirmText: '登录',
        success: function(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/user/user',
            })
          }
        }
      })
      return;
    }
    wx.showActionSheet({
      itemList: ['拼游', '专游'],
      success: function(res) {
        console.log(res.tapIndex)
        wx.navigateTo({
          url: './release/release?type='+res.tapIndex
        })
      },
    })
  },
  onShareAppMessage: function () {
    return {
      title: '伴你同行',
      desc: '首页',
      path: '/page/index/index'
    }
  }
})
