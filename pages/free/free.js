var app = getApp();
Page({
  data: {
    list:[],
    prize:'',
    pan_rot:0,
    isrule:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'http://47.95.116.237/index.php/free/jiangpin.html', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let lists = res.data.replace(/^\(|\)$/g, '');
        that.setData({ list: JSON.parse(lists)})
       // console.log(JSON.parse(lists))    
      }
    })
  },
  
  getProdut() {
    var that = this
      wx.request({
        url: 'http://47.95.116.237/index.php/free/choujiang.html', //接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: app.globalData.uid
        },
        dataType: 'json',
        success: function (res) {

          
          if (res.data){
            let d = JSON.parse(res.data.replace(/^\(|\)$/g, '')); 
           if (d['nk'] == 'nointval' || d['nk'] == 'funointval') {
              wx.showModal({
               // title: '465456464',
                showCancel: false,
                content: "距离下次抽奖时间还有" + d['time'] +"分钟",  
              })
            } else if (d[0] == 'needanswer') {
              wx.showModal({
                title: '答题',
                content: "needanswer",
              })
            } else {    
              let rot = 360 + d[1] * 18 + 2 * 360; //要旋转的角度
              that.setData({ pan_rot: rot });
              setTimeout(function(){
                wx.showModal({
                  showCancel: false,
                  title: '提示',
                  content: "恭喜您抽中" + d[4],
                 /* confirmText:"查看余粮",
                  success:function(res){
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../goodstuff/goodstuff',
                      })
                    }
                  }*/
                })
              },5000)             
            } 
          }   
        }
      })
  },

  /*wx.showToast({
                  title: '未到抽奖时间',
                  icon: 'waiting',
                  duration: 2000,
                })*/
  rulecolse(){
    this.setData({isrule:false})
  },
  ruleShow(){
    this.setData({ isrule: true })
  }
})