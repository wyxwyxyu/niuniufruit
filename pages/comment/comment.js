Page({

  /**
   * 页面的初始数据
   */
  data: {
    // flag: [0, 0],
    // startext: ['', ''],
    // stardata: [1, 2, 3, 4, 5],
    // starList: [], 

    noteNowLen: 0,  //备注当前字数
    noteMaxLen: 300, //最大评价字数
    photos: [],

    orderNo:'', //存放要上传的订单号
    productDetailId: '',  //存放要上传的商品编号
    content: '',   //存放要上传的商品评论
    picture: '',    //存放要上传的商品评论图片地址

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNo: options.orderNo,
      productDetailId: options.productDetailId
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
  //五星评价事件
  // changeColor: function (e) {
  //   var that = this;

  //   var index = e.currentTarget.dataset.index;
  //   var num = e.currentTarget.dataset.no;
  //   var a = 'flag[' + index + ']';
  //   var b = 'startext[' + index + ']';

  //   var starListNew = that.data.starList;
  //   var starTitle = e.currentTarget.dataset.text;
  //   var starNum = num;

  //   if (num == 1) {
  //     that.setData({
  //       [a]: 1,
  //       [b]: '非常不满意'
  //     });
  //   } else if (num == 2) {
  //     that.setData({
  //       [a]: 2,
  //       [b]: '不满意'
  //     });
  //   } else if (num == 3) {
  //     that.setData({
  //       [a]: 3,
  //       [b]: '一般'
  //     });
  //   } else if (num == 4) {
  //     that.setData({
  //       [a]: 4,
  //       [b]: '满意'
  //     });
  //   } else if (num == 5) {
  //     that.setData({
  //       [a]: 5,
  //       [b]: '非常满意'
  //     });
  //   }

  //   starListNew.push({
  //     index: index,
  //     starTitle: starTitle,
  //     starNum: starNum
  //   });
  //   that.setData({
  //     starList: starListNew
  //   })
  // },


  // 监听字数
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({
      content: value,
      noteNowLen: len,
    })

  },
  //输入框失去焦点时获取评论内容
  bindTextAreaBlur: function (e) {
    var content = e.detail.value
    this.setData({
      content: content
    })

  },
  //上传图片
  chooseImage: function () {
    var that = this;
    var items = that.data.photos;
    var msglist = []

    //选择图片start
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        for (var i = 0; i < tempFilePaths.length; i++) {
          items.push({
            src: tempFilePaths[i]
          });
        }
        that.setData({
          photos: items
        });


        var photos = that.data.photos;
        //上传图片start
        for (var i = 0; i < photos.length; i++) {
          console.log(photos[i].src)
          wx.uploadFile({  //上传图片API
            url: 'http://192.168.1.103:8080/upload/uploadImage.do',
            method: 'POST',
            filePath: photos[i].src,  //上传图片的路径
            header: {
              "content-type": "multipart/form-data"
            },
            name: 'image',
            success: function (res) {
              var data = JSON.parse(res.data)   //uploadFile 接口需要转换处理数据

              console.log(data.msg)
              msglist.push(data.msg)
              console.log(msglist)
              console.log(msglist.toString()) //拼成字符串

              that.setData({
                picture: msglist.toString()
              })
            }
          })
        }//上传图片end

      }
    })//选择图片end
  },
  //点击图片显示大图
  previewImage: function (e) {
    var current = e.target.dataset.src
    var photoSrc = this.data.photos;
    console.log(photoSrc)
    var urList = [];  //将对象放入数组中
    for (let i in photoSrc) {
      urList.push(photoSrc[i].src);
    }
    console.log(urList)
    wx.previewImage({
      current: current,
      urls: urList
    })
  },
  //提交表单
  formSubmit: function (e) {
    var that = this;

    //var starList = that.data.starList;  //评价星星数组
    var content = that.data.content
    var picture = that.data.picture
    var orderNo = that.data.orderNo
    var productDetailId = that.data.productDetailId

    console.log('订单号' + orderNo)
    console.log('商品号' + productDetailId)
    console.log('评价内容'+content)
    console.log('返回的图片地址'+picture)
   
    if (noteNowLen != 0) {
      wx.request({
        url: 'http://192.168.1.103:8080/comment/insertComment.do?orderNo=' + orderNo + '&productDetailId=' + productDetailId + '&content=' + content + '&picture=' + picture,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log('返回的状态码' + res.statusCode)
          wx.showToast({
            title: '评价成功',
          })
        }
      })
    } else {
      wx.showToast({
        title: '请填写评价',
        icon: 'none'
      })
    }
  },

})