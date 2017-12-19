// pages/goodstuff/goodstuff.js
var app = getApp();
Page({
  data: {
    lists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    let that=this
    wx.request({
       url : "http://47.95.116.237/index.php/app/myfood.html",
       data: { uid: app.globalData.uid},
       success:function(res){
         wx.hideLoading()
         if(res.data){
           let d = JSON.parse(res.data.replace(/^\(|\)$/g, ''));
           that.setData({ lists: d });
         }
       }
    })
  },
  
  change_: function (event) {
    let id=event.currentTarget.dataset.id;
    let that=this;
    wx.request({
      url:"http://47.95.116.237/index.php/app/infodisplay.html",
      data: { uid: app.globalData.uid,id:id},
      success:function(res){
        let d = JSON.parse(res.data.replace(/^\(|\)$/g, ''));
        wx.showModal({
          title: '',
          content: '确认用' + d['forcharge'] + '斤换取大米' + d['dami']+'斤',
          success: function(res) {
            if(res.confirm){
              confirmEnter(id,that)  
            }
          },
        })
      }
    })
  },
  
})

function confirmEnter(id,self) {
  wx.request({
    url: "http://47.95.116.237/index.php/app/chargedami.html",
    data: { uid: app.globalData.uid, id: id },
    success:function(res){
      let d = res.data.replace(/^\(|\)$/g, '');
      if (d==1){
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000, 
          success: function () {
            self.onLoad()
          }
        })
        /*wx.showModal({
          content: '兑换成功',
          showCancel:false,
          
        })*/
      }      
    }
  })  
}
