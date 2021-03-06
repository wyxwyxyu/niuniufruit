const ApiRootUrl = 'http://192.168.1.103:8080/';

module.exports = {
  GetRootCategory: ApiRootUrl + 'category/getRootCategory.do',//分类根节点接口

  GetProductByCategory: ApiRootUrl +'product/getProductByKeywordOrCategory.do',//根据分类ID或者关键词查询商品 
  GetProductDetail: ApiRootUrl + 'product/getProductDetail.do' ,   //获取商品详情
  GetCart: ApiRootUrl + 'cart/viewCart.do',//获取购物车详情
  CartAdd: ApiRootUrl + 'cart/add.do',//加入购物车
  CartChecked: ApiRootUrl + 'cart/checked.do',//购物车中选择商品     0未选中 1选中
  CartCountUpdate: ApiRootUrl + 'cart/update.do',//更新购物车数量
  CartDelete: ApiRootUrl + 'cart/delete.do',//批量删除购物车商品
  SearchProduct: ApiRootUrl + 'product/searchProduct.do' ,//搜索商品
  SelectOrder: ApiRootUrl + 'order/selectOrderByShopIdAndStatus.do',//查询订单
  SelectOrderByNo: ApiRootUrl + 'order/selectOrderVorByOrderNo.do',//根据订单号查询订单
  ShippingAdd: ApiRootUrl + 'shipping/addShipping.do',//添加地址
  ShippingDelete: ApiRootUrl + 'shipping/deleteByShippingId.do',//删除地址
  ShippingSelect: ApiRootUrl + 'shipping/selectByShopId.do',//查询地址
  OrderCreate: ApiRootUrl + 'order/createOrder.do',//创建订单
  OrderCancel: ApiRootUrl + 'order/cancelOrder.do',//取消订单

  // IndexUrl: ApiRootUrl + 'index/index', //首页数据接口
  // CatalogList: ApiRootUrl + 'catalog/index',  //分类目录全部分类数据接口
  // CatalogCurrent: ApiRootUrl + 'catalog/current',  //分类目录当前分类数据接口

  // AuthLoginByWeixin: ApiRootUrl + 'auth/loginByWeixin', //微信登录

  // GoodsCount: ApiRootUrl + 'goods/count',  //统计商品总数
  // GoodsList: ApiRootUrl + 'goods/list',  //获得商品列表
  // GoodsCategory: ApiRootUrl + 'goods/category',  //获得分类数据
  // GoodsDetail: ApiRootUrl + 'goods/detail',  //获得商品的详情
  // GoodsNew: ApiRootUrl + 'goods/new',  //新品
  // GoodsHot: ApiRootUrl + 'goods/hot',  //热门
  // GoodsRelated: ApiRootUrl + 'goods/related',  //商品详情页的关联商品（大家都在看）

  // BrandList: ApiRootUrl + 'brand/list',  //品牌列表
  // BrandDetail: ApiRootUrl + 'brand/detail',  //品牌详情

  // CartList: ApiRootUrl + 'cart/index', //获取购物车的数据
  // CartAdd: ApiRootUrl + 'cart/add', // 添加商品到购物车
  // CartUpdate: ApiRootUrl + 'cart/update', // 更新购物车的商品
  // CartDelete: ApiRootUrl + 'cart/delete', // 删除购物车的商品
  // //CartChecked: ApiRootUrl + 'cart/checked', // 选择或取消选择商品
  // CartGoodsCount: ApiRootUrl + 'cart/goodscount', // 获取购物车商品件数
  // CartCheckout: ApiRootUrl + 'cart/checkout', // 下单前信息确认

  //OrderSubmit: ApiRootUrl + 'order/submit', // 提交订单
  PayPrepayId: ApiRootUrl + 'pay/prepay', //获取微信统一下单prepay_id

  CollectList: ApiRootUrl + 'collect/list',  //收藏列表
  CollectAddOrDelete: ApiRootUrl + 'collect/addordelete',  //添加或取消收藏

  CommentList: ApiRootUrl + 'comment/list',  //评论列表
  CommentCount: ApiRootUrl + 'comment/count',  //评论总数
  CommentPost: ApiRootUrl + 'comment/post',   //发表评论

  TopicList: ApiRootUrl + 'topic/list',  //专题列表
  TopicDetail: ApiRootUrl + 'topic/detail',  //专题详情
  TopicRelated: ApiRootUrl + 'topic/related',  //相关专题

  // SearchIndex: ApiRootUrl + 'search/index',  //搜索页面数据
  // SearchResult: ApiRootUrl + 'search/result',  //搜索数据
  // SearchHelper: ApiRootUrl + 'search/helper',  //搜索帮助
  // SearchClearHistory: ApiRootUrl + 'search/clearhistory',  //搜索帮助

  // AddressList: ApiRootUrl + 'address/list',  //收货地址列表
  // AddressDetail: ApiRootUrl + 'address/detail',  //收货地址详情
  // AddressSave: ApiRootUrl + 'address/save',  //保存收货地址
  // AddressDelete: ApiRootUrl + 'address/delete',  //保存收货地址

  // RegionList: ApiRootUrl + 'region/list',  //获取区域列表

  // OrderList: ApiRootUrl + 'order/list',  //订单列表
  // OrderDetail: ApiRootUrl + 'order/detail',  //订单详情
  // OrderCancel: ApiRootUrl + 'order/cancel',  //取消订单
  // OrderExpress: ApiRootUrl + 'order/express', //物流详情

  // FootprintList: ApiRootUrl + 'footprint/list',  //足迹列表
  // FootprintDelete: ApiRootUrl + 'footprint/delete',  //删除足迹
};