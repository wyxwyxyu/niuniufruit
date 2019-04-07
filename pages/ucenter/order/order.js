const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    navbar: ['全部', '待付款','待拣货','待发货','待收货'],
    currentTab: 0,
    content:[],
    statusList: ['待支付', '待拣货','待发货','待收货','交易完成','已取消']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData(10)
  },
  loadData:function(status){
    var that=this;
    util.request(api.SelectOrder + '?shopId=' + "539dce6cf2a84e7f801539c2acf97abb" + '&orderStatus=' + status).then(function (res) {
      console.log(res)
      wx.hideLoading()
      if (res.data.status == 0) {
        that.setData({
          content: res.data.data
        });
        console.log(that.data.content)
      }
    });

  },
  navbarTap: function (e) {
    var choice = e.currentTarget.dataset.idx
    if(choice==0){
      this.loadData(10)
    }else if(choice==1){
      this.loadData(0)
    } else if (choice == 2) {
      this.loadData(1)
    } else if (choice == 3) {
      this.loadData(2)
    } else if (choice == 4) {
      this.loadData(3)
    } 
    this.setData({
      currentTab: choice
    })
  },
  toOrderDetail:function(e){
console.log(e)
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