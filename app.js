//app.js
const AV = require('./libs/av-weapp-min.js');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //初始化应用FightTravel
    AV.init({ 
      appId: 'AMV4CnDb8RV9JtK1cVjt9w70-gzGzoHsz', 
      appKey: 'MBnjwLRPBFj1Rfx36z9Vw6pm', 
    });
    
    var sysInfo = wx.getSystemInfoSync();
    console.log(sysInfo);
    var rpxTopx = (sysInfo.windowWidth/750);
    this.globalData.sysInfo = {
      windowWidth: sysInfo.windowWidth,
      windowHeight: sysInfo.windowHeight,
      rpxTopx: rpxTopx,
    }
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.user){
      typeof cb == "function" && cb(this.globalData.user)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (userInfo) {
              AV.User.loginWithWeapp().then(user => {
                user.set(userInfo).setUsername(userInfo.userInfo.nickName).save().then(user => {
                  // 成功，此时可在控制台中看到更新后的用户信息
                  that.globalData.user = user.toJSON();
                  typeof cb == "function" && cb(that.globalData.user)
                }).catch(console.error);
              }).catch(console.error);
            },
            fail: function(error){
              console.log(error);
              typeof cb == "function" && cb(null)
            }
          })
        }
      })
    }
  },
  globalData:{
    user:null,
    appName:'伴你同行',
    city:"北京",
    sysInfo: {
      windowWidth: 0,
      windowHeight: 0,
      rpxTopx: 0,
    },
    release: {
      background:'',
      images: [],
    }
  }
})