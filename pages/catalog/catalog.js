var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    categoryList: [],
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0,
    url: app.globalData.url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getCatalog();
    var that = this;
    wx.request({
      url: 'http://192.168.1.103:8080/category/' + 'selectCategoryByParentId.do?parentId=' + 'root',
      method: "POST",
      header: {
        "content-type": "application/json",
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          item: res.data.data
        })
      }
    })
  },
  getCatalog: function () {
    //CatalogList
    let that = this;
    util.request(api.CatalogList).then(function (res) {
      that.setData({
        navList: res.data.categoryList,
        currentCategory: res.data.currentCategory
      });
      wx.hideLoading();
    });
    util.request(api.GoodsCount).then(function (res) {
      that.setData({
        goodsCount: res.data.goodsCount
      });
    });

  },
  getCurrentCategory: function (id) {
    let that = this;
    util.request(api.CatalogCurrent, { id: id })
      .then(function (res) {
        that.setData({
          currentCategory: res.data.currentCategory
        });
      });
  },
  getList: function () {
    var that = this;
    util.request(api.ApiRootUrl + 'api/catalog/' + that.data.currentCategory.cat_id)
      .then(function (res) {
        that.setData({
          categoryList: res.data,
        });
      });
  },
  switchCate: function (event) {
    var that = this;
    console.log(e.currentTarget)
    var categoryId = e.currentTarget.dataset.id;
    this.setData({
      categoryId: categoryId
    });
    wx.request({
      url: 'http://192.168.1.103:8080/product/getProductByKeywordOrCategory.do?categoryId=' + categoryId,
      method: "POST",
      header: { "content-type": 'application/x-www-form-urlencoded' },  //发送数据
      success: function (res) {
        console.log(res);
        that.setData({
          categoryList: res.data.data.list
        })
      }
    })
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

  },
  switchCate: function (e) {
    var that = this;
    console.log(e.currentTarget)
    var categoryId = e.currentTarget.dataset.id;
    this.setData({
      categoryId: categoryId
    });
    wx.request({
      url: 'http://192.168.1.103:8080/product/getProductByKeywordOrCategory.do?categoryId=' + categoryId,
      method: "POST",
      header: { "content-type": 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res);
        that.setData({
          categoryList: res.data.data.list
        })
      }
    })

  }
})