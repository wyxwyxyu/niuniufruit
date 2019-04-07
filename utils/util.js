var api = require('../config/api.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//根据逗号分隔字符串，以数组形式返回
function cutString(s){
var arr=new Array();
arr=s.split(",")
return arr;
}
function showInfoMiss() {
  wx.showToast({
    title: '请补全信息',
    icon: 'none'
  })
}
function showSuccess() {
  wx.showToast({
    title: '提交成功'
  })
}
/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "POST") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        //'X-Nideshop-Token': wx.getStorageSync('token')
      },
      success: (data) => {
        wx.hideLoading();
        resolve(data)
        if (data.data.status == 1) {
          wx.showToast({
            title: '未登录',
            duration: 1000
          })
        }else{
          wx.showLoading({
            //title: '加载中',
          })
        }
        // if (data.status == -1) {
        //   wx.showToast({
        //     title: '系统异常',
        //     icon: 'none',
        //     duration: 2000,
        //     mask: true
        //   })
        // }
        // if (data.data.code == -2) {
        //   wx.showToast({
        //     title: '参数校验不通过',
        //     icon: 'none',
        //     duration: 2000,
        //     mask: true
        //   })
        // }
        // if (data.data.code == -3) {
        //   wx.showToast({
        //     title: data.data.msg,
        //     icon: 'none',
        //     duration: 2000,
        //     mask: true
        //   })
        // }
        // if (data.data.code == -4) {
        //   wx.showToast({
        //     title: '登录异常',
        //     icon: 'none',
        //     duration: 2000,
        //     mask: true
        //   })
        // }
        // if (data.data.code == -5) {
        //   wx.showToast({
        //     title: data.data.msg,
        //     icon: 'none',
        //     duration: 2000,
        //     mask: true
        //   })
        // }
      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}


module.exports = {
  formatTime: formatTime,
  request: request,
  showInfoMiss: showInfoMiss,
  showSuccess: showSuccess,
  cutString: cutString,
}
