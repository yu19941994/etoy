<template>
    <div>
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="sidebar-sticky pt-3 px-2">
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>管理員</span>
                <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                    <span data-feather="plus-circle"></span>
                </a>
                </h6>               
                <ul class="nav flex-column mb-2 text-primary">
                    <li class="nav-item">
                        <router-link to="/admin/products"> <a href="#" class="nav-link"
                        :class="{'active': choose === 'p'}" @click="choose='p'">
                        產品列表</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/orders"> <a href="#" class="nav-link" 
                        :class="{'active': choose === 'o'}" @click="choose='o'">
                        訂單列表</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                       <router-link to="/admin/coupons"> <a href="#" class="nav-link"
                       :class="{'active': choose === 'c'}" @click="choose='c'">
                        優惠券</a>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data(){
        return{
            choose: ''
        }
    }
}
</script>