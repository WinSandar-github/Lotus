<template>
    <div class=container>
        <div class="row justify-content-center mt-5">
            <div class=col-md-8>
                <div class=card>
                    <div class=card-header>Login </div>

                    <div class=card-body>
                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">Email</label>

                            <div class="col-md-6">
                                <input id="email" type="email" v-model="user.email" class="form-control" name="email"  required autocomplete="email" autofocus>

                                
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" v-model="user.password" class="form-control " name="password" required autocomplete="current-password">

                                
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" >

                                    <label class="form-check-label" for="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-0">
                            
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-primary me-md-2" type="submit" @click="login">Login</button>
                                <router-link class="btn btn-primary" to="/register">
                                   Register
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import Form from 'vform';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios'

const USER_API_URL = 'http://localhost:9080'
    export default {
        data(){
            return{
               
                user:new Form({
                    email:'',
                    password:''
                }),
                token:'',
                user_info:{
                    name:''
                },
            }
        },
        methods:{
            login(){
                
                this.isLoading = true;
                let loader = this.$loading.show();
                this.user.post(`${USER_API_URL}/api/login`)
                    .then(msg=>{
                        this.isLoading = false;
                        loader.hide();
                        this.token=msg.data.token;
                        this.getUser();
                        
                    })
                   
            },
            getUser(){
                    axios.get(`${USER_API_URL}/api/getUser`,
                        {
                        headers:{
                            "key":this.token,
                            withCredentials:true,
                        }
                    })
                    .then(res=>{
                                this.user_info.name=res.data;
                                localStorage.setItem('auth',JSON.stringify(this.user_info));
                                    this.$toast.fire({
                                        icon: 'success',
                                        title: 'Login successfully'
                                    })
                                    
                                    this.$router.push('/product');
                            })
                        
            }
        }
    }
</script>