<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-table striped hover :items = "users" :fields="fields">
            <template v-slot:cell(actions)="row">
              <b-button variant="info" @click="edit_user(row.item)">Edit</b-button>
              <b-button variant="danger" @click="delete_user(row.item.id)">Delete</b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
    <b-button variant="info" v-on:click="next">New User</b-button>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import * as VueJwtDecode from "jsonwebtoken";
export default {
  name: "Admin",
  computed:{
    users(){
      return this.$store.state.users;
    }
  },
  data(){
    return {
      fields:["email", "password", "tip", "name", "surname", "actions"],
    }
  },

  methods:{
    ...mapActions(['delete_user']),
    edit_user(item){
      this.$router.push(`/edit-user/${item.id}`);
    },
    next(){
      this.$router.push({name:'NewUser'})
    },
    ...mapActions(['load_users'])
  },
  mounted(){
    this.load_users();
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