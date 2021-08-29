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
    back(){
      var data = {
        email:this.email,
        password:this.password,
        tip:this.tip,
        name:this.name,
        surname:this.surname
      }
      data = JSON.stringify(data)
      if(this.password === this.repeatedPassword){
        this.new_user(data).then(()=>{
          this.$router.push({name:"Admin"})
        }).catch(e => {
          console.log(e);
          alert("Vec postoji korisnik sa tim emailom")
        });
      } else {
        alert("Password's doesn't match!");
      }
    }
  }
}
</script>

<style scoped>

</style>