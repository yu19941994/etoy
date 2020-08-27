<template>
    <div>
        <loading :active.sync="isLoading"></loading>

        <!-- 優惠券列表 -->
        <div class="text-right">
            <button class="btn btn-secondary mt-4" 
             @click="openModal(true)">建立新的優惠券</button>
       </div>
       <div class="table-reponsive mt-4">
           <table class="table table-striped">
            <thead>
                <tr>
                    <th>標題</th>
                    <th width="80">折扣</th>
                    <th >到期日</th>
                    <th width="120">折扣碼</th>
                    <th>是否啟用</th>
                    <th width="150">編輯</th>
                   
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in coupons" :key="item.id">
                    <td>{{ item.title }}</td>
                     <!-- 有金額都靠右 -->
                    <td>
                        {{ item.percent }}
                    </td>
                    <td>{{ item.due_date|date }}</td>
                    <td>
                        {{ item.code }}
                    </td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <div class="btn-group my-2">
                            <button class="btn btn-outline-secondary btn-sm" 
                            @click.prevent="openModal(false, item)">編輯</button>
                            <button class="btn btn-outline-secondary btn-sm "
                            @click.prevent="openDelModal(item)">刪除</button>
                        </div>
                    </td>
                </tr>
            </tbody>
       </table>
       </div>

       <!-- Modal -->
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content border-0">
                        <div class="modal-header bg-dark text-white">
                            <h5 class="modal-title" id="exampleModalLabel">
                            <span v-if="!isNew">編輯優惠券</span>
                            <span v-else>新增優惠券</span>
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm">
                                    <div class="form-group">
                                        <label for="title">標題</label>
                                        <input type="text" class="form-control" id="title"
                                        v-model="tempCoupon.title"  placeholder="請輸入標題">
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="percent">折扣</label>
                                            <input type="number" class="form-control" id="percent"
                                            v-model="tempCoupon.percent" placeholder="請輸入折扣">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="dueDate">到期日</label>
                                            <input type="date" class="form-control" id="dueDate"
                                            v-model="due_Date" placeholder="請輸入到期日">
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="code">折扣碼</label>
                                            <input type="text" class="form-control" id="code"
                                            v-model="tempCoupon.code" placeholder="請輸入折扣碼">
                                        </div>
                                        
                                        <div class="form-group">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                v-model="tempCoupon.is_enabled"
                                                :true-value="1"
                                                :false-value="0"
                                                id="is_enabled">
                                                <label class="form-check-label" for="is_enabled">
                                                是否啟用
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" @click="updateCoupons">確認</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 刪除Modal -->
            <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>刪除優惠券</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger"
                    @click="deleteCoupon()">確認刪除</button>
                </div>
                </div>
            </div>
            </div>
        </div>
</template>

<script>
import $ from 'jquery';

export default {
    data(){
        return{
            // isLoading: false,
            coupons: [],
            tempCoupon: {},
            isNew: false,
            due_Date: new Date()
        }
    },
    methods: {
        getCoupons(){
            const api = `${ process.env.VUE_APP_API }/api/${ process.env.VUE_APP_CUSTOMPATH }/admin/coupons`;
            // 因為要把取得的內容存到 data 中的 products[]陣列
            const vm = this;
            vm.$store.dispatch('updateLoading', true);
            this.$http.get(api).then( ( response ) => { 
                vm.$store.dispatch('updateLoading', false);
                vm.coupons = response.data.coupons;
            })
        },
        openModal(isNew, item){            
            if(isNew){
                this.tempCoupon = {},
                this.isNew = true
            }else{
                // Object.assign 是 ES6 寫法，意思是將 item 寫進一個空物件裡
                this.tempCoupon = Object.assign({},item),
                this.isNew = false
            }
            $('#couponModal').modal('show');
        },
        openDelModal(item){
            this.tempCoupon = item;
            $('#delCouponModal').modal('show');
        },
        updateCoupons(){
            let api = `${ process.env.VUE_APP_API }/api/${ process.env.VUE_APP_CUSTOMPATH }/admin/coupon`;
            let httpMethod = 'post';
            const vm = this;
            if(!vm.isNew){
                api = `${ process.env.VUE_APP_API }/api/${ process.env.VUE_APP_CUSTOMPATH }/admin/coupon/${vm.tempCoupon.id}`;
                httpMethod = 'put';
            }
            this.$http[httpMethod](api, { data: vm.tempCoupon }).then( ( response ) => { 
                if(response.data){
                    $('#couponModal').modal('hide');
                    // 關閉 Modal 後，重新取得一次遠端資料
                    vm.getCoupons();
                }else{
                    $('#couponModal').modal('hide');
                    // 關閉 Modal 後，重新取得一次遠端資料
                    vm.getCoupons();
                    console.log('新增失敗')
                }
            })
        },
        deleteCoupon(){
            const vm = this;
            const api = `${ process.env.VUE_APP_API }/api/${ process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
            // 因為要把取得的內容存到 data 中的 products[]陣列
            
            this.$http.delete(api).then( ( response ) => { 
                if(response.data){
                    $('#delCouponModal').modal('hide');
                    // 關閉 Modal 後，重新取得一次遠端資料
                    vm.getCoupons();
                }else{
                    $('#delCouponModal').modal('hide');
                    // 關閉 Modal 後，重新取得一次遠端資料
                    vm.getCoupons();
                    console.log('刪除失敗')
                }
            
            })
        }
    },
    watch:{
        due_Date(){
            const vm = this;
            const timestamp = Math.floor(new Date(vm.due_Date) / 1000);
            vm.tempCoupon.due_date = timestamp;
        }
    },
    computed: {
      isLoading(){
          return this.$store.state.isLoading;
      }
    },
    created(){
        this.getCoupons();
    },
   
}
</script>
