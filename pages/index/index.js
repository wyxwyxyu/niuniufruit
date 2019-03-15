const util = require('../../utils/util.js');
const api = require('../../config/api.js');
//const user = require('../../services/user.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    //tab: [{ name: 'list1' }, { name: 'list2' }, { name: 'list2' }, { name: 'list2' }],
    maskable: false,
    popup: false,
    popspec: true,
    currrntSpec: 0,
    currentC: 0,
  },

  getIndexData:function () {
    let that = this;
    this.data.isGetdata=false;
    util.request(api.GetRootCategory).then(function (res) {
      console.log(res)
      wx.hideLoading()
      if (res.data.status == 0) {        
        that.setData({
          tab:res.data.data,
          cid: res.data.data[0].categoryId
        });
      }
    });
  },
  
  onLoad: function (options) {
    let that = this;
    this.data.isGetdata = false;
    util.request(api.GetRootCategory).then(function (res) {
      console.log(res)
      wx.hideLoading()
      if (res.data.status == 0) {
        that.setData({
          tab: res.data.data,
          cid: res.data.data[0].categoryId,
        });
        util.request(api.GetProductByCategory + '?categoryId=' + that.data.cid).then(function (res) {
          wx.hideLoading()
          if (res.data.status == 0) {
            that.setData({
              products: res.data.data.list
            });
          }
        }); 
      }
    });  
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
  tapchangge: function (ev) {
    var currentC = ev.currentTarget.id; 
    var that=this;
    var pid = that.data.tab[currentC].categoryId;
    console.log(pid)
    util.request(api.GetProductByCategory + '?categoryId=' + pid).then(function (res) {
      wx.hideLoading()
      console.log(res.data.data.list)
      if (res.data.status == 0) {
        that.setData({
          products: res.data.data.list
        });
      }
    });   
    that.setData({
      currentC: currentC
    })
  },
  swiperchange: function (ev) {
    console.log("triggeer")
    var currentC = ev.detail.current;
    console.log(currentC)
    var that=this;
    
    
    that.setData({
      currentC: currentC
    })
    that.loadframe(currentC)
  },
  addcart: function (e) {
    var index = e.currentTarget.dataset.index
    var currentC = this.data.currentC
    this.setData({
      currentEq: index,
      popspec: false,
      maskable: true
    })
  },
  selectspec: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      currrntSpec: index
    })
  },
  joinCart: function (e) {
    var tab = this.data.tab
    var currrntSpec = this.data.currrntSpec
    var currentC = this.data.currentC
    var currentEq = this.data.currentEq
    var preCar = tab[currentC].productlist[currentEq]
    preCar.activeStandard = preCar.standardlist[currrntSpec]
    car.join(preCar)
    this.setData({
      popspec: true,
      maskable: false,
      currrntSpec: 0
    })
  },
  hiddenpop: function () {
    this.setData({
      popspec: true,
      popup: false,
      maskable: false
    })
  },
  tapcard: function () {
    this.setData({
      popup: false,
      maskable: false
    })
  },
  loadframe: function (currentC) {
    var that = this
    var tab = this.data.tab
    var cid = tab[currentC].Cid
    // wx.request({
    //   url: `${host}/Product/getProductList.ashx?Cid=${cid}`,
    //   success: function (res) {
    //     for (var i = 0; i < tab.length; i++) {
    //       if (currentC == i) {
    //         tab[i].productlist = res.data
    //       }
    //       else {
    //         tab[i].productlist = null
    //       }
    //       that.setData({
    //         tab: tab
    //       })
    //     }
    //   }
    // })
  }
})
