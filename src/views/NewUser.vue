<template>
  <div class="pt-5">
    <form @submit.prevent="back">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="text" class="form-control" id="email" aria-describedby="usernameHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" aria-describedby="usernameHelp" placeholder="Enter password">
      </div>
      <div class="form-group">
        <label for="repeatedPassword">Repeat Password</label>
        <input v-model="repeatedPassword" type="password" class="form-control" id="repeatedPassword" aria-describedby="usernameHelp" placeholder="Repeat password">
      </div>
      <b-form-group id="input-group-3" label="Tip" label-for="input-3">
        <b-form-select
            id="input-3"
            v-model="tip"
            :options="combobox"
            required
        ></b-form-select>
      </b-form-group>
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" type="text" class="form-control" id="name" aria-describedby="usernameHelp" placeholder="Enter name">
      </div>
      <div class="form-group">
        <label for="surname">Surname</label>
        <input v-model="surname" type="text" class="form-control" id="surname" aria-describedby="usernameHelp" placeholder="Enter surname">
      </div>


      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions} from 'vuex';
import * as VueJwtDecode from "jsonwebtoken";
export default {
  name: "NewUser",
  data(){
    return{
      email:'',
      password:'',
      tip:'',
      name:'',
      surname:'',
      repeatedPassword:'',
      combobox:['ADMIN','CONTENT_CREATOR']
    }
  },
  methods:{
    ...mapActions(['new_user']),
    validate(){
      if(this.email ==='' || this.email===null){
        alert('email field is required!');
        return false;
      }

      if(this.password ==='' || this.password===null){
        alert('password field is required!');
        return false;
      }

      if(this.tip ==='' || this.tip===null){
        alert('tip field is required!');
        return false;
      }

      if(this.name ==='' || this.name===null){
        alert('name field is required!');
        return false;
      }

      if(this.surname ==='' || this.surname===null){
        alert('surname field is required!');
        return false;
      }

      if(this.email.length < 4 && this.email.length>20){
        alert('email must be between 4 and 20 characters long!')
        return false;
      }

      if(this.password.length < 8 && this.password.length>100){
        alert('password must be between 8 and 100 characters long!')
        return false;
      }

      if(this.tip.length < 2 && this.tip.length>20){
        alert('tip must be between 2 and 20 characters long!')
        return false;
      }

      if(this.name.length < 4 && this.name.length>20){
        alert('name must be between 4 and 20 characters long!')
        return false;
      }

      if(this.surname.length < 4 && this.surname.length>20){
        alert('surname must be between 4 and 20 characters long!')
        return false;
      }
      return true;
    },
    back(){
      if(!this.validate()){
        return;
      }
      const data = JSON.stringify({
        email: this.email,
        password: this.password,
        tip: this.tip,
        name: this.name,
        surname: this.surname
      });

      if(this.password === this.repeatedPassword){
        this.new_user(data).then(()=>{
          this.$router.push({name:"Admin"})
        });
      } else {
        alert("Password's doesn't match!");
      }
    }
  },
  beforeRouteEnter(to,from,next) {
    const jwt = localStorage.getItem('jwt')
    try{
      let decoded = VueJwtDecode.decode(jwt)
      if(decoded.user.tip==='ADMIN'){
        console.log('ADMIN JE')
        next();
      }else{
        console.log('NIJE ADMIN')
        next({name:"Home"})
      }
    } catch(error){
      console.log(error, 'error from decoding jwt')
      next({name:"Home"})
    }
  }
}
</script>

<style scoped>

</style>