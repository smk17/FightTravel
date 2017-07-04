// pages/index/release/background/library/previewImage/previewImage.js
//获取应用实例
var app = getApp()
Page({
  data:{
    index: 0,
    windowHeight: 100,
    images: [],
    slide: {
      width: 90,
      height: 52,
      margintop: 100,
      btnmargintop: 100,
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let index = options.index;
    var sysInfo = app.globalData.sysInfo;
    var height = (sysInfo.windowWidth*26)/45;
    var margintop = (sysInfo.windowHeight-height)/2;
    var btnmargintop = (sysInfo.windowHeight-(margintop+height))-(120*sysInfo.rpxTopx);
    var images = app.globalData.release.images;

    this.setData({
      index: index,
      windowHeight: sysInfo.windowHeight,
      images: images,
      slide: {
        width: sysInfo.windowWidth,
        height: height,
        margintop: margintop,
        btnmargintop: btnmargintop,
      }
    })
    wx.setNavigationBarTitle({
      title: (parseInt(index)+1)+'/'+images.length,
    })
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
  bindSwiperChange(e){
    console.log(e)
    let index = e.detail.current;
    let length = this.data.images.length;
    this.setData({
      index: index,
    })
    wx.setNavigationBarTitle({
      title: (index+1)+'/'+length,
    })
  },
  bindAddBackground(e){
    console.log(e)
    let index = e.currentTarget.id;
    let images = this.data.images;
    app.globalData.release.background = images[index]
    wx.navigateBack({
      delta: 3, 
    })
  }
})