<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right">
            <button class="btn btn-secondary mt-4" 
             @click="openModal(true)">新增產品</button>
       </div>

        <div class="table-responsive mt-4">
                <table class="table table-striped">
                <thead>
                    <tr>
                    <th width="140">分類</th>
                    <th>產品名稱</th>
                    <th class="text-left">原價</th>
                    <th class="text-left">售價</th>
                    <th width="120">是否啟用</th>
                    <th width="150">編輯</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in products" :key="item.id">
                    <td>{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.origin_price| currency }}</td>
                    <td>{{ item.price| currency}}</td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <div class="btn-group my-2">
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click="openModal(false, item)">編輯</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click="openDelModal(item)">刪除</button>
                        </div>
                    </td>
                    </tr>
             
                
                    
                </tbody>
                </table>
        </div>
        <Pagination :pagination="pagination" @gP="getProducts"></Pagination>

        <!-- Modal -->
        <div class="modal fade" id="productsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <span v-if="!isNew">編輯產品</span>
                        <span v-else>新增產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                            <label for="image">輸入圖片網址</label>
                            <input type="text" class="form-control" id="image"
                            v-model="tempProduct.imageUrl"  placeholder="請輸入圖片連結">
                            </div>
                            <div class="form-group">
                            <label for="customFile">或 上傳圖片
                                <i class="fas fa-spinner fa-spin"></i>
                            </label>
                            <input type="file" id="customFile" class="form-control" 
                            ref="files" @change="uploadFile">
                            </div>
                             <!-- 預覽 -->
                            <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                            class="img-fluid" alt="" :src="tempProduct.imageUrl">
                        </div>
                        <div class="col-sm-8">
                            <div class="form-group">
                                <label for="title">標題</label>
                                <input type="text" class="form-control" id="title"
                                v-model="tempProduct.title"  placeholder="請輸入標題">
                            </div>

                            <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="category">分類</label>
                                <input type="text" class="form-control" id="category"
                                v-model="tempProduct.category" placeholder="請輸入分類">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">單位</label>
                                <input type="unit" class="form-control" id="unit"
                                v-model="tempProduct.unit" placeholder="請輸入單位">
                            </div>
                            </div>

                            <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="origin_price">原價</label>
                                <input type="number" class="form-control" id="origin_price"
                                v-model="tempProduct.origin_price" placeholder="請輸入原價">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">售價</label>
                                <input type="number" class="form-control" id="price"
                                v-model="tempProduct.price" placeholder="請輸入售價">
                            </div>
                            </div>
                            <hr>

                            <div class="form-group">
                            <label for="description">產品描述</label>
                            <textarea type="text" class="form-control" id="description"
                            v-model="tempProduct.description"  placeholder="請輸入產品描述"></textarea>
                            </div>
                            <div class="form-group">
                            <label for="content">說明內容</label>
                            <textarea type="text" class="form-control" id="content"
                            v-model="tempProduct.content"  placeholder="請輸入產品說明內容"></textarea>
                            </div>
                            <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                v-model="tempProduct.is_enabled"
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
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="updateProducts">Save changes</button>
                </div>
                </div>
            </div>
        </div>

        <!-- del Modal-->
        <div class="modal fade" id="delProductsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                       刪除產品
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    確定刪除 <span class="text-fifth">{{ tempProduct.title }}</span> 嗎?（刪除後將無法回復）
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="delProducts">Yes</button>
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
  name: 'App',
  data(){
      return{
          products: [],
          tempProduct: {},
          isNew: true,
      }
  },
  methods: {
    openModal(isNew, item){
        if(isNew){
            this.tempProduct = {};
            this.isNew = true;
        }else{
            this.tempProduct = Object.assign({},item);
            this.isNew = false;
        }
        $(productsModal).modal('show');
    },
    openDelModal(item){
        this.tempProduct = Object.assign({},item);
        $(delProductsModal).modal('show');
    },
    // 取得商品列表
    getProducts(page = 1){
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/?page=${page}`;
        const vm = this;
        vm.$store.dispatch('updateLoading', true);
        this.$http.get(api).then( ( response ) => { 
            vm.$store.dispatch('updateLoading', false);
            vm.products = response.data.products;
            vm.$store.state.pagination = response.data.pagination;
            })
    },
    // 新增商品、修改產品
    updateProducts(){
        let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
        let httpMethod = 'post';
        const vm = this;
        if(!vm.isNew){
            api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${ vm.tempProduct.id }`;
            httpMethod = 'put';
        }
        this.$http[httpMethod](api, { data: vm.tempProduct }).then( ( response ) => { 
            if(response.data){
                vm.getProducts();
                $(productsModal).modal('hide');
            }else{
                vm.getProducts();
                console.log('失敗')
            }       
        })
    },
    // 刪除產品
    delProducts(){
        const vm = this;
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${ vm.tempProduct.id }`;       
        this.$http.delete(api).then( ( response ) => { 
            vm.getProducts();
            $(delProductsModal).modal('hide');
            })
    },
    // 上傳圖片
    uploadFile(){
        console.log(this);
        const uploadFile = this.$refs.files.files[0];
        const vm = this;
        const formData = new FormData();
        // 將欄位新增進去
        formData.append('file-to-upload',uploadFile)
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
       
        this.$http.post(api, formData, {
            // 要傳送表單，要將格式改成 form-data 的格式
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then( ( response ) => { 
            if(response.data.success){
                vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
            }else{
                this.$bus.$emit('message:push', response.data.message, 'danger')
            }
        })
    }
  },
  components:{
      Pagination
  },
  computed: {
    ...mapGetters(['isLoading']),
    pagination(){
      return this.$store.state.pagination;
    }
  },
  created(){
      this.getProducts();
  },
}
</script>