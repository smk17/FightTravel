// pages/user/proof/proof.js
Page({
  data:{
    proofinfo:{},
    proof_list:[
      {
        id:0,
        icon:"/image/index_HL.png",
        title:"陆sir",
        qrcode: "564756758976",
        applicant:"张润胜(18027128600)",
        desc:{
          icon:"https://dn-amv4cndb.qbox.me/74dec3ef3476b7065aa5.png",
          title:"夜爬白云山，陆sir强势归来",
          location:"广东广州市白云山正门",
          time:"2017/1/18 9:00",
          money:"免费"
        },
        status:0,
        type:"拼游"
      },
      {
        id:1,
        icon:"/image/index_HL.png",
        title:"广州老油条",
        qrcode: "756667678997",
        applicant:"张润胜(18027128600)",
        desc:{
          icon:"https://dn-amv4cndb.qbox.me/74dec3ef3476b7065aa5.png",
          title:"玩遍广州",
          location:"广东深圳市梅林关民乐翠园",
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
    var list=this.data.proof_list;
    this.setData({
      proofinfo: list[options.proofinfo]
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
  }
})