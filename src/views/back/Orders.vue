<template>
    <div>
    <loading :active.sync="isLoading"></loading>
       <div class="table-responsive mt-5">
            <table class="table table-striped">
            <thead>
                <th width="120">訂單編號</th>
                <th width="150">客戶姓名</th>
                <th>購買日期</th>
                <th>總價</th>
                <th width="120">付款狀態</th>
                <th>客戶留言</th>
                <th width="120">編輯</th>
            </thead>
            <tbody>
                <tr v-for="item in orders" :key="item.id">
                <td class="align-middle">
                {{ item.num }}
                </td>
                <td class="align-middle">
                    {{ item.user.name }}
                </td>
                <td class="align-middle">
                    {{ item.create_at| formatDate }}
                </td>
                <td class="align-middle">
                    {{ item.total }}
                </td>
                <td class="align-middle">
                    <span v-if="!item.is_paid">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                </td>
                <td class="align-middle">
                    {{ item.message }}
                </td>
                <td class="align-middle">
                    <button type="button" class="btn btn-outline-secondary btn-sm"
                    @click.prevent="openModal(item)">
                    編輯
                    </button>
                </td>
                </tr>
            </tbody>
        </table>
       </div>
        <!-- Pagination -->
        <Pagination :pagination="pagination" @gP="getOrderList"></Pagination>

         <!-- Modal -->
        <div class="modal fade" id="editOrderModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>修改訂單</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body"> 
                    <div class="row justify-content-center">
                    <div class="col-sm-8">
                        <div class="form-group">
                            <label for="num">訂單編號</label>
                            <input type="number" class="form-control" id="num"
                            v-model="tempOrder.num"  placeholder="請輸入編號">
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="userName">客戶姓名</label>
                            <input type="text" class="form-control" id="userName"
                            v-model="tempOrder.user.name" placeholder="請輸入姓名">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tel">客戶電話</label>
                            <input type="number" class="form-control" id="tel"
                            v-model="tempOrder.user.tel" placeholder="請輸入單位">
                        </div>
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="address">客戶地址</label>
                            <input type="text" class="form-control" id="address"
                            v-model="tempOrder.user.address" placeholder="請輸入電話">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="email">客戶Email</label>
                            <input type="email" class="form-control" id="email"
                            v-model="tempOrder.user.email" placeholder="請輸入信箱">
                        </div>
                        </div>
                        <hr>

                        <div class="form-group">
                        <label for="message">客戶留言</label>
                        <textarea type="text" class="form-control" id="message"
                        v-model="tempOrder.message"  placeholder="請輸入留言"></textarea>
                        </div>
                        
                        <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                            v-model="tempOrder.is_paid"
                            :true-value="1"
                            :false-value="0"
                            id="is_paid">
                            <label class="form-check-label" for="is_paid">
                            是否付款
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="editOrderList">確認</button>
                </div>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../../components/pagination';
import { mapGetters, mapActions } from 'vuex';

export default {
    data(){
        return{
            orders:[],
             tempOrder:{
                
                user: {
                address: "",
                email: "",
                name: "",
                tel: ""
                },
            }
        }
    },
    components: {Pagination},
    methods: {
        getOrderList(page = 1){
            const vm = this;
            const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders/?page=${page}`;
            vm.$store.dispatch('updateLoading', true);
            this.$http.get(url).then((response) => {
                vm.orders = response.data.orders;
                vm.$store.dispatch('updateLoading', false);
                vm.$store.state.pagination = response.data.pagination;
                });
        },
        openModal(item){
            this.tempOrder = Object.assign({},item);
            $('#editOrderModal').modal('show');
            
        },
        editOrderList(){
            const vm = this;
            const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
            vm.$store.dispatch('updateLoading', true);
            this.$http.put(url, { data: this.tempOrder }).then((response) => {
                if(response.data.success){
                    $('#editOrderModal').modal('hide');
                    vm.getOrderList();
                }
                vm.$store.dispatch('updateLoading', false);
            });
        }
    },
    computed: {
       ...mapGetters(['isLoading']),
        pagination(){
            return this.$store.state.pagination;
        }
    },
    created(){
        this.getOrderList();
    },
}
</script>
