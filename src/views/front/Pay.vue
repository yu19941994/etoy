<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-8 my-2">
                    <div class="bg-primary paytext px-2 py-1 my-2 text-center">
                         <h3 class="text-forth">購買資訊</h3>
                    </div>
                    <table class="table">
                        <thead>
                            <tr class="table-third">
                                <th scope="col">商品名稱</th>
                                <th scope="col">數量</th>
                                <th scope="col" class="text-right">金額</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in order.products" :key="item.id">
                                <td scope="row">{{ item.product.title }}</td>
                                <td>{{ item.qty }}/{{ item.product.unit}}</td>
                                <td class="text-right">{{ item.product.price|currency }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>
                                    <p class="d-inline d-md-none">總價</p>
                                </td>
                                <td class="text-right h5 text-primary ">
                                    <p class="d-none d-md-inline">總價</p>{{ order.total|currency }}
                                </td>
                            </tr>
          
                        </tfoot>
                    </table>                   
                </div>

                <div class="col-8 my-2">
                    <div class="bg-primary paytext px-2 py-1 my-2 text-center">
                         <h3 class="text-forth">付款人資訊</h3>
                    </div>
                    <table class="table">
                        <thead>
                            <tr class="table-third">
                                <th scope="col">訂單資料</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">姓名</th>
                                <td>{{ order.user.name }}</td>
                            </tr>
                             <tr>
                                <th scope="row">電話</th>
                                <td>{{ order.user.tel }}</td>
                            </tr>
                             <tr>
                                <th scope="row">Email</th>
                                <td>{{ order.user.email }}</td>
                            </tr>
                             <tr>
                                <th scope="row">地址</th>
                                <td>{{ order.user.address }}</td>
                            </tr>
                             <tr>
                                <th scope="row">付款狀態</th>
                                <td>
                                    <span v-if="!order.is_paid">尚未付款</span>
                                    <span v-else class="text-success">付款完成</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
               
                <div class="col-8 btn-group mt-4" role="group">
                    <router-link  :to="`/customerorders`" type="button" class="mx-2 btn btn-forth btn-checkout rounded-0 text-primary btn-md"><b>繼續購物</b></router-link>
                    <button type="submit" class="mx-2 btn btn-fifth btn-checkout rounded-0 text-forth btn-md"
                    @click.prevent="payOrder"><b>確認付款</b></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            orderId: '',
            order: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: ''
                }
            }
        }
    },
    methods: {
        getOrder(){
                const vm = this;
                const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
                this.$http.get(api).then( ( response ) => { 
                    vm.order= response.data.order;
                
            });
        },
        payOrder(){
                const vm = this;
                const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
                this.$http.post(api).then( ( response ) => {             
                    if(response.data.success){
                        vm.getOrder();
                    }
            });

        }
    },

    created(){
        // 取得網址上的 orderId
        this.orderId = this.$route.params.orderId;
        console.log(this.orderId);
        this.getOrder();
    }
}
</script>