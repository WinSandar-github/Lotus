<template>
    <div class=container>
        <div class="row justify-content-center mt-5">
            <div class="row">

						<div class="col-2"></div>
                        <div class="col-8 grid-margin stretch-card">
                            <div class="card">
                                                <div class="card-header custom-header">
                                                        <h2 class="text-center">Registration Form </h2>
                                                </div>
                                                <div class="card-body">


                                                    <form class="forms-sample" method="post" enctype="multipart/form-data" @submit.prevent="store()">
                                                                            
                                                                            <div class="row">
                                                                                        <div class="col-6">
                                                                                            <div class="form-group mb-3">
                                                                                                <label >Name </label>
                                                                                                <input type="text" class="form-control" v-model="user.name" placeholder="Enter Name">
                                                                                                    
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-6">
                                                                                            <div class="form-group mb-3">
                                                                                                <label>Email</label>
                                                                                                    <input type="email" class="form-control" v-model="user.email"  placeholder="Enter Email">
                                                                                                    
                                                                                            </div>
                                                                                        </div>

                                                                        </div>

                                                                        <div class="row">


                                                                                    <div class="col-6">
                                                                                            <div class="form-group mb-3">
                                                                                                <label>Password</label>
                                                                                                
                                                                                                    <input type="password" id="password" class="form-control" placeholder="Enter Password"
                                                                                                        v-model.trim="$v.password.$model" autocomplete="off"
                                                                                                    :class="{ 'is-invalid':$v.password.$error}">
                                                                                                       
                                                                                                   
                                                                                                    <div class="invalid-feedback">
                                                                                                        <span v-if="!$v.password.required">Password is required</span>
                                                                                                        <span v-if="!$v.password.minLength">At least 8 characters minimum</span>
                                                                                                        
                                                                                                    </div>
                                                                                                    
                                                                                            </div>
                                                                                            <div class="form-group form-check">
                                                                                            <input type="checkbox" id="showpassword" class="form-check-input" @click="toggleShowPassword"
                                                                                            v-model="showpassword">
                                                                                            <label class="form-check-label">Show password</label>
                                                                                            </div>
                                                                                    </div>
                                                                            <div class="col-6">
                                                                            <div class="form-group mb-3">
                                                                                <label >Phone No</label>
                                                                                    <input type="text" class="form-control" v-model="user.phone" placeholder="Enter Phone No">
                                                                            
                                                                            </div>
                                                                            </div>
                                                                    </div>
                                                                    <div class="row">

                                                            <div class="col-6">
                                                                                            <div class="form-group mb-3">
                                                                                                <label>Confirm Password</label>
                                                                                                    
                                                                                                    <input type="password" class="form-control" placeholder="Enter Password"
                                                                                                            v-model.trim="$v.confirm_password.$model"
                                                                                                            autocomplete="off"
                                                                                                        :class="{ 'is-invalid':$v.confirm_password.$error,
                                                                                                        'is-valid':(password != '')? !$v.confirm_password.$invalid:''}">
                                                                                                        
                                                                                                        <div class="valid-feedback">Your password is identical!</div>
                                                                                                            <div
                                                                                                            
                                                                                                            class="invalid-feedback">
                                                                                                            <span v-if="!$v.confirm_password.sameAsPassword">Password must be identical.</span>
                                                                                                            
                                                                                                        </div>
                                                                                            </div>
                                                                                    </div>
                                                            <div class="col-6">
                                                                                        <div class="form-group mb-3">

                                                                                                <label >Address </label>
                                                                                                <textarea class="form-control" cols="155" rows="3" v-model="user.address"  placeholder="Enter Address"></textarea>
                                                                                                
                                                                                        </div>
                                                                                    </div>
                                                                    </div>

                                                                        <div class="form-group text-center mb-3">
                                                                            <button type="submit" class="btn btn-primary">Register</button>
                                                                        </div>

                                                    </form>
                                                </div>
                            </div>
                        </div>
						<div class="col-2"></div>

          </div>
        </div>

      
        
    </div>
</template>
<script>
import Form from 'vform';
import { required,minLength,sameAs } from 'vuelidate/lib/validators'
import axios from 'axios'
const USER_API_URL = 'http://localhost:9080'

export default {
    data() {
        return {
            user: new Form({
                address: '',
                name:'',
                phone:'',
                email:'',

            }),
            password:'',
            confirm_password:'',
            showpassword:false
        }
    },
    validations:{
        password:{
            required,
            minLength:minLength(8)
        },
        confirm_password:{
            sameAsPassword:sameAs('password')
        }
    },
    methods: {
        
        toggleShowPassword(){
            var show=document.getElementById('password')
            if(this.showpassword == false){
                this.showpassword =true
                show.type='text'
            }else{
                this.showpassword=false
                show.type='password'
            }
        },
        store() {
            this.$Progress.start();
            this.isLoading = true;
            let loader = this.$loading.show();
            this.user.password=this.password
               
            axios.post(`${USER_API_URL}/api/createUser`,this.user).then(w=>{
                
                    localStorage.setItem('auth',JSON.stringify(w.data));
                    this.$toast.fire({
                        icon: 'success',
                        title: 'Register successfully'
                    })
                    this.$Progress.finish();
                    this.isLoading = false;
                    loader.hide();
                    this.$router.push('/product');
                    
            })
                   
        },
        
    },
    
}
</script>
