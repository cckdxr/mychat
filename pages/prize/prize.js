var app = getApp();
Page({
  data: {
    rule_list_content:"",
    ismodal:false,
    modaltitle:'',
    prize:'',
    modalcontent:'',
    indexs:0,
    pageNum:'',
    totalNam:''
  },

  onLoad () {
    wx.showLoading({
      title: '加载中',
    })
    load(this)
  },
  showdetail(event){
    let detail = [];
    if (event.currentTarget.dataset) {
      detail = event.currentTarget.dataset;
      this.setData({ ismodal: true })
      this.setData({
        prize: detail.prize,
        modaltitle: detail.good_name,
        modalcontent: detail.dsc.replace(/<br\/>/g,' \n')
      })
    }
  },
  send(event){
    let detail = '';
    let that=this;
    if (event.currentTarget.dataset) {
      detail = event.currentTarget.dataset;
     // console.log(detail)
     wx.request({
       url: "http://47.95.116.237/index.php/app/getproductId.html",
       data: { id: detail.id},
       success(res){
        let d = res.data.replace(/^\(|\)$/g, '');
        var etdt = new Date("2017,09,29".replace(/-/g, "/")).getTime();
        var stdt = new Date(2017, 10, 27).getTime();
       // let s_href = "http://zhongyouapp.com/order/checkout_game?skuId=" + d.productId;
        let s_href = "../order/order?skuId=" + d.productId;
          if (stdt > etdt) {//开放时间大于注册时间                      
            wx.navigateTo({
              url: s_href,
            }) 
          } else {
            if (rank == 2) {
              wx.navigateTo({
                url: s_href,
              }) 
            } else if (rank == 1) {
              if (white == 1 || white == 2) {
               wx.navigateTo({
                 url: s_href,
               }) 
              } else if (white == 0) {
               if (invitationCode == 0) {
                 wx.navigateTo({
                   url: "http://zhongyouapp.com/game/membertype",
                 })  
               } else if (invitationCode == 7) {
                 if (etdt > ttmm) {
                   wx.navigateTo({
                     url: s_href,
                   }) 
                 } else {
                   wx.navigateTo({
                     url: "http://zhongyouapp.com/game/membertype",
                   }) 
                 }
               } else {
                 wx.navigateTo({
                   url: s_href,
                 })
               }
             }
           }
         }
       }
     })
    }
  },
  modalhide() { //弹出窗口
    this.setData({
      ismodal: false,
    })
  },
  bindPickerChange: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      indexs: e.detail.value
    }),
    this.onLoad();
  },
})



function load(self){
  let that = self
  wx.request({
    url: "http://47.95.116.237/index.php/app/prize.html",
    data: {
      uid: app.globalData.uid,
      p: that.data.indexs*1+1
    },
    success: function (res) {
      wx.hideLoading()
      let d = res.data.replace(/^\(|\)$/g, '');
      let li = JSON.parse(d)

      if (li.data) {
        let pagenum = [];
        for (let i = 0; i < li.num;i++){
          pagenum[i]='第'+(i+1)+'页'
        }  
        that.setData({ 
          rule_list_content: li.data,
          pageNum: pagenum,
          totalNam: li.num
        })
      }
    }
  })

}