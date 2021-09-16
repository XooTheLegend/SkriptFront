<template>
  <div class="pt-5">
    <form @submit.prevent="edit">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="newEmail" type="text" class="form-control" id="email" aria-describedby="usernameHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="newPassword" type="text" class="form-control" id="password" aria-describedby="usernameHelp" placeholder="Enter password">
      </div>
      <b-form-group id="input-group-3" label="Tip" label-for="input-3">
        <b-form-select
            id="input-3"
            v-model="newTip"
            :options="combobox"
            required
        ></b-form-select>
      </b-form-group>
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="newName" type="text" class="form-control" id="name" aria-describedby="usernameHelp" placeholder="Enter name">
      </div>
      <div class="form-group">
        <label for="surname">Surname</label>
        <input v-model="newSurname" type="text" class="form-control" id="surname" aria-describedby="usernameHelp" placeholder="Enter surname">
      </div>


      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import * as VueJwtDecode from "jsonwebtoken";

export default {

  name: "EditUser",
  data(){
    return{
      users:this.$store.state.users,
      newEmail:'',
      newPassword:'',
      newTip:'',
      newName:'',
      newSurname:'',
      combobox:['ADMIN','CONTENT_CREATOR']
    }
  },
  methods:{
    ...mapActions(['change_user']),
    validate(){
      if(this.newEmail ==='' || this.newEmail===null){
        alert('email field is required!');
        return false;
      }

      if(this.newPassword ==='' || this.newPassword===null){
        alert('password field is required!');
        return false;
      }

      if(this.newTip ==='' || this.newTip===null){
        alert('tip field is required!');
        return false;
      }

      if(this.newName ==='' || this.newName===null){
        alert('name field is required!');
        return false;
      }

      if(this.newSurname ==='' || this.newSurname===null){
        alert('surname field is required!');
        return false;
      }

      if(this.newEmail.length < 4 && this.newEmail.length>20){
        alert('email must be between 4 and 20 characters long!')
        return false;
      }

      if(this.newPassword.length < 8 && this.newPassword.length>100){
        alert('password must be between 8 and 100 characters long!')
        return false;
      }

      if(this.newTip.length < 2 && this.newTip.length>20){
        alert('tip must be between 2 and 20 characters long!')
        return false;
      }

      if(this.newName.length < 4 && this.newName.length>20){
        alert('name must be between 4 and 20 characters long!')
        return false;
      }

      if(this.newSurname.length < 4 && this.newSurname.length>20){
        alert('surname must be between 4 and 20 characters long!')
        return false;
      }
      return true;
    },
    edit() {
      if (!this.validate()) {
        return;
      }

        const u =JSON.stringify({
          email: this.newEmail,
          password: this.newPassword,
          tip: this.newTip,
          name: this.newName,
          surname: this.newSurname
        });
      //console.log(u.name)
      this.change_user({id: this.$route.params.id, user: u});
      this.$router.push({name: "Admin"});
    }
  },
  mounted(){
    let user=null;
    for(let i=0;i<this.users.length;i++){
      if(this.users[i].id === parseInt(this.$route.params.id)){
        user = this.users[i];
      }
    }

    this.newEmail = user.email;
    this.newPassword = user.password;
    this.newTip = user.tip;
    this.newName = user.name;
    this.newSurname = user.surname;

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