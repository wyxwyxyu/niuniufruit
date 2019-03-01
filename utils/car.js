var carData = []
var car = {
  join: function (item) {
    var sinPro = {}
    sinPro.Pid = item.productId
    sinPro.Title = item.brand
    sinPro.Tips = item.subtitle
    sinPro.ImgCover = item.mainImage
    sinPro.ImgGroup = item.subImages
    sinPro.Descript = item.detail
    sinPro.Price = item.price
    //sinPro.ImgGroup = item.ImgGroup
    sinPro.standar = {}
    sinPro.standar.StandardId = item.activeStandard.productDetailId
    //sinPro.standar.StandardName = item.activeStandard.StandardName
    sinPro.standar.Price = item.activeStandard.price
    //sinPro.standar.NeedScore = item.activeStandard.NeedScore
    //sinPro.standar.IsSuitProduct = item.activeStandard.IsSuitProduct
    var len = carData.length
    if (len !== 0) {
      var flag = false;
      for (var i = 0; i < carData.length; i++) {
        if (carData[i].Pid === sinPro.Pid || carData[i].standar.StandardId === sinPro.standar.StandardId) {
          if (carData[i].standar.StandardId === sinPro.standar.StandardId) {
            carData[i].isbuy += 1
            flag = true
          }
        }
      }
      if (!flag) {
        sinPro.isbuy = 1
        carData.push(sinPro)
      }
      sinPro = {}
    } else {
      sinPro.isbuy = 1
      carData.push(sinPro)
      sinPro = {}
    }
    console.log(carData)
  },
  get: function () {
    return carData
  },
  clear:function(){
    carData=[]
  },
  descrOne:function(index){
    if (carData[index].isbuy===1){
      carData.splice(index,1)
      return
    }
    carData[index].isbuy-=1

  },
  plusOne:function(index){
    carData[index].isbuy+=1
  }
}
module.exports = exports = car



