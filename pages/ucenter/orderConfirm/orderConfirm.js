const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    try {
      var shippingId = wx.getStorageSync('shippingId');
      var shippingIndex = wx.getStorageSync('shippingIndex');
      if (shippingId) {
        this.setData({
          'shippingId': shippingId,
          'shippingIndex': shippingIndex
        });
      }

    } catch (e) {
      
    }
  },
    loadAddressData: function() {
      var that = this;
      var index = that.data.shippingIndex;
      util.request(api.ShippingSelect + '?shopId=' + "539dce6cf2a84e7f801539c2acf97abb" + "&pageNum=" + 1 + "&pageSize=" + 10).then(function (res) {
        console.log(res)
        if (res.data.status == 0) {
          wx.hideLoading()
          that.setData({
            addressList: res.data.data.list[index]
          })
        }

      });
    },
    loadProduct: function() {
      var that = this;
      util.request(api.GetCart + '?shopId=' + "539dce6cf2a84e7f801539c2acf97abb").then(function (res) {
        console.log(res.data.data.cartProductVoList)
        if (res.data.status == 0) {
          wx.hideLoading()
          that.setData({
            content: res.data.data.cartProductVoList,
            totalPrice: res.data.data.cartTotalPrice
          })

        }
      });
    },
    submit: function() {
      var shippingId = wx.getStorageSync('shippingId');
      
      util.request(api.OrderCreate + '?shopId=' + "539dce6cf2a84e7f801539c2acf97abb" + "&shippingId=" + shippingId).then(function (res) {
        console.log(res)
        if (res.data.status == 0) {
          wx.hideLoading();
          util.showSuccess();
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }, 1500)
        }
      });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      this.loadProduct();
      this.loadAddressData();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
  })