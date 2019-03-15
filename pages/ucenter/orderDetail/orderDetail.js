var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp()
Page({
  data: {
    orderId: 0,
    orderInfo: {},
    orderGoods: [],
    addressInfo: {},
    url:app.globalData.url
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.id
    });
    this.getOrderDetail();
  },
  getOrderDetail() {
    let that = this;
    let id = that.data.orderId;
    util.request(api.SelectOrderByNo +'?orderNo='+id).then(function (res) {
      wx.hideLoading()
      if (res.data.status == 0) {
        console.log(res);
        that.setData({
          orderInfo: res.data.data,
          orderGoods: res.data.data.orderItemVoList,
          addressInfo: res.data.data.shippingVo
        });
        //that.payTimer();
      }
    });
  },
  cancelOrder:function(){},
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
  }
})