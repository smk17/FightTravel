// pages/index/release/background/library/library.js
//获取应用实例
var app = getApp()
const AV = require('../../../../../libs/av-weapp-min.js');
Page({
  data:{
    width: 90,
    height: 52,
    images: [],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    var sysInfo = app.globalData.sysInfo;
    let width = (sysInfo.windowWidth-(120*sysInfo.rpxTopx))/3
    let height = (26*width)/45

    this.setData({
      width: width,
      height: height,
    })

    var images = app.globalData.release.images;
    if (images.length == 0) {
      var cql = 'select include poster,* from PosterLibrary';
      var that = this
      AV.Query.doCloudQuery(cql).then(function (data) {
        // results 即为查询结果，它是一个 AV.Object 数组
        var results = data.results;
        var count = results.length;
        var images = []
        for(var i = 0; i < count; ++i){
          var obj = results[i];
          var file = obj.get('poster');
          var url = file.url();
          images.push(url);
        }
        app.globalData.release.images = images;
        that.setData({
          images: images,
        })
        wx.hideToast()
      }, function (error) {
        console.log(error);
        wx.hideToast()
      });
    }else{
      this.setData({
        images: images,
      })
      wx.hideToast()
    }

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  previewImage(e){
    let images = this.data.images;
    let index = e.currentTarget.id;
    console.log(index)
    wx.navigateTo({
      url: 'previewImage/previewImage?index='+ index,
    })
  }
})