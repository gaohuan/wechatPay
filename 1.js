webpackJsonp([2], {
    "9bBU":function(s, t, i) {
        i("mClu");
        var e=i("FeBl").Object;
        s.exports=function(s, t, i) {
            return e.defineProperty(s, t, i)
        }
    }
    , C4MV:function(s, t, i) {
        s.exports= {
            default: i("9bBU"), __esModule: !0
        }
    }
    , CkMd:function(s, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }
        );
        var e=i("Xxa5"), a=i.n(e), n=i("exGp"), r=i.n(n), o=i("bOdI"), c=i.n(o), v=i("mtWM"), u=i.n(v), l= {
            data:function() {
                var s;
                return s= {
                    step:1, isShowBuy:!0, money:0, user:null, id:0, sku:0, showPay:!1, info:null, showFankui:!1, formItem: {
                        content: ""
                    }
                    , isSc:!1, isBuy:!1, buyTypes:[], isBuyTupian:!1, isBuyShipin:!1, images:[], rechargeModal:!1, moneys:[50, 100, 200, 500, 1e3, 2e3, 5e3]
                }
                , c()(s, "money", 200), c()(s, "moneyType", 1), c()(s, "qrcode", ""), c()(s, "orderId", ""), c()(s, "timer", null), c()(s, "showOnlinePay", !0), c()(s, "downImageInfo", {
                    url: "", password: ""
                }
                ), c()(s, "downVideoInfo", {
                    url: "", password: ""
                }
                ), c()(s, "buying", !1), c()(s, "isNewUser", !0), c()(s, "breads", [ {
                    name: "首页", link: "Index"
                }
                , {
                    name: "", link: "Index"
                }
                , {
                    name: "", link: "Index"
                }
                , {
                    name: "", link: ""
                }
                ]), c()(s, "links", []), s
            }
            , mounted:function() {
                this.init()
            }
            , components: {}
            , computed: {
                linkHeight:function() {
                    var s=0;
                    return this.isBuyTupian&&(s=1), this.isBuyShipin&&(s+=1), this.buyTypes.indexOf(3)>=0&&(s+=1), s<=1?60: 2==s?30: 20
                }
                , showBuyBox:function() {
                    if(!this.info)return!1;
                    var s=this.info, t=!0, i=!0, e=!0;
                    return s.costprice||(t=!1), s.videocostprice||(i=!1), s.ivcostprice||(e=!1), this.isBuyTupian&&(t=!1), this.isBuyShipin&&(i=!1), this.isBuyTupian&&this.isBuyShipin&&(e=!1), !!(t||i||e)
                }
                , imageStyle:function() {
                    var s= {}
                    ;
                    return this.info&&(s.backgroundImage="url("+this.info.imageurl+")"), s
                }
                , showPrice:function() {
                    return 0==this.sku?this.info.saleprice: 1==this.sku?this.info.videosaleprice: this.info.ivsaleprice
                }
                , buyPrice:function() {
                    var s=0;
                    if(s=0==this.sku?this.info.costprice: 1==this.sku?this.info.videocostprice: this.info.ivcostprice, !this.user)return s;
                    var t=(s*this.$dengji(this.user).zhekou/100).toFixed(2);
                    return t||(t=0), (t=t.split("."))[0]
                }
                , showYuanjia:function() {
                    return 0==this.sku?this.info.costprice: 1==this.sku?this.info.videocostprice: this.info.ivcostprice
                }
            }
            , methods: {
                setBreads:function() {
                    this.$emit("setBreads", this.breads)
                }
                , jingcaiTobuy:function() {
                    if(100==this.$dengji(this.user).zhekou)return this.$Message.error("仅会员可查看详情");
                    this.isShowBuy=!0
                }
                , toLogin:function() {
                    this.$router.push( {
                        name: "Login"
                    }
                    )
                }
                , getShowOnlinePay:function() {
                    var s=this;
                    u.a.get("https://api.huaishu520.com:8080/renren-fast/sys/config/queryIsShowPay").then(function(t) {
                        "0"==t.data.paramValue&&(s.showOnlinePay=!1)
                    }
                    )
                }
                , toBuy:function() {
                    if(0==this.sku&&this.isBuyTupian)return this.$Message.error("您已购买过，无需购买！");
                    if(1==this.sku&&this.isBuyShipin)return this.$Message.error("您已购买过，无需购买！");
                    if(2==this.sku&&this.isBuyShipin&&this.isBuyTupian)return this.$Message.error("您已购买过，无需购买！");
                    if(this.info&&this.info.isvipbuy&&-1==this.info.categoryPath.indexOf(22)) {
                        if(!this.user)return this.$Message.error("仅VIP可购买!");
                        if(100==this.$dengji(this.user).zhekou)return this.$Message.error("仅VIP可购买!")
                    }
                    this.showPay=!0
                }
                , sureRechargeBtn:function() {
                    if(3!=this.moneyType&&(this.money<20||this.money>5e3))return this.$Message.error("充值金额最少20，最高5000");
                    this.step=2, this.getQrCode()
                }
                , closeRechargeModal:function() {
                    this.rechargeModal=!1, this.timer&&(clearInterval(this.timer), this.timer=null)
                }
                , getQrCode:function() {
                    var s=this;
                    this.timer&&(clearInterval(this.timer), this.timer=null), 3!=this.moneyType&&u.a.post("https://api.huaishu520.com:8080/renren-fast/rechargePay", {
                        userid: this.user.id, money: this.money, paytype: 1==this.moneyType?"alipay": "native"
                    }
                    ).then(function(t) {
                        0==t.data.code&&(s.qrcode=t.data.recharge.qr, s.orderId=t.data.recharge.orderid, s.timer=setInterval(function() {
                            s.queryOrder(s.orderId)
                        }
                        , 2e3))
                    }
                    )
                }
                , queryOrder:function(s) {
                    var t=this;
                    u.a.post("https://api.huaishu520.com:8080/renren-fast/queryRechargeByOrderid/"+s).then(function(s) {
                        0==s.data.code&&(1==s.data.rechargeOrder.status&&(clearInterval(t.timer), t.timer=null, t.rechargeModal=!1, t.rechargeOk()))
                    }
                    )
                }
                , rechargeOk:function() {
                    var s=this;
                    return r()(a.a.mark(function t() {
                        return a.a.wrap(function(t) {
                            for(;
                            ;
                            )switch(t.prev=t.next) {
                                case 0: return t.next=2, s.$util.getUserInfo();
                                case 2: s.user=t.sent;
                                case 3: case"end": return t.stop()
                            }
                        }
                        , t, s)
                    }
                    ))()
                }
                , changeMoneyType:function(s) {
                    this.moneyType=s, this.timer&&(clearInterval(this.timer), this.timer=null)
                }
                , changeMoney:function(s) {
                    this.money=s, this.timer&&(clearInterval(this.timer), this.timer=null)
                }
                , showChongzhi:function() {
                    this.rechargeModal=!0, this.money=200, this.moneyType=this.showOnlinePay?1: 3, this.step=this.showOnlinePay?1: 2
                }
                , showImage:function() {
                    this.$el.querySelector(".show-images-box").$viewer.show()
                }
                , init:function() {
                    var s=this;
                    return r()(a.a.mark(function t() {
                        var i, e, n;
                        return a.a.wrap(function(t) {
                            for(;
                            ;
                            )switch(t.prev=t.next) {
                                case 0: return t.next=2, s.$util.getUserInfo();
                                case 2:if(s.user=t.sent, i=(new Date).getTime(), s.user&&(e=(e=s.user.createtime).replace(/-/g, "/"), n=new Date(e).getTime(), i-n<135e7?s.isNewUser=!1: s.user.totalpoint>=200&&(s.isNewUser=!1)), s.id=s.$route.query.id, s.user) {
                                    t.next=9;
                                    break
                                }
                                return s.$router.push( {
                                    name: "Login"
                                }
                                ), t.abrupt("return");
                                case 9:if(!s.$checkSession()) {
                                    t.next=12;
                                    break
                                }
                                return s.$router.push( {
                                    name: "Login"
                                }
                                ), t.abrupt("return", !1);
                                case 12:s.getShowOnlinePay(), s.getInfo(), s.getIsSc(), s.getIsBuy();
                                case 16:case"end":return t.stop()
                            }
                        }
                        , t, s)
                    }
                    ))()
                }
                , calDefaultSku:function() {
                    this.info&&(this.isBuy||!this.costprice)?this.info.costprice?console.log(this.sku): this.sku=1: this.sku=0
                }
                , sureBuy:function() {
                    var s=this;
                    return this.$checkSession()?(this.$router.push( {
                        name: "Login"
                    }
                    ), !1):this.user?this.buyPrice>this.user.totalamt?this.$Message.error("账户余额不足！请充值！"):void(this.buying||(this.buying=!0, u.a.post("https://api.huaishu520.com:8080/renren-fast/orders/orders/buy", {
                        userid: this.user.id, imageid: this.id, orderpice: this.buyPrice, buytype: this.sku+1
                    }
                    ).then(function(t) {
                        s.buyOk(t)
                    }
                    ))):this.$Message.error("请先登录！")
                }
                , buyOk:function(s) {
                    var t=this;
                    return r()(a.a.mark(function i() {
                        return a.a.wrap(function(i) {
                            for(;
                            ;
                            )switch(i.prev=i.next) {
                                case 0:if(t.buying=!1, 0!=s.data.code||!s.data.image) {
                                    i.next=15;
                                    break
                                }
                                return t.downImageInfo.url=s.data.image.imgpanurl, t.downImageInfo.password=s.data.image.imgpanpwd, t.downVideoInfo.url=s.data.image.videopanurl, t.downVideoInfo.password=s.data.image.videopanpwd, t.$Message.success("购买成功！"), t.isBuy=!0, t.showPay=!1, i.next=11, t.$util.getUserInfo();
                                case 11:t.user=i.sent, t.getIsBuy(), i.next=16;
                                break;
                                case 15:t.$Message.error(s.data.msg);
                                case 16:case"end":return i.stop()
                            }
                        }
                        , i, t)
                    }
                    ))()
                }
                , getIsBuy:function() {
                    var s=this;
                    this.user||(this.isBuy=!1), u.a.post("https://api.huaishu520.com:8080/renren-fast/orders/orders/isbuy", {
                        userid: this.user.id, imageid: this.id
                    }
                    ).then(function(t) {
                        alert(111)
                        if(true) {
                            s.isBuy=!0;
                            var i=[], e=null;
                            for(var a in t.data.orders)i.push(t.data.orders[a].buytype), e=t.data.orders[a].imagesEntity;
                            s.buyTypes=i, i.indexOf(1)>=0&&(s.downImageInfo.url=e.imgpanurl, s.downImageInfo.password=e.imgpanpwd, s.isBuyTupian=!0), i.indexOf(2)>=0&&(s.downVideoInfo.url=e.videopanurl, s.downVideoInfo.password=e.videopanpwd, s.isBuyShipin=!0), i.indexOf(3)>=0&&(s.downImageInfo.url=e.imgpanurl, s.downImageInfo.password=e.imgpanpwd, s.downVideoInfo.url=e.videopanurl, s.downVideoInfo.password=e.videopanpwd, s.isBuyTupian=!0, s.isBuyShipin=!0), 1==s.isBuy&&(s.isShowBuy=!0)
                        }
                    }
                    )
                }
                , getIsSc:function() {
                    var s=this;
                    this.user||(this.isSc=!1), u.a.post("https://api.huaishu520.com:8080/renren-fast/picCollect/picCollect/iscollect", {
                        userid: this.user.id, imageid: this.id
                    }
                    ).then(function(t) {
                        0==t.data.code&&(s.isSc=t.data.iscollect)
                    }
                    )
                }
                , getInfo:function() {
                    var s=this;
                    if(!this.user) {
                        var t=localStorage.getItem("not_login_see");
                        if(t||(t=0), t>=2)return this.$Message.error("您还未登录！"), void this.$router.push( {
                            name: "Login"
                        }
                        );
                        t++, localStorage.setItem("not_login_see", t)
                    }
                    u.a.get("https://api.huaishu520.com:8080/renren-fast/images/images/frontinfo/"+this.id).then(function(t) {
                        0==t.data.code&&(s.info=t.data.images, s.breads[1].name=s.info.categoryName, s.breads[1].link="List", s.breads[1].query= {
                            cid: s.info.categoryPath[0]
                        }
                        , s.info.twoCategoryName?(s.breads[2].name=s.info.twoCategoryName, s.breads[2].link="List", s.breads[2].query= {
                            cid: s.info.categoryPath[0], scid: s.info.categoryPath[1]
                        }
                        ):s.info.tags&&s.info.tags.length>0&&(s.breads[2].name=s.info.tags[0].tagsname, s.breads[2].link="List", s.breads[2].query= {
                            cid: s.info.categoryPath[0], tagid: s.info.tags[0].id
                        }
                        ), s.breads[3].name=s.info.name, s.setBreads(), document.title="【"+s.info.name+"】坏叔摄影网", s.images=s.info.images, s.calDefaultSku(), s.info.links&&s.info.links.length>0?s.links=s.info.links:s.links=[])
                    }
                    )
                }
                , submitFankui:function() {
                    var s=this;
                    return this.user?this.formItem.content?void u.a.post("https://api.huaishu520.com:8080/renren-fast/feedback/feedback/save", {
                        userid: this.user.id, imageid: this.info.id, content: this.formItem.content
                    }
                    ).then(function(t) {
                        0==t.data.code&&(s.$Message.success("您的反馈提交成功！"), s.showFankui=!1, s.formItem.content="")
                    }
                    ):this.$Message.error("请输入要反馈的内容"):this.$Message.error("您还未登录！")
                }
                , shouCang:function() {
                    var s=this;
                    if(!this.user)return this.$Message.error("您还未登录！");
                    u.a.post("https://api.huaishu520.com:8080/renren-fast/picCollect/picCollect/save", {
                        userid: this.user.id, imageid: this.info.id
                    }
                    ).then(function(t) {
                        if(0==t.data.code) {
                            var i="";
                            "true"==t.data.collect?(s.isSc=!0, i="恭喜您！收藏成功！"): (s.isSc=!1, i="取消收藏成功！"), s.$Message.success(i)
                        }
                    }
                    )
                }
                , selectSku:function(s) {
                    if(this.$checkSession())return this.$router.push( {
                        name: "Login"
                    }
                    ), !1;
                    this.sku=s
                }
            }
        }
        , h= {
            render:function() {
                var s=this, t=s.$createElement, i=s._self._c||t;
                return i("div", {
                    staticClass: "content"
                }
                , [i("div", {
                    staticClass: "box-2"
                }
                , [s.info?i("div", {
                    staticClass:"content-main", style: {
                        width: s.$w+"px"
                    }
                }
                , [22!=s.info.cid?i("div", [i("div", {
                    staticClass: "title"
                }
                , [i("div", {
                    staticClass: "name"
                }
                , [s._v(s._s(s.info.name))])]), s._v(" "), i("div", {
                    staticClass: "item"
                }
                , [i("div", {
                    staticClass:"left left-images", style:s.imageStyle, on: {
                        click: s.showImage
                    }
                }
                ), s._v(" "), i("div", {
                    staticClass:"right", style: {
                        width: s.$w-360+"px"
                    }
                }
                , [i("div", {
                    staticClass: "price"
                }
                , [i("span", [i("img", {
                    attrs: {
                        src: "/static/images/tu.png"
                    }
                }
                ), s._v(" "+s._s(s.buyPrice)+"图币")]), s._v(" "), i("span", {
                    staticClass: "old"
                }
                , [s._v("原价"+s._s(s.showYuanjia)+"图币")])]), s._v(" "), i("div", {
                    staticClass: "youhui"
                }
                , [s._v("\n              VIP优惠 ①铜卡会员全站9折； ②银卡会员全站8折； ③金卡会员全站7折；\n              ④铂金会员全站6.5折； ⑤钻石会员全站5.5折\n            ")]), s._v(" "), 0==s.sku?i("div", {
                    staticClass: "attribute"
                }
                , [i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("分辨率：")]), s._v(" "), i("span", [s._v(s._s(s.info.resolution))])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("图片张数：")]), s._v(" "), i("span", [s._v(s._s(s.info.picnum)+"P")])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("存储大小：")]), s._v(" "), i("span", [s._v(s._s(s.info.storagesize))])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("套图详情：")]), s._v(" "), i("span", [s._v(s._s(s.info.info))])])]):s._e(), s._v(" "), 1==s.sku?i("div", {
                    staticClass: "attribute"
                }
                , [i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("分辨率：")]), s._v(" "), i("span", [s._v(s._s(s.info.vresolution))])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("存储大小：")]), s._v(" "), i("span", [s._v(s._s(s.info.vstoragesize))])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("视频详情：")]), s._v(" "), i("span", [s._v(s._s(s.info.vinfo))])])]):s._e(), s._v(" "), 2==s.sku?i("div", {
                    staticClass: "attribute"
                }
                , [i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("分辨率：")]), s._v(" "), i("span", [s._v("图片分辨率："+s._s(s.info.resolution)+" | 视频分辨率："+s._s(s.info.vresolution))])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("存储大小：")]), s._v(" "), i("span", [s._v("图片："+s._s(s.info.storagesize)+" | 视频："+s._s(s.info.vstoragesize))])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("内容详情：")]), s._v(" "), i("span", [s._v(s._s(s.info.info)+" | "+s._s(s.info.vinfo))])])]):s._e(), s._v(" "), i("div", {
                    staticClass: "sku"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("购买内容：")]), s._v(" "), s.info.costprice?i("a", {
                    class: {
                        active: 0==s.sku
                    }
                    , attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click:function(t) {
                            return s.selectSku(0)
                        }
                    }
                }
                , [s._v("套图")]):s._e(), s._v(" "), s.info.videocostprice?i("a", {
                    class: {
                        active: 1==s.sku
                    }
                    , attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click:function(t) {
                            return s.selectSku(1)
                        }
                    }
                }
                , [s._v("视频")]):s._e(), s._v(" "), s.info.ivcostprice?i("a", {
                    class: {
                        active: 2==s.sku
                    }
                    , attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click:function(t) {
                            return s.selectSku(2)
                        }
                    }
                }
                , [s._v("套图+视频")]):s._e()]), s._v(" "), i("div", {
                    staticClass: "btns"
                }
                , [i("a", {
                    staticClass:"buy", attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click: s.toBuy
                    }
                }
                , [s._v("立即购买")]), s._v(" "), i("a", {
                    staticClass:"item", attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click: s.shouCang
                    }
                }
                , [s._v(s._s(s.isSc?"取消收藏":"收藏作品"))])])]), s._v(" "), i("div", {
                    staticStyle: {
                        clear: "both"
                    }
                }
                )]), s._v(" "), s.showFankui?i("div", {
                    staticClass: "fankui"
                }
                , [i("div", {
                    staticClass: "fankui-title"
                }
                , [s._v("反馈投诉")]), s._v(" "), i("div", {
                    staticClass: "input"
                }
                , [i("textarea", {
                    directives:[ {
                        name: "model", rawName: "v-model", value: s.formItem.content, expression: "formItem.content"
                    }
                    ], attrs: {
                        placeholder: "请输入您的反馈投诉内容"
                    }
                    , domProps: {
                        value: s.formItem.content
                    }
                    , on: {
                        input:function(t) {
                            t.target.composing||s.$set(s.formItem, "content", t.target.value)
                        }
                    }
                }
                )]), s._v(" "), i("div", {
                    staticClass: "btns"
                }
                , [i("button", {
                    staticClass:"cancel", on: {
                        click:function(t) {
                            s.showFankui=!1
                        }
                    }
                }
                , [s._v("取消")]), s._v(" "), i("button", {
                    staticClass:"submit", on: {
                        click: s.submitFankui
                    }
                }
                , [s._v("确认提交")])])]):s._e(), s._v(" "), i("div", {
                    staticClass: "shuoming"
                }
                , [s._m(0), s._v(" "), s.isBuy?s._e():i("div", {
                    staticClass:"right not-buy", style: {
                        width: s.$w-360+"px"
                    }
                }
                , [i("span", [s._v("购买支付后可查看下载地址，如果下载链接失效不能使用，请联系客服QQ：12861862")])]), s._v(" "), s.isBuy?i("div", {
                    staticClass:"right has-buy", style: {
                        width: s.$w-360+"px", lineHeight: s.linkHeight+"px", textAlign: "left"
                    }
                }
                , [s.isBuyTupian?i("div", [s._v("\n              图片下载地址："+s._s(s.downImageInfo.url)+" 密码："+s._s(s.downImageInfo.password)+"\n            ")]):s._e(), s._v(" "), s.isBuyShipin?i("div", [s._v("\n              视频下载地址："+s._s(s.downVideoInfo.url)+" 密码："+s._s(s.downVideoInfo.password)+"\n            ")]):s._e()]):s._e(), s._v(" "), i("div", {
                    staticStyle: {
                        clear: "both"
                    }
                }
                )])]):s._e(), s._v(" "), s.links.length>0?i("div", {
                    staticClass: "links"
                }
                , [i("div", {
                    staticClass:"content-main", style: {
                        width: s.$w+"px"
                    }
                }
                , s._l(s.links, function(t, e) {
                    return i("a", {
                        key:e, attrs: {
                            href: t.link, target: "_blank"
                        }
                    }
                    , [s._v(s._s(t.name))])
                }
                ), 0)]):s._e(), s._v(" "), i("div", {
                    staticClass: "images"
                }
                , [i("div", {
                    directives:[ {
                        name: "viewer", rawName: "v-viewer"
                    }
                    ], staticClass:"images show-images-box"
                }
                , s._l(s.info.images, function(t, e) {
                    return e>0&&(!s.isNewUser||s.isNewUser&&e<4)?i("img", {
                        key:t, staticStyle: {
                            width: "100%"
                        }
                        , attrs: {
                            src: t+"!sy"
                        }
                    }
                    ):s._e()
                }
                ), 0)]), s._v(" "), s.isNewUser?i("div", {
                    staticClass: "notice"
                }
                , [i("a", {
                    attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click: s.showChongzhi
                    }
                }
                , [i("img", {
                    attrs: {
                        src: "/static/images/lock.png"
                    }
                }
                ), s._v(s._s(s.user.username)+"! 您的权限不能查看本帖的隐藏内容，开通VIP后可浏览查看隐藏内容 "), i("span", [s._v("立即开通vip")])])]):s._e(), s._v(" "), 22==s.info.cid?i("div", {
                    staticClass: "image-info"
                }
                , [s.isShowBuy?i("div", [i("div", {
                    staticClass: "title"
                }
                , [i("div", {
                    staticClass: "name"
                }
                , [s._v(s._s(s.info.name))])]), s._v(" "), i("div", {
                    staticClass: "item"
                }
                , [i("div", {
                    staticClass:"left left-images", style:s.imageStyle, on: {
                        click: s.showImage
                    }
                }
                ), s._v(" "), i("div", {
                    staticClass:"right", style: {
                        width: s.$w-360+"px"
                    }
                }
                , [i("div", {
                    staticClass: "price"
                }
                , [i("span", [i("img", {
                    attrs: {
                        src: "/static/images/tu.png"
                    }
                }
                ), s._v("\n                  "+s._s(s.buyPrice)+"图币")]), s._v(" "), i("span", {
                    staticClass: "old"
                }
                , [s._v("原价"+s._s(s.showYuanjia)+"图币")])]), s._v(" "), i("div", {
                    staticClass: "youhui"
                }
                , [s._v("\n                VIP优惠 ①铜卡会员全站9折； ②银卡会员全站8折；\n                ③金卡会员全站7折； ④铂金会员全站6.5折； ⑤钻石会员全站5.5折\n              ")]), s._v(" "), 0==s.sku?i("div", {
                    staticClass: "attribute"
                }
                , [i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("分辨率：")]), s._v(" "), i("span", [s._v(s._s(s.info.resolution))])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("图片张数：")]), s._v(" "), i("span", [s._v(s._s(s.info.picnum)+"P")])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("存储大小：")]), s._v(" "), i("span", [s._v(s._s(s.info.storagesize))])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("套图详情：")]), s._v(" "), i("span", [s._v(s._s(s.info.info))])])]):s._e(), s._v(" "), 1==s.sku?i("div", {
                    staticClass: "attribute"
                }
                , [i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("分辨率：")]), s._v(" "), i("span", [s._v(s._s(s.info.vresolution))])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("存储大小：")]), s._v(" "), i("span", [s._v(s._s(s.info.vstoragesize))])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("视频详情：")]), s._v(" "), i("span", [s._v(s._s(s.info.vinfo))])])]):s._e(), s._v(" "), 2==s.sku?i("div", {
                    staticClass: "attribute"
                }
                , [i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("分辨率：")]), s._v(" "), i("span", [s._v("图片分辨率："+s._s(s.info.resolution)+" | 视频分辨率："+s._s(s.info.vresolution))])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("存储大小：")]), s._v(" "), i("span", [s._v("图片："+s._s(s.info.storagesize)+" | 视频："+s._s(s.info.vstoragesize))])]), s._v(" "), i("div", {
                    staticClass: "line"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("内容详情：")]), s._v(" "), i("span", [s._v(s._s(s.info.info)+" | "+s._s(s.info.vinfo))])])]):s._e(), s._v(" "), i("div", {
                    staticClass: "sku"
                }
                , [i("span", {
                    staticClass: "name"
                }
                , [s._v("购买内容：")]), s._v(" "), s.info.costprice?i("a", {
                    class: {
                        active: 0==s.sku
                    }
                    , attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click:function(t) {
                            return s.selectSku(0)
                        }
                    }
                }
                , [s._v("套图")]):s._e(), s._v(" "), s.info.videocostprice?i("a", {
                    class: {
                        active: 1==s.sku
                    }
                    , attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click:function(t) {
                            return s.selectSku(1)
                        }
                    }
                }
                , [s._v("视频")]):s._e(), s._v(" "), s.info.ivcostprice?i("a", {
                    class: {
                        active: 2==s.sku
                    }
                    , attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click:function(t) {
                            return s.selectSku(2)
                        }
                    }
                }
                , [s._v("套图+视频")]):s._e()]), s._v(" "), i("div", {
                    staticClass: "btns"
                }
                , [i("a", {
                    staticClass:"buy", attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click: s.toBuy
                    }
                }
                , [s._v("立即购买")]), s._v(" "), i("a", {
                    staticClass:"item", attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click: s.shouCang
                    }
                }
                , [s._v(s._s(s.isSc?"取消收藏":"收藏作品"))])])]), s._v(" "), i("div", {
                    staticStyle: {
                        clear: "both"
                    }
                }
                )]), s._v(" "), s.showFankui?i("div", {
                    staticClass: "fankui"
                }
                , [i("div", {
                    staticClass: "fankui-title"
                }
                , [s._v("反馈投诉")]), s._v(" "), i("div", {
                    staticClass: "input"
                }
                , [i("textarea", {
                    directives:[ {
                        name: "model", rawName: "v-model", value: s.formItem.content, expression: "formItem.content"
                    }
                    ], attrs: {
                        placeholder: "请输入您的反馈投诉内容"
                    }
                    , domProps: {
                        value: s.formItem.content
                    }
                    , on: {
                        input:function(t) {
                            t.target.composing||s.$set(s.formItem, "content", t.target.value)
                        }
                    }
                }
                )]), s._v(" "), i("div", {
                    staticClass: "btns"
                }
                , [i("button", {
                    staticClass:"cancel", on: {
                        click:function(t) {
                            s.showFankui=!1
                        }
                    }
                }
                , [s._v("取消")]), s._v(" "), i("button", {
                    staticClass:"submit", on: {
                        click: s.submitFankui
                    }
                }
                , [s._v("确认提交")])])]):s._e(), s._v(" "), i("div", {
                    staticClass: "shuoming"
                }
                , [s._m(1), s._v(" "), s.isBuy?s._e():i("div", {
                    staticClass:"right not-buy", style: {
                        width: s.$w-360+"px"
                    }
                }
                , [i("span", [s._v("购买支付后可查看下载地址，如果下载链接失效不能使用，请联系客服QQ：12861862")])]), s._v(" "), s.isBuy?i("div", {
                    staticClass:"right has-buy", style: {
                        width: s.$w-360+"px", lineHeight: s.linkHeight+"px"
                    }
                }
                , [s.isBuyTupian?i("div", [s._v("\n                图片下载地址："+s._s(s.downImageInfo.url)+" 密码："+s._s(s.downImageInfo.password)+"\n              ")]):s._e(), s._v(" "), s.isBuyShipin?i("div", [s._v("\n                视频下载地址："+s._s(s.downVideoInfo.url)+" 密码："+s._s(s.downVideoInfo.password)+"\n              ")]):s._e()]):s._e(), s._v(" "), i("div", {
                    staticStyle: {
                        clear: "both"
                    }
                }
                )])]):s._e(), s._v(" "), s.isShowBuy?s._e():i("div", {
                    staticClass:"btns", staticStyle: {
                        "text-align": "center"
                    }
                }
                , [s.user?i("a", {
                    staticClass:"buy", attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click: s.jingcaiTobuy
                    }
                }
                , [s._v("查看完整作品")]):s._e(), s._v(" "), s.user?s._e():i("a", {
                    staticClass:"buy", attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click: s.toLogin
                    }
                }
                , [s._v("请登录")]), s._v(" "), i("a", {
                    staticClass:"item", attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click: s.shouCang
                    }
                }
                , [s._v(s._s(s.isSc?"取消收藏":"收藏作品"))])])]):s._e()]):s._e()]), s._v(" "), s.showPay?i("div", {
                    staticClass: "to-pay"
                }
                , [i("div", {
                    staticClass: "bg"
                }
                ), s._v(" "), i("div", {
                    staticClass: "pay-content"
                }
                , [i("div", {
                    staticClass:"close", on: {
                        click:function(t) {
                            s.showPay=!1
                        }
                    }
                }
                , [i("Icon", {
                    attrs: {
                        type: "md-close"
                    }
                }
                )], 1), s._v(" "), i("div", {
                    staticClass: "left"
                }
                , [i("div", {
                    staticClass: "pay"
                }
                , [s._v("\n          支付："), i("span", {
                    staticClass: "price"
                }
                , [s._v(s._s(s.buyPrice)+"图币")])]), s._v(" "), i("div", {
                    staticClass: "yue"
                }
                , [s._v("\n          你账户剩余图币："), i("span", {
                    staticClass: "price"
                }
                , [s._v(s._s(s.user?s.user.totalamt:0))])]), s._v(" "), i("div", {
                    staticClass: "btn"
                }
                , [i("a", {
                    attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click: s.sureBuy
                    }
                }
                , [s._v(s._s(s.buying?"处理中":"确认购买"))])]), s._v(" "), s.user&&s.buyPrice>s.user.totalamt?i("div", {
                    staticClass:"text", staticStyle: {
                        "padding-top": "20px"
                    }
                }
                , [s._v("\n          你的图币不足，请\n          "), i("a", {
                    staticStyle: {
                        color: "red"
                    }
                    , attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click: s.showChongzhi
                    }
                }
                , [s._v("充值")])]):s._e()])])]):s._e(), s._v(" "), s.rechargeModal?i("div", {
                    staticClass: "recharge-modal"
                }
                , [i("div", {
                    staticClass: "bg"
                }
                ), s._v(" "), i("div", {
                    staticClass: "recharge-content"
                }
                , [i("div", {
                    staticClass:"close", on: {
                        click: s.closeRechargeModal
                    }
                }
                , [i("Icon", {
                    attrs: {
                        type: "md-close"
                    }
                }
                )], 1), s._v(" "), i("div", {
                    staticClass: "recharge-box"
                }
                , [1==s.step?i("div", [1==s.moneyType||2==s.moneyType?i("div", {
                    staticClass: "title"
                }
                , [s._v("\n            请选择充值金额\n          ")]):s._e(), s._v(" "), 1==s.moneyType||2==s.moneyType?i("div", {
                    staticClass: "moneys"
                }
                , [s._l(s.moneys, function(t, e) {
                    return i("a", {
                        key:e, class: {
                            active: s.money==t
                        }
                        , attrs: {
                            href: "javascript:;"
                        }
                        , on: {
                            click:function(i) {
                                return s.changeMoney(t)
                            }
                        }
                    }
                    , [s._v(s._s(t)+"图币")])
                }
                ), s._v(" "), i("div", {
                    staticStyle: {
                        clear: "both"
                    }
                }
                )], 2):s._e(), s._v(" "), 1==s.moneyType||2==s.moneyType?i("div", {
                    staticClass: "title"
                }
                , [s._v("\n            充值金额\n          ")]):s._e(), s._v(" "), 1==s.moneyType||2==s.moneyType?i("div", {
                    staticClass: "moneys"
                }
                , [i("Input", {
                    attrs: {
                        type: "number"
                    }
                    , model: {
                        value:s.money, callback:function(t) {
                            s.money=t
                        }
                        , expression:"money"
                    }
                }
                )], 1):s._e(), s._v(" "), i("div", {
                    staticClass: "title"
                }
                , [s._v("请选择支付方式")]), s._v(" "), i("div", {
                    staticClass: "moneys"
                }
                , [s.showOnlinePay?i("a", {
                    class: {
                        active: 1==s.moneyType
                    }
                    , attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click:function(t) {
                            return s.changeMoneyType(1)
                        }
                    }
                }
                , [s._v("支付宝")]):s._e(), s._v(" "), s.showOnlinePay?i("a", {
                    class: {
                        active: 2==s.moneyType
                    }
                    , attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click:function(t) {
                            return s.changeMoneyType(2)
                        }
                    }
                }
                , [s._v("微信")]):s._e(), s._v(" "), i("a", {
                    class: {
                        active: 3==s.moneyType
                    }
                    , attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click:function(t) {
                            return s.changeMoneyType(3)
                        }
                    }
                }
                , [s._v("人工充值")]), s._v(" "), i("div", {
                    staticStyle: {
                        clear: "both"
                    }
                }
                )]), s._v(" "), i("div", {
                    staticClass: "btn"
                }
                , [i("a", {
                    staticClass:"recharge-btn", attrs: {
                        href: "javascript:;"
                    }
                    , on: {
                        click: s.sureRechargeBtn
                    }
                }
                , [s._v("确认充值")])]), s._v(" "), s._m(2)]):s._e(), s._v(" "), 2==s.step?i("div", {
                    staticStyle: {
                        "padding-top": "100px"
                    }
                }
                , [1==s.moneyType||2==s.moneyType?i("div", {
                    staticClass: "info"
                }
                , [i("div", {
                    staticClass:"left", staticStyle: {
                        "text-align": "center"
                    }
                }
                , [i("img", {
                    staticStyle: {
                        width: "100px", height: "100px"
                    }
                    , attrs: {
                        src: s.qrcode
                    }
                }
                )]), s._v(" "), 1==s.moneyType?i("div", {
                    staticClass: "right"
                }
                , [i("div", [s._v("1、打开手机支付宝")]), s._v(" "), i("div", [s._v("2、点击扫一扫")]), s._v(" "), i("div", [s._v("3、扫描上方二维码，并完成支付")]), s._v(" "), i("div", [s._v("4、支付成功后，请不要关闭本窗口，等待确认支付完成！")])]):s._e(), s._v(" "), 2==s.moneyType?i("div", {
                    staticClass: "right"
                }
                , [i("div", [s._v("1、打开微信客户端")]), s._v(" "), i("div", [s._v("2、选择扫一扫")]), s._v(" "), i("div", [s._v("3、扫描左侧二维码，并完成支付")]), s._v(" "), i("div", [s._v("4、支付成功后，请不要关闭本窗口，等待确认支付完成！")])]):s._e()]):i("div", {
                    staticClass: "info"
                }
                , [i("div", {
                    staticStyle: {
                        "font-weight": "bold"
                    }
                }
                , [s._v("请选择下方的二维码支付款项")]), s._v(" "), i("div", {
                    staticStyle: {
                        color: "blue"
                    }
                }
                , [s._v("\n              人民币1元 = 1图币，单次最低充值 20 图币\n            ")]), s._v(" "), s._m(3), s._v(" "), i("div", [s._v("如果您忘记备注用户名，您可以联系客服QQ：12861862")]), s._v(" "), s._m(4)])]):s._e()])])]):s._e()])
            }
            , staticRenderFns:[function() {
                var s=this.$createElement, t=this._self._c||s;
                return t("div", {
                    staticClass: "left"
                }
                , [t("p", [this._v("1、新疆地区用户由于百度盘网络限制，请勿购买")]), this._v(" "), t("p", [this._v("2、为了达到最佳的视觉效果，建议大家使用电脑下载后解压观看")]), this._v(" "), t("p", [this._v("3、虚拟商品一经购买概不退款，如有疑问请先咨询")])])
            }
            , function() {
                var s=this.$createElement, t=this._self._c||s;
                return t("div", {
                    staticClass: "left"
                }
                , [t("p", [this._v("1、新疆地区用户由于百度盘网络限制，请勿购买")]), this._v(" "), t("p", [this._v("2、为了达到最佳的视觉效果，建议大家使用电脑下载后解压观看")]), this._v(" "), t("p", [this._v("3、虚拟商品一经购买概不退款，如有疑问请先咨询")])])
            }
            , function() {
                var s=this.$createElement, t=this._self._c||s;
                return t("div", {
                    staticClass: "intro"
                }
                , [t("b", [this._v("会员体系说明：")]), t("br"), this._v("\n            ①普通用户：累计充值未满200元，可浏览3张预览图，购图无折扣；"), t("br"), this._v("\n            ①铜卡会员：累计充值满200元，可浏览全部预览图，购图全站9折； "), t("br"), this._v("\n            ②银卡会员：累计充值满500元，可浏览全部预览图，购图全站8折； "), t("br"), this._v("\n            ③金卡会员：累计充值满1000元，可浏览全部预览图，购图全站7折；\n            "), t("br"), this._v("\n            ④铂金会员：累计充值满3000元，可浏览全部预览图，购图全站6.5折；\n            "), t("br"), this._v("\n            ⑤钻石会员：累计充值满5000元，可浏览全部预览图，购图全站5.5折；\n          ")])
            }
            , function() {
                var s=this.$createElement, t=this._self._c||s;
                return t("div", [this._v("\n              付款时，"), t("b", {
                    staticStyle: {
                        color: "red"
                    }
                }
                , [this._v("请备注您的网站用户名。")]), this._v("付款成功后，即时到账，无需担心。\n            ")])
            }
            , function() {
                var s=this.$createElement, t=this._self._c||s;
                return t("div", {
                    staticClass:"images", staticStyle: {
                        "margin-top": "50px"
                    }
                }
                , [t("span", {
                    staticStyle: {
                        "margin-right": "30px", display: "inline-block", "text-align": "center"
                    }
                }
                , [t("img", {
                    staticStyle: {
                        width: "180px"
                    }
                    , attrs: {
                        src: "/static/images/zhifubao.jpg"
                    }
                }
                )]), this._v(" "), t("span", {
                    staticStyle: {
                        display: "inline-block", "text-align": "center"
                    }
                }
                , [t("img", {
                    staticStyle: {
                        width: "180px"
                    }
                    , attrs: {
                        src: "/static/images/weixin.jpg"
                    }
                }
                )])])
            }
            ]
        }
        ;
        var d=i("VU/8")(l, h, !1, function(s) {
            i("WMbz")
        }
        , "data-v-12bd0772", null);
        t.default=d.exports
    }
    , WMbz:function(s, t) {}
    , bOdI:function(s, t, i) {
        "use strict";
        t.__esModule=!0;
        var e, a=i("C4MV"), n=(e=a)&&e.__esModule?e: {
            default: e
        }
        ;
        t.default=function(s, t, i) {
            return t in s?(0, n.default)(s, t, {
                value: i, enumerable: !0, configurable: !0, writable: !0
            }
            ):s[t]=i, s
        }
    }
    , mClu:function(s, t, i) {
        var e=i("kM2E");
        e(e.S+e.F*!i("+E39"), "Object", {
            defineProperty: i("evD5").f
        }
        )
    }
}

);