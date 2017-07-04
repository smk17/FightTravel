// pages/index/release/release.js
//获取应用实例
var app = getApp()
Page({
  data:{
    type: "旅游",
    appName:'',
    type_index: 0,
    type_array: ['自驾游','住游'],
    //backgroundUrl: 'https://dn-amv4cndb.qbox.me/867e8ccea5709534e818.png',
    backgroundUrl: '',
    descriptionAutoHeight: false,
    isShowSite: false,
    site: "",
    start_date: '2016-09-01',
    start_time: '12:01',
    end_date: '2016-09-01',
    end_time: '12:01',
    location: '',
    position: '',
    TextArea: ''
  },
  TextAreaHeight: 100,
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var itemList = ['拼游', '专游'];
    var title = "发布" + itemList[options.type]
    wx.setNavigationBarTitle({
      title: title
    })
    var da = Date.now()
    da = new Date(da);
    var data = da.getFullYear()+'-';
    if (da.getMonth() >= 10){
      data = data+da.getMonth()+'-';
    }else {
      data = data+'0'+da.getMonth()+'-';
    }
    if (da.getDate() >= 10){
      data = data+da.getDate();
    }else {
      data = data+'0'+da.getDate();
    }
    var time = '';
    if (da.getHours() >= 10){
      time = time+da.getHours()+':';
    }else {
      time = time+'0'+da.getHours()+':';
    }
    if (da.getMinutes() >= 10){
      time = time+da.getMinutes();
    }else {
      time = time+'0'+da.getMinutes();
    }
    var sysInfo = app.globalData.sysInfo;
    var rpxTopx = sysInfo.rpxTopx;
    this.TextAreaHeight = 300 * rpxTopx;
    this.setData({
      type: itemList[options.type],
      appName: app.globalData.appName,
      start_date: data,
      start_time: time,
      end_date: data,
      end_time: time
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var backgroundUrl = app.globalData.release.background
    this.setData({
      backgroundUrl: backgroundUrl,
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindStartDateChange: function(e) {
    this.setData({
      start_date: e.detail.value
    })
  },
  bindStartTimeChange(e){
    this.setData({
      start_time: e.detail.value
    })
  },
  bindEndDateChange: function(e) {
    this.setData({
      end_date: e.detail.value
    })
  },
  bindEndTimeChange(e){
    this.setData({
      end_time: e.detail.value
    })
  },
  bindTextAreaBlur: function(e) {
    
    console.log(e.detail.value)
  },
  bindTextAreaFocus(e){

  },
  bindTextAreaLineChange: function(e) {
    var height = e.detail.height;
    if (height >= this.TextAreaHeight){
      this.setData({
        descriptionAutoHeight: true
      })
    }else{
      this.setData({
        descriptionAutoHeight: false
      })
    }
  },
  bindTypeTimeChange(e){
    this.setData({
      type_index: e.detail.value
    })
  },
  selectSite(){
    var isShowSite = this.data.isShowSite
    this.setData({
      isShowSite: !isShowSite
    })
  },
  recommendChange(e){

  },
  agreeChange(e){
    
  },
  chooseLocation(){
    const that = this;
    wx.chooseLocation({
      success: function(res){
        var address = res.address;
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&location=' + res.latitude + ',' + res.longitude + '&output=json&pois=1', 
          data: {},
          header: { 'Content-Type': 'application/xml'},  
          dataType:'json', 
          success: function(ops){
            console.log(ops)
            var city = ops.data.result.addressComponent.city;
            var province = ops.data.result.addressComponent.province;
            var district = ops.data.result.addressComponent.district;
            that.setData({
              isShowSite: true,
              location: province+' '+city+' '+district,
              site: address,
            })
          },
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  bingScan(){
    let type = this.data.type
    wx.showModal({
      title: '扫描二维码',
      content: '扫描xxx.com中的二维码，可在网页编辑并发布'+type,
      success: function(res) {
        if (res.confirm) {
          wx.scanCode({
            success: function(res){
              console.log(res)
            },
          })
        }
      }
    })
  },
  formSubmit: function(e) {
    var obj = e.detail.value;
    var id = e.detail.target.id;
    console.log(e);
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let url = '?theme='+obj.input_theme+'&protocol='+obj.checkbox_protocol+'&start_date='+obj.picker_start_date+'&start_time='+obj.picker_start_time+'&end_date='+obj.picker_end_date+'&end_time='+obj.picker_end_time+'&type_index='+obj.picker_type_index+'&recommend='+obj.switch_recommend+'&textarea='+obj.textarea;
    if (id=='preview'){
      wx.navigateTo({
        url: 'preview/preview' + url,
      })
    }else{
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    }
  },
})