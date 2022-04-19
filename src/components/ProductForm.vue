<template >
<div>
    <HeaderComponent/>
    <div class="container my-5 vld-parent" >
        
        <div class="row g-3">
            <div class="col-4">
                <div class="card">
                   
                    <div class="card-body">
                        <AlertError :form="product" :message="message" />
                        <form @submit.prevent="isEditMode ? update() : store()" >
                            <div class="mb-3">
                                <input  type="text" v-model="product.name" class="form-control " placeholder="Name" autocomplete="off" required>
                                
                            </div>
                            <div class="mb-3">
                                <input  type="number" v-model="product.price" class="form-control " placeholder="Price" autocomplete="off" required>
                                
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="submit" class="btn btn-primary"  ><i class="far fa-save"></i> Save</button>
                            </div>
                            
                        </form>

                    </div>
                </div>
            </div>
            <div class="col-8">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{product.id}}</td>
                            <td>{{product.name}}</td>
                            <td>${{product.price}}</td>
                            <td>
                                <button type="button" class="btn btn-info" @click="edit(product)"><i class="far fa-edit"></i></button>
                                <button type="button" class="btn btn-danger" @click="destory(product.id)"><i class="far fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
            
    </div>
</div>

</template>

<script>
import HeaderComponent from "./HeaderComponent.vue"
import Form from 'vform'
const USER_API_URL = 'http://localhost:9080'
import axios from 'axios'
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  components: {
    HeaderComponent
  },
  data() {
        return {
            isEditMode: false,
            search:'',
            products: {},
            product: new Form({
                name: '',
                price: '',
            }),
            message:'',
            
        }
    },
    methods:{
        store() {
            this.$Progress.start();
            this.isLoading = true;
            let loader = this.$loading.show();
             this.product.post(`${USER_API_URL}/api/createProduct`)
                .then(res => {
                    if(res.status){
                        this.isLoading = false;
                        loader.hide();
                        this.view();
                        this.product.name="";
                        this.product.price="";
                        this.$toast.fire({
                            icon: 'success',
                            title: 'Created successfully'
                        })
                    }
                    this.$Progress.finish()
                })
                .catch(error=>{
                    this.$toast.fire({
                            icon: 'danger',
                            title: 'Plaease check again'+error
                    })
                    this.$Progress.fail();
                });
             
        },
        view() {
            this.$Progress.start();
            axios.get(`${USER_API_URL}/api/getProduct`)
                .then(res => {
                    this.products = res.data;
                    this.$Progress.finish();
                })
                .catch(error=>{
                    this.message=error.data;
                    this.$Progress.fail();
                });
        },
        edit(product) {
            this.product.clear();
            this.isEditMode = true;
            this.product.id = product.id,
            this.product.name = product.name,
            this.product.price = product.price
        },
        update() {
           this.$Progress.start();
           this.isLoading = true;
            let loader = this.$loading.show();
            this.product.put(`${USER_API_URL}/api/updateProduct`)
                .then(res => {
                    console.log(res)
                    this.view();
                    this.product.name="";
                    this.product.price="";
                    this.$toast.fire({
                        icon: 'success',
                        title: 'Updated successfully'
                    });
                    this.$Progress.finish()
                    this.isLoading = false;
                    loader.hide();
                    this.isEditMode = false;
                })
                .catch(error=>{
                    this.message=error.response.data.message;
                    this.$Progress.fail();
                })
        },
        destory(id) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    this.isLoading = true;
                    let loader = this.$loading.show();
                    this.product.delete(`${USER_API_URL}/api/deleteProduct/${id}`)
                        .then(res => {
                            console.log(res)
                            this.isLoading = false;
                            loader.hide();
                            this.view();
                            this.$toast.fire({
                                icon: 'success',
                                title: 'Deleted successfully'
                            })
                        })
                    
                }
            })
        }
    },
    created() {
        this.view();
    }
}
</script>
 
