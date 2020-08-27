<template>
    <div>
        <div class="container my-3 my-lg-6">
            <div class="row mx-lg-3">
                <div class="col-lg-6">
                    <div class="CO-img-detail"
                                :style="{ backgroundImage: `url(${ product.imageUrl })` }">
                    </div>
                    <router-link :to="`/customerorders`"
                    class="btn btn-secondary back">回前頁</router-link>
                </div>
                <div class="col-lg-6">
                    <div class="py-1">
                        <span class="badge badge-fifth mt-3">{{ product.category }}</span>
                        <h3 class="d-flex text-secondary mt-1 product-t">{{ product.title }}</h3>
                        <p class="text-primary h5">【產品說明】</p>
                        <p>{{ product.description }}</p>  
                        <p class="tag">{{ product.content }}</p>  
                        <div class="d-flex">
                            <div class="pt-2">
                                <p class="h3 text-third">NT${{ product.price }}</p>
                            </div>
                            <div class="ml-auto d-flex">
                              <div class="d-flex">
                                <p class="ml-3 text-primary mt-2">數量</p>
                                <div class="form-group mx-1 mt-1 mr-2">
                                   
                                    <select class="form-control product-select" id="exampleFormControlSelect1"
                                    v-model.number="qty">
                                        <option :valus="num" v-for="num in 10" :key="num">{{ num }}</option>
                                    
                                    </select>
                                  
                                </div>
                              </div>
                                <button type="button" class="btn btn-primary py-0 cart-btn"
                                @click.stop="addtoCart(product.id, product.num)">加到購物車</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    </div>
</template>

<script>

export default {    
    data(){
        return{
            pdid: '',
            product: {},
            qty: 1

        }
    },
    methods: {
        getProduct(){
                const pdid = this.$route.params.id;
                const vm = this;
                const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${pdid}`;
                this.$http.get(api).then( ( response ) => { 
                    vm.product = response.data.product;  
            });
        },
        
        addtoCart(id,qty){
            this.$bus.$emit('cart:addtoCart', id, this.qty);       
        },
        back(){
            this.$router.go(-1);
        }
    },
    created() {
        this.getProduct();
    }
}
</script>