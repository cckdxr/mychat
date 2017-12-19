// pages/rich/rich.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listnum:[]
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: "http://47.95.116.237/index.php/app/suprize.html",
      data: { uid: app.globalData.uid},
      success: function (res){
        let lists = res.data.replace(/^\(|\)$/g, '');
        that.setData({ listnum: JSON.parse(lists) })
      }
    })
  },
  exchange(){
    wx.request({
      url: "http://47.95.116.237/index.php/app/openprize.html",
      data: { uid: app.globalData.uid },
      success:function(res){
        let lists = res.data.replace(/^\(|\)$/g, '');
        let d = JSON.parse(lists)
        if (d.code == 400) {
          wx.showModal({
            content:"未集齐八个字的祝福字，快去必赢吧。",
          })
        }
      }
    })
  }
})