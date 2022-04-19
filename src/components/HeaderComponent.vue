<template>
    <div>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand"> Vue Golang</a>
          <form class="d-flex">
          
            <span class=" me-2">{{this.name}}</span>
            <button class="btn btn-outline-danger" type="submit">
              <span v-if="auth" @click="logout" class="d-sm-inline d-none">Logout</span>
              <span v-else class="d-sm-inline d-none" @click="login">Login</span>
            </button>
          </form>
        </div>
      </nav>
       
        
    </div>
</template>

<script>
export default({
   
    data(){
      return{
        auth:false,
        name:''
      }
    },
    methods: {
        logout(){
            localStorage.clear();
            this.$router.push('/');
        },
        login(){
          this.$router.push('/');
        }
    },
    created() {
      if(localStorage.getItem('auth')){
        this.auth=true
        this.name=JSON.parse(localStorage.getItem('auth')).name
      }
    },
})
</script>