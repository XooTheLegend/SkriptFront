<template>
  <div class="pt-5 container">
    <h1 v-if="username">Hello, {{username}}</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username">
        <small id="usernameHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    validate(){
      if(this.username==='' || this.username===null){
        alert('Username field is empty!');
        return false;
      }

      if(this.password==='' || this.password===null){
        alert('password field is empty!');
        return false;
      }

      if(this.username.length < 4 && this.username.length > 20){
        alert('username must be between 4 and 20 characters!');
        return false;
      }

      if(this.password.length < 8 && this.password.length > 64){
        alert('password must be between 8 and 64 characters!');
        return false;
      }

      return true;

    },
    login(){
      if(!this.validate()){
        return;
      }
      const datax = JSON.stringify({
        email:this.username,
        password:this.password
      });
      fetch('http://localhost:8080/api/login',{
        method: 'post',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: datax

      }).then((response)=>{
        if (!response.ok)
          alert('Wrong email/password')

        return response.json()
      }).then(data=>{
        localStorage.setItem('jwt',data.jwt);
        this.$router.push({name:"Home"})
      })
    }
  }
}
</script>

<style scoped>

</style>