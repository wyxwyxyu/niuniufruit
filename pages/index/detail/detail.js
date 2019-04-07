const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    url: app.globalData.url,
    postage: 39,
    currentSpec: 0,
    number: 1,
    productDetailId:'',
    noCollectImage: "../../../imgs/icon/icon_collect.png",
    hasCollectImage: "../../../imgs/icon/icon_collect_checked.png",
    collectBackImage: "../../../imgs/icon/icon_collect.png"
  },
  onLoad: function (option) {
    var that = this
    var pid = option.pid
    util.request(api.GetProductDetail + '?productId=' + pid).then(function (res) {
      console.log(res.data.data)
      let imgGroup = util.cutString(res.data.data.subImages)
      wx.hideLoading()
      if (res.data.status == 0) {
        that.setData({
         detail: res.data.data,
         productDetailId: res.data.data.productDetailList[0].productDetailId,
         imgGroup: imgGroup
        });
        let content = that.escape2Html(that.data.detail.detail)
        content.replace('<img', '<img style="width:100%;height:auto" ')
        that.setData({
          content:content
        })
      }
    });
  },
  selectspec: function (e) {
    var index = e.currentTarget.dataset.index
    this.data.productDetailId = this.data.detail.productDetailList[index].productDetailId
    this.setData({
      currentSpec: index
    })
  },
  escape2Html: function (str) {
    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      } 
    });
  },
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    var detail=this.data.detail;
    var currentSpec = this.data.currentSpec;
    this.setData({
      number: (this.data.number + 1 <detail.productDetailList[currentSpec].stock) ? this.data.number + 1 : detail.productDetailList[currentSpec].stock
    });
  },
  //添加至购物车
 
  //关于收藏按钮
  closeAttrOrCollect: function () {
    let that = this;
    if (this.data.openAttr) {
      this.setData({
        openAttr: false,
      });
      if (that.data.userHasCollect == 1) {
        that.setData({
          'collectBackImage': that.data.hasCollectImage
        });
      } else {
        that.setData({
          'collectBackImage': that.data.noCollectImage
        });
      }
    } else {
      //添加或是取消收藏
      // util.request(api.CollectAddOrDelete, { typeId: 0, valueId: this.data.id }, "POST")
      //   .then(function (res) {
      //     let _res = res;
      //     if (_res.errno == 0) {
      //       if (_res.data.type == 'add') {
      //         that.setData({
      //           'collectBackImage': that.data.hasCollectImage
      //         });
      //       } else {
      //         that.setData({
      //           'collectBackImage': that.data.noCollectImage
      //         });
      //       }

      //     } else {
      //       wx.showToast({
      //         image: '/static/images/icon_error.png',
      //         title: _res.errmsg,
      //         mask: true
      //       });
      //     }

      //   });
    }

  },
  //加入购物车
  addToCart: function () {
    var id = this.data.productDetailId
    console.log()
    var count = this.data.number
    util.request(api.CartAdd + '?shopId=' + "539dce6cf2a84e7f801539c2acf97abb" + '&productDetailId=' + id + '&count=' + count).then(function (res) {
      console.log(res.data.data)
      wx.hideLoading()
      if (res.data.status == 0) {
        wx.showLoading({
          title: '添加成功',
          icon: 'success',
          duration: 500
    })
      }
    });
    // proItem.activeStandard = proItem.productDetailList[currentSpec]
    // proItem.price = proItem.productDetailList[currentSpec].price
    // proItem.count=count;
    // console.log(proItem)
    // car.join(proItem)
    // wx.showLoading({
    //   title: '加入成功',
    //   icon: 'success',
    //   duration: 1000
    // })
  }
})

