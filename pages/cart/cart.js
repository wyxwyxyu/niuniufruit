const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAllSelect: '',               //是否全选
    totalMoney: 0, 
    number: 1, 
    selectFlag:false,               

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.loadData();
  },
  checekAllSelect:function(carts){
    var that =this;
    for (let i = 0; i < carts.length; i++){
       if(carts[i].checked==0){
         that.setData({
           isAllSelect:false
         })
         return;
       }
       that.setData({
         isAllSelect: true
       })
    } 
  },
  loadData:function(){
    var that = this;
    util.request(api.GetCart + '?shopId=' + "539dce6cf2a84e7f801539c2acf97abb").then(function (res) {
      console.log(res.data.data.cartProductVoList)

      if (res.data.status == 0) {
        wx.hideLoading()
        that.setData({
          carts: res.data.data.cartProductVoList,
          totalMoney: res.data.data.cartTotalPrice
        })
        that.checekAllSelect(that.data.carts)
      }
    });
  },
  //改变数量的接口
  updateCount:function(id,count){
    var that=this;
    util.request(api.CartCountUpdate + '?shopId=' + "539dce6cf2a84e7f801539c2acf97abb" + '&productDetailId=' + id + '&count=' + count).then(function (res) {
      console.log(res.data.data.cartProductVoList)

      if (res.data.status == 0) {
        wx.hideLoading()
        that.loadData()
      }
    });
   
  },
  cutNumber: function (e) {
    let id = e.target.dataset.id, index = e.target.dataset.index;
    var that = this;
    var count = that.data.carts[index].quantity -1;
    that.updateCount(id, count)
  },
  addNumber: function (e) {
    let id = e.target.dataset.id, index = e.target.dataset.index;
    var that=this;
    var count=that.data.carts[index].quantity+1;
    that.updateCount(id,count)
    
  },
  //勾选事件处理函数  
  switchSelect: function (e) { 
    // 获取item项的id，和数组的下标值
    this.data.selectFlag=false;  
    var Allprice = 0,i=0; 
    var that=this;
    let id = e.target.dataset.id, index = e.target.dataset.index; 
    this.data.carts[index].checked = !this.data.carts[index].checked; 
    console.log(this.data.carts[index].checked)
    var status ;
    if (this.data.carts[index].checked==true){
      status=1;
    } else { status = 0;}
      
    console.log(status)
    util.request(api.CartChecked + '?shopId=' + "539dce6cf2a84e7f801539c2acf97abb" + '&productDetailId=' + id +'&checkStatus='+status).then(function(res) {

      if (res.data.status == 0) {
        that.setData({
          selectFlag: true
        })
        that.loadData()

        
      }
    });
      },
//全选 
allSelect: function (e) { 
  //处理全选逻辑 
  let i = 0; 
  if (!this.data.isAllSelect) 
  { 
    for (i = 0; i < this.data.carts.length; i++) 
    {
      this.data.carts[i].checked = true; 
      var id = this.data.carts[i].productDetailId;
      var that=this;
      util.request(api.CartChecked + '?shopId=' + "539dce6cf2a84e7f801539c2acf97abb" + '&productDetailId=' + id + '&checkStatus=' + 1).then(function (res) {

        if (res.data.status == 0) {
          that.setData({
            selectFlag: true
          })
          that.loadData()
        }
      });

    } 
  }else 
    { 
      for (i = 0; i < this.data.carts.length; i++){ 
        this.data.carts[i].checked = false; 
        var id = this.data.carts[i].productDetailId;
        var that = this;
        util.request(api.CartChecked + '?shopId=' + "539dce6cf2a84e7f801539c2acf97abb" + '&productDetailId=' + id + '&checkStatus=' + 0).then(function (res) {

          if (res.data.status == 0) {
            that.setData({
              selectFlag: true
            })
            that.loadData()
          }
        });
      } 
    } 
    this.setData({ 
      carts: this.data.carts, 
      isAllSelect: !this.data.isAllSelect, 
      // totalMoney: this.data.totalMoney, 
    }) 
  },
  //去结算
  toBuy:function(){
    util.request(api.CartCountUpdate + '?shopId=' + "539dce6cf2a84e7f801539c2acf97abb" + '&productDetailId=' + id + '&count=' + count).then(function (res) {
      console.log(res.data.data.cartProductVoList)

      if (res.data.status == 0) {
        wx.hideLoading()
        that.loadData()
      }
    });
    wx.showToast({
      title: '去结算',
      icon:'success',
      duration:2000
    });
    this.setData({
      showDialog: !this.data.showDialog
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
  deltnum: function (e) {
    var index = e.currentTarget.dataset.index
    car.descrOne(index)
    this.renderCart()
  },
  addnum: function (e) {
    var index = e.currentTarget.dataset.index
    car.plusOne(index)
    this.renderCart()
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