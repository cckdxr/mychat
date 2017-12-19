//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad:function(){

  },
  
  viewTap:function(){//方法加弹窗
   /* wx.showModal({
      title: '提示',
      content: '滚动事件。'
    })*/
    wx.navigateTo({//跳转至页面保留旧页面，最多5层；
      url: '../free/free?id=5&uid=995675'
    })
    /*wx.redirectTo({ //跳转至页面不保留；
      url: 'test?id=1'
    })*/
  }
})
