// pages/user/userinfo/bindMobilePhoneNumber/bindMobilePhoneNumber.js
const AV = require('../../../../libs/av-weapp-min.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codename: '获取验证码',
    phone: '',
    countdown: '',
    codeDisabled: true,
    submitDisabled: true,
    opacity: 0,
    message: '手机号不正确'
  },

  /**
  * 显示Toast
  * message， 显示你要提示的内容
 **/
  drawToast(message) {
    var that = this
    this.setData({
      opacity: 0.7,
      message: message,
    })
    setTimeout(function () {
      that.setData({
        opacity: 0,
      })
    }, 1000)
  },

  onInputPhone(event){
    var disabled = true
    var  that = this
    if (event.detail.value.match(/0?(13|14|15|18|17)[0-9]{9}/)){
      disabled = false
    } else if (event.detail.value.length >= 11){
      this.drawToast('请输入正确的手机号')
    }
    this.setData({
      phone: event.detail.value,
      codeDisabled: disabled,
    })
  },

  onInputCode(event){
    var disabled = true
    if (event.detail.value.length >= 6) {
      disabled = false
    }
    this.setData({
      submitDisabled: disabled,
    })
  },

  onGetCode(){
    var phone = this.data.phone
    var that = this
    this.setData({
      codename: '重新获取验证码',
      countdown: '(300s)',
      codeDisabled: true,
    })
    var countdown = 300
    var codeInterval = setInterval(function(){
      countdown--
      if (countdown <= 0){
        clearInterval(codeInterval)
        that.setData({
          countdown: '',
          codeDisabled: false,
        })
      } else {
        that.setData({
          countdown: '(' + countdown + 's)',
        })
      }
    }, 1000)
    // 小程序登录
    AV.User.loginWithWeapp().then(user => {
      // 设置并保存手机号
      user.setMobilePhoneNumber(phone);
      return user.save();
    }).then(user => {
      // 发送验证短信
      return AV.User.requestMobilePhoneVerify(user.getMobilePhoneNumber());
    }).catch(console.error);
  },

  formSubmit(event){
    var value = event.detail.value
    var formId = event.detail.formId
    var that = this
    AV.User.verifyMobilePhone(value.code).then(function () {
      //验证成功
      that.drawToast('绑定成功')
      var paramsJson = {
        template_id: '9ggg9If6Edsk-xjKw1ek6Nd2XUwMrWKXevYB5QLgRIM',
        form_id: formId,
        page: '',
        data: {
          "keyword1": {//用户名
            "value": app.globalData.user.userInfo.nickName,
            "color": "#173177"
          },
          "keyword2": {//手机号
            "value": value.phone,
            "color": "#173177"
          },
          "keyword3": {
            "value": "绑定手机号成功",
            "color": "#173177"
          },
          "keyword4": {//绑定时间
            "value": new Date().toLocaleString(),
            "color": "#173177"
          }
        },
        emphasis_keyword: ''
      };
      AV.Cloud.run('postNotification', paramsJson).then(function (data) {
        // 调用成功，得到成功的应答 data
        console.log(data)
      }, function (err) {
        console.log(err)
      });
    }, function (err) {
      //验证失败
      that.drawToast('请输入正确的验证码')
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})