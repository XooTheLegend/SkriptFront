<template>
  <div id="nav">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item><router-link to="/">Vesti</router-link></b-nav-item>
        <b-nav-item v-if="logedin===false"><router-link to="/login">Login</router-link></b-nav-item>
        <b-nav-item v-if="logedin && tip==='ADMIN'"><router-link to="/admin">Users</router-link></b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-button v-if="logedin" @click="clear">log out</b-button>
        <h1 v-if="logedin">Hi: {{user.email}}</h1>
      </b-navbar-nav>

    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      logedin:false,
      user:null,
      tip:''
    }
  },
  beforeUpdate(){
    if(!(localStorage.getItem('jwt') === '' || localStorage.getItem('jwt') === null)){
      this.logedin = true
      const jwt = localStorage.getItem('jwt');
      const payload = JSON.parse(atob(jwt.split('.',)[1]));
      this.user = payload.user;
      this.tip = this.user.tip
    }
  },
  methods:{
    clear(){
      localStorage.setItem('jwt','');
      this.logedin=false
      this.$router.push({name:"Login"})
    }
  }
}
</script>

<style scoped>

</style>