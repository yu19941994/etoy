(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d228e96"],{dacf:function(t,a,s){"use strict";s.r(a);var r=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"container my-3 my-lg-6"},[s("div",{staticClass:"row mx-lg-3"},[s("div",{staticClass:"col-lg-6"},[s("div",{staticClass:"CO-img-detail",style:{backgroundImage:"url("+t.product.imageUrl+")"}}),s("router-link",{staticClass:"btn btn-secondary back",attrs:{to:"/customerorders"}},[t._v("回前頁")])],1),s("div",{staticClass:"col-lg-6"},[s("div",{staticClass:"py-1"},[s("span",{staticClass:"badge badge-fifth mt-3"},[t._v(t._s(t.product.category))]),s("h3",{staticClass:"d-flex text-secondary mt-1 product-t"},[t._v(t._s(t.product.title))]),s("p",{staticClass:"text-primary h5"},[t._v("【產品說明】")]),s("p",[t._v(t._s(t.product.description))]),s("p",{staticClass:"tag"},[t._v(t._s(t.product.content))]),s("div",{staticClass:"d-flex"},[s("div",{staticClass:"pt-2"},[s("p",{staticClass:"h3 text-third"},[t._v("NT$"+t._s(t.product.price))])]),s("div",{staticClass:"ml-auto d-flex"},[s("div",{staticClass:"d-flex"},[s("p",{staticClass:"ml-3 text-primary mt-2"},[t._v("數量")]),s("div",{staticClass:"form-group mx-1 mt-1 mr-2"},[s("select",{directives:[{name:"model",rawName:"v-model.number",value:t.qty,expression:"qty",modifiers:{number:!0}}],staticClass:"form-control product-select",attrs:{id:"exampleFormControlSelect1"},on:{change:function(a){var s=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(a){var s="_value"in a?a._value:a.value;return t._n(s)}));t.qty=a.target.multiple?s:s[0]}}},t._l(10,(function(a){return s("option",{key:a,attrs:{valus:a}},[t._v(t._s(a))])})),0)])]),s("button",{staticClass:"btn btn-primary py-0 cart-btn",attrs:{type:"button"},on:{click:function(a){return a.stopPropagation(),t.addtoCart(t.product.id,t.product.num)}}},[t._v("加到購物車")])])])])])])])])},c=[],e=(s("99af"),{data:function(){return{pdid:"",product:{},qty:1}},methods:{getProduct:function(){var t=this.$route.params.id,a=this,s="".concat("https://vue-course-api.herokuapp.com","/api/").concat("yu19941994","/product/").concat(t);this.$http.get(s).then((function(t){a.product=t.data.product}))},addtoCart:function(t,a){this.$bus.$emit("cart:addtoCart",t,this.qty)},back:function(){this.$router.go(-1)}},created:function(){this.getProduct()}}),i=e,o=s("2877"),n=Object(o["a"])(i,r,c,!1,null,null,null);a["default"]=n.exports}}]);
//# sourceMappingURL=chunk-2d228e96.11e6bc0d.js.map