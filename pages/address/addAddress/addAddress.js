var QQMapWX = require('../../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    mobileLocation: {//选择位置传过来的数据
      longitude: 0,
      latitude: 0,
      selectaddress: '',
    },
    latitude: 0,
    longitude: 0,
    selectaddressFlag:false,  //用户是否选择地址的标记
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    qqmapsdk = new QQMapWX({
      key: 'qq-map key'
    });
    var that = this;
    //获取位置
    wx.getLocation({
      type: 'gcj02',//默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
      success: function (res) {
        var mobileLocation = {
          latitude: res.latitude,
          longitude: res.longitude,
        };
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        });
        //根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var address = addressRes.result.formatted_addresses.recommend;
            mobileLocation.selectaddress = address;
            that.setData({
              mobileLocation: mobileLocation,
            });


          }
        });
      }
    });

    this.mapCtx = wx.createMapContext('qqMap');
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

  //提交保存收货地址
  bindSaveAddress: function (e) {

    var that = this;
    var selectaddressFlag = that.data.selectaddressFlag;
    var addressNum = e.detail.value.addressNum;  //门牌号
    var linkman = e.detail.value.linkman; //联系人
    var mobile = e.detail.value.mobile;  //手机号码

    if (selectaddressFlag == false) {
      wx.showModal({
        title: '提示',
        content: '请选择地址!',
      })
    } else if (addressNum == "") {
      wx.showModal({
        title: '提示',
        content: '请输入门牌号!',
      })
    } else if (linkman == "") {
      wx.showModal({
        title: '提示',
        content: '请输入姓名!',
      })
    } else if (mobile == "") {
      wx.showModal({
        title: '提示',
        content: '请输入手机号!',
      })
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
      wx.showModal({
        title: '提示',
        content: '手机号格式不正确!',
      })
    } else {
      let userAddress = {
        addressNum: addressNum,  //门牌号
        linkman: linkman,  //联系人
        mobile: mobile  //手机号
      }
      console.log('门牌号：' + userAddress.addressNum)
      console.log('联系人：' + userAddress.linkman)
      console.log('手机号：' + userAddress.mobile)

      //传递数据
      // wx.redirectTo({
      //   url: '../address?address=' + address + '&addressNum=' + addressNum + '&linkman=' + linkman + '&mobile=' + mobile,
      // });
    }

  },


  //移动选点
  moveToLocation: function () {
    var that = this;
    var selectaddressFlag = that.data.selectaddressFlag;
    wx.chooseLocation({
      success: function (res) {
        let mobileLocation = {
          longitude: res.longitude,  //经度
          latitude: res.latitude,  //纬度
          selectaddress: res.address,
        };
        that.setData({
          mobileLocation: mobileLocation,
          selectaddressFlag:true
        });


        console.log('当前选择位置：' + mobileLocation.selectaddress)
        console.log('经度：' +mobileLocation.longitude)
        console.log('纬度：' +mobileLocation.latitude)
      },
      fail: function (err) { 
        
        that.setData({
          selectaddressFlag: false
        });
        console.log(err) 
        }
    });
  }

})