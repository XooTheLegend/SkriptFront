<template>
  <div class="pt-5">
    <form @submit.prevent="back">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="newEmail" type="text" class="form-control" id="email" aria-describedby="usernameHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="newPassword" type="password" class="form-control" id="password" aria-describedby="usernameHelp" placeholder="Enter password">
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
import {mapState,mapActions} from 'vuex';
export default {

  name: "EditUser",
  data(){
    return{
      users:[],
      user:{},
      newEmail:'',
      newPassword:'',
      newTip:'',
      newName:'',
      newSurname:'',
      combobox:['ADMIN','CONTENT_CREATOR']
    }
  },
  methods:{
    ...mapActions(['change_user'])
  },
  mounted(){
    this.users = Object.values(...mapState(['users']));
    for (let i = 0; i < this.users.length; i++)
      if (this.users[i].id === parseInt(this.$route.params.id))
        this.user =  this.users[i];
    console.log(this.user);
    this.newEmail = this.user.email;
    this.newPassword = this.user.password;
    this.newTip = this.user.tip;
    this.newName = this.user.name;
    this.newSurname = this.user.surname;
  }
}
</script>

<style scoped>

</style>