const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
    
  },
  loadData: function () {
    var that = this;
    util.request(api.ShippingSelect + '?shopId=' + "539dce6cf2a84e7f801539c2acf97abb" + "&pageNum=" + 1 +"&pageSize="+10).then(function (res) {
      console.log(res)
      if (res.data.status == 0) {
        wx.hideLoading()
        that.setData({
          addressList: res.data.data.list
        })
      }
    });
  },
  delAddress:function(e){
    var id=e.currentTarget.dataset.id;
    var that=this;
console.log(id)
    util.request(api.ShippingDelete + '?shippingId=' + id).then(function (res) {
      console.log(res)
      if (res.data.status == 0) {
        wx.hideLoading()
        util.showSuccess()
        setTimeout(function () {
          that.loadData();
        }, 1500)
        
      }
    });
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
    this.onLoad();
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
    
  },


  //添加新地址

  addNew:function(){
    wx.navigateTo({
      url:'/pages/address/addAddress/addAddress',
    });
  },

  
})