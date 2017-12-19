var app = getApp();
var begin = null;
Page({
  data: {
    rulelist:[],
    showModal:false,
    ismodal:false,
    ten_prize:false,
    one_prize: false,
    price:'',//产品价格    
    modaltitle: '', //产品标题
    imgUrl:'',//产品图片
    isbegin:false , 
    //isOpacity:false
    showNnm:null,
  },
  onLoad () {
    let that=this
    wx.request({
      url: "http://47.95.116.237/index.php/app/jiangpin.html", 
      success:function(res){
        let d = JSON.parse(res.data.replace(/^\(|\)$/g, '')); 
        that.setData({rulelist:d.src})
      }
    })
  },
  one_prize(){  //一次抽奖
    Twinkle(this)
    let that=this;
    wx.request({
      url: "http://47.95.116.237/index.php/app/playone.html",
      data:{
        uid: app.globalData.uid
      },
      success:function(res){
        clearInterval(begin);
        let d = res.data.replace(/^\(|\)$/g, '');
        if(d==0){
          wx.showModal({
            title: '',
            content: '您的大米不足',
          })
        }else { 
          d=JSON.parse(d) 
          that.setData({ 
            modaltitle: d.good_name, 
            imgUrl: d.img_url,
            price: d.market_price,
            one_prize: true,  
          })
          that.setData({ ismodal: true})//模态框
        }
        that.setData({isbegin: false })//模态框
      }
    })
  },
  ten_prize(){
    Twinkle(this)
    let that = this;
    wx.request({
      url: "http://47.95.116.237/index.php/app/ten.html",
      data: {
        uid: app.globalData.uid
      },
      success: function (res) {
        clearInterval(begin);
        let d = res.data.replace(/^\(|\)$/g, '');
        if (d == 0) {
          wx.showModal({
            title: '',
            content: '您的大米不足',
          })
        } else {
          d = JSON.parse(d)
          that.setData({
            imgUrl: d,            
            ten_prize: true,
          })
        } 
        that.setData({
          isbegin: false
        })

      }
    })
  },
  free(){  //白拿跳转
    wx.redirectTo({
      url: '../free/free',
    })
  },
  listDetail(event){ //产品详情
    //console.log(event) 
    let detail=[];
    if(event.currentTarget.dataset){
      detail = event.currentTarget.dataset;
      this.setData({ ismodal: true })
      this.setData({ 
        price: detail.price,
        modaltitle: detail.cot,
        imgUrl: detail.url,
      })
    }
  }, 
  modalhide() {//弹出窗口
    this.setData({ 
      ismodal: false ,
      one_prize:false,
      ten_prize:false,
    })
  },
  
})

function Twinkle(self){
  let len = self.data.rulelist.length  
  self.setData({ isbegin:true});
  begin = setInterval(function(){
    var num = Math.floor(Math.random() * len);
    self.setData({ showNnm: num})
  }, 50);
  setTimeout(function () {
    clearInterval(begin);
    self.setData({ ismodal: true, isbegin: false })
    wx.showModal({
      title: '',
      content: '网络请求超时，请到已的奖品查看',
    })
  }, 10000)
}
