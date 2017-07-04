// pages/index/release/background/background.js
//获取应用实例
var app = getApp()
Page({
  data:{
    background: true,
    url:'',
    mode: 'center',
    canvas: {
      left: 0,
      top: 0,
      width: 100,
      height: 100,
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var sysInfo = app.globalData.sysInfo;
    const width = (675+2) * sysInfo.rpxTopx;
    const height = (390+2) * sysInfo.rpxTopx;
    const left = 37.5 * sysInfo.rpxTopx;
    const top = (sysInfo.windowHeight*0.9-height)/2;
    const baseWidth = sysInfo.windowWidth;
    const baseHeight = sysInfo.windowHeight*0.9;
    this.setData({
      scaleWidth: baseWidth,
      scaleHeight: baseHeight,
      canvas: {
        left: left,
        top: top,
        width: width,
        height: height,
      }
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
  chooseImage(sourceType){
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        that.setData({
          url: tempFilePaths[0],
          //background: false,
        })
        // wx.setNavigationBarTitle({
        //   title: '裁剪',
        // })
        app.globalData.release.background = tempFilePaths[0]
        wx.navigateBack({
          delta: 1, 
        })
        //that.cutImage(tempFilePaths)
      }
    })
  },
  albumImage(){
    this.chooseImage(['album'])
  },
  cameraImage(){
    this.chooseImage(['camera'])
  }
})