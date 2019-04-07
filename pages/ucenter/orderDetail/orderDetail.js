var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp()
Page({
  data: {
    orderId: 0,
    orderInfo: {},
    orderGoods: [],
    addressInfo: {},
    gStatus:0,
    url:app.globalData.url,
    orderNo:'',
    productDetailId:''
    
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.id
    });
    this.getOrderDetail();
    console.log(this.data.gStatus)
    console.log(this.data.oStatus)
  },
  getOrderDetail() {
    let that = this;
    let id = that.data.orderId;
    util.request(api.SelectOrderByNo +'?orderNo='+id).then(function (res) {
      wx.hideLoading()
      if (res.data.status == 0) {
        console.log(res.data.data);
        that.setData({
          orderInfo: res.data.data,
          oStatus: res.data.data.status,
          orderGoods: res.data.data.orderItemVoList,
          addressInfo: res.data.data.shippingVo
        });
        that.commentStatus(); //调用判断状态方法
        that.arrayValue();  //调用取数组字段值方法
        //that.payTimer();
      }
    });
  },
  //判断评价状态
  commentStatus() {
    var that = this;
    var oStatus = that.data.orderInfo.status;  //订单评价状态
    var gStatus = that.data.gStatus;  //商品评价状态

    console.log("订单评价状态" + oStatus)  //oStatus=4 订单未评价
    console.log("商品评价状态" + gStatus)  //gStatus=0 订单未评价

  },

  //取orderGoods数组字段值
  arrayValue(){
    let that = this;
    let orderGoods = that.data.orderGoods;
    console.log(orderGoods);

    for (let i = 0; i < orderGoods.length; i++){
      var orderNo = orderGoods[i].orderNo
      var productDetailId = orderGoods[i].productDetailId
      var gStatus = orderGoods[i].commentStatus
      that.setData({
        orderNo: orderNo,
        productDetailId: productDetailId,
        gStatus: gStatus
      })

    }
  },
  cancelOrder:function(){
    let id = this.data.orderId;
    util.request(api.OrderCancel + '?orderNo=' + id + "&shopId=" + "539dce6cf2a84e7f801539c2acf97abb").then(function (res) {
      wx.hideLoading()
      if (res.data.status == 0) {
        console.log(res);
        util.showSuccess();
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/ucenter/order/order',
          })

        }, 1500)
      }
    });
  },
  payTimer() {
    let that = this;
    let orderInfo = that.data.orderInfo;

    setInterval(() => {
      console.log(orderInfo);
      orderInfo.add_time -= 1;
      that.setData({
        orderInfo: orderInfo,
      });
    }, 1000);
  },
  payOrder() {
    console.log("支付！")
    // let that = this;
    // util.request(api.PayPrepayId, {
    //   orderId: that.data.orderId || 15
    // }).then(function (res) {
    //   if (res.errno === 0) {
    //     const payParam = res.data;
    //     wx.requestPayment({
    //       'timeStamp': payParam.timeStamp,
    //       'nonceStr': payParam.nonceStr,
    //       'package': payParam.package,
    //       'signType': payParam.signType,
    //       'paySign': payParam.paySign,
    //       'success': function (res) {
    //         console.log(res)
    //       },
    //       'fail': function (res) {
    //         console.log(res)
    //       }
    //     });
    //   }
    // });

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },


  
  //跳转评价页面
  toComment:function(){
    let that = this;
    let orderNo = that.data.orderNo; //需要传到添加评论页面的订单号
    let productDetailId = that.data.productDetailId; //需要传到添加评论页面的商品编号
    wx.navigateTo({
      url: '/pages/comment/comment?orderNo=' + orderNo + '&productDetailId=' + productDetailId,
    })

    

  }
})