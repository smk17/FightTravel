// pages/index/release/cost/cost.js
var app = getApp()
Page({
  data:{
    icon_size: 32,
    tap: '',
    refunds: '',
    cost_index: 1,
    cost_array_max: 10,
    cost_delete_array: [],
    cost_array: [{id:0,money:""}],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var rpxTopx = app.globalData.sysInfo.rpxTopx
    this.setData({
      icon_size: 32*rpxTopx,
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
  formSubmit(e){
    console.log(e.detail.value);
  },
  bindMoneyInput(e){
    var money = e.detail.value;
    const id = e.currentTarget.id;
    var array = this.data.cost_array;
    var value = "";
    if(money == ""){
      //refunds
      for (var i = 0;i < array.length; i++) {
        var item = array[i];
        if("money_"+item.id == id){
          continue ;
        }
        if (item.money != ""){
          return ;
        }
      }
      this.setData({
        tap: "",
        refunds: ""
      })
      return ;
    }else{
      var value=Math.round(parseFloat(money)*100)/100;
      if (isNaN(value))
        value =  "";
      else if(value > 10000){
        wx.showToast({
          title: '金额请在10000.0以内',
          duration: 2000
        })
        value = "10000.00";
      }
      this.setData({
        tap: "tap",
        refunds: "不支持退款"
      })
    }
    return value;
  },
  bindMoneyBlur(e){
    var money = e.detail.value;
    const id = e.currentTarget.id;
    var array = this.data.cost_array;
    var value = "";
    if(money != ""){
      value=Math.round(parseFloat(money)*100)/100;
      var xsd=value.toString().split(".");
      if(xsd.length==1){
        value=value.toString()+".00";
      }
      if(xsd.length>1){
        if(xsd[1].length<2){
          value=value.toString()+"0";
        }
      }
    }
    for (var i = 0;i < array.length; i++) {
      var item = array[i];
      if ("money_"+item.id == id){
        array[i].money = value;
      }
    }
    this.setData({
      cost_array: array
    })
  },
  delete_obj(e){
    var array = this.data.cost_array;
    if (array.length <= 1)
      return;
    const id = parseInt(e.currentTarget.id);
    var delete_array = this.data.cost_delete_array;
    var new_array = new Array();
    
    for (var i = 0;i < array.length; i++) {
      var item = array[i];
      if (item.id == id){
        delete_array.push(item);
      }else{
        new_array.push(item);
      }
    }
    
    this.setData({
        cost_array: new_array,
        cost_delete_array: delete_array,
    })
  },
  addobj(e){
    var cost_array_max = this.data.cost_array_max;
    var array = this.data.cost_array;
    var delete_array = this.data.cost_delete_array;
    if (array.length >= cost_array_max)
      return;
    var index = array[array.length - 1].id + 1;
    var new_array_item = {id:index};
    if (delete_array.length >= 1){
      new_array_item = delete_array[0];
      delete_array.shift();
    }
    array.push(new_array_item);
    this.setData({
        cost_array: array,
        cost_delete_array: delete_array,
    })
  },
  bindrefunds(){
    if(this.data.refunds == "")
      return;
    wx.navigateTo({
      url: 'refunds/refunds'
    })
  }
})