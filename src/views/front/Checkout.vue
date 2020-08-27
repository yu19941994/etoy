<template>
    <div>
        <div class="container my-md-5">
            <div class="row flex-row-reverse">
                <!-- 右邊購物明細 -->
                <div class="col-md-6">
                    <!--明細-->
                    <ul class="list-group list-group-flush checkoutdetail">
                        <li class="list-group-item bg-third h4 text-secondary">購物清單</li>
                        <li class="list-group-item">
                             <div class="d-flex table mb-0">
                                <table class="table mb-0 table-borderless">
                                    <tbody>
                                        <tr v-for="item in carts.carts" :key="item.id">
                                            <td @click.prevent="removeCartItem(item.id)"><i class="fas fa-trash-alt pr-1"></i></td>
                                            <td>{{ item.product.title }}</td>
                                            <td>{{ item.qty }}<span>{{ item.product.unit }}</span></td>
                                            <td class="text-right">{{ item.total|currency }}</td>
                                        </tr>
                                    </tbody>
                                </table>  
                            </div>
                        </li>
                        <li class="list-group-item">
                            <p class="text-primary text-right h5"><b>總計:{{ carts.total|currency }}</b></p>
                            <p  v-if="carts.final_total !== carts.total" class="text-fifth text-right h5"><b>折扣價:{{ carts.final_total|currency }}</b></p>
                        </li>
                        
                    </ul>

                    <!-- 按鈕 -->
                    <div class="checkoutdetail my-3 p-2">
                        <div class="input-group">
                        <input type="text" class="form-control" placeholder="輸入優惠券代碼" v-model="coupon_code">
                        <div class="input-group-append">
                            <span class="input-group-text bg-third text-muted" id="basic-addon2" @click.prevent="addCoupon">使用優惠券</span>
                        </div>
                        </div>
                    </div>      
                    
                </div>
                <!-- 左邊表格 -->
                <ValidationObserver class="col-md-6" v-slot="{ handleSubmit }">
                    <form class="bg-primary px-4 py-4 text-forth" @submit.prevent="handleSubmit(createOrder)">
                        <p class="h1">資料</p>
                        <div class="row ">
                            <div class="form-group col">
                                <label for="username">姓名</label>
                                <ValidationProvider rules="required" v-slot="{ errors }" name="name">
                                    <input type="text" class="form-control" id="username"
                                    v-model="form.user.name" placeholder="輸入姓名"
                                    :class="{ 'is-invalid': errors[0] }">
                                    <span class="text-danger">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <div class="form-group col">
                                <label for="usertel">電話</label>
                                <ValidationProvider rules="required|numeric|min:8|max:10" v-slot="{ errors }" name="Email">
                                    <input type="tel" class="form-control" id="usertel" 
                                    v-model="form.user.tel" placeholder="請輸入電話"
                                    :class="{ 'is-invalid': errors[0] }">
                                    <span class="text-danger">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="useremail">Email</label>
                            <ValidationProvider rules="required|email" v-slot="{ errors }" name="email">
                                <input type="email" class="form-control" id="useremail"
                                v-model="form.user.email" placeholder="請輸入 Email" 
                                :class="{ 'is-invalid': errors[0] }">
                                <span class="text-danger">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <label for="useraddress">收件地址</label>
                            <ValidationProvider rules="required" v-slot="{ errors }" name="address">
                                <input type="text" class="form-control" id="useraddress" 
                                v-model="form.user.address" placeholder="請輸入地址"
                                :class="{ 'is-invalid': errors[0] }">
                                <span class="text-danger">{{ errors[0] }}</span>
                            </ValidationProvider>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">備註（選填）</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" 
                            v-model="form.message" rows="3"></textarea>
                        </div>
                        <div class="btn-group w-100 mt-2" role="group">
                            <router-link  :to="`/customerorders`" type="button" class="btn btn-forth btn-checkout rounded-0 text-primary btn-lg"><b>返回購物</b></router-link>
                            <button type="submit" class="btn btn-forth btn-checkout rounded-0 text-primary btn-lg"><b>金流付款</b></button>
                        </div>
                    </form>
                   
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            carts: {carts:[]},
            coupon_code:'',
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: ''
                },
                message: ''
            }
        }
    },
    methods: {
        getCart(){
                const vm = this;
                const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
                this.$http.get(api).then( ( response ) => {         
                    vm.carts = response.data.data;
                
            });
        },
        removeCartItem(id){
                const vm = this;
                const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
                this.$http.delete(api).then( ( response ) => {             
                    vm.getCart();
            });
        },
        addCoupon(){
                const vm = this;
                const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
                const coupon = {
                    code: vm.coupon_code
                }
                this.$http.post(api, {data: coupon} ).then( ( response ) => { 
                    vm.getCart();
            });
        },
        createOrder(){
                const vm = this;
                const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
                const order = vm.form
                this.$http.post(api, {data: order} ).then( ( response ) => { 
                    if(response.data.success){
                        vm.$router.push(`/pay/${response.data.orderId}`);
                    }
                
            });
        }
    },
    created(){
        this.getCart();
    }
}
</script>