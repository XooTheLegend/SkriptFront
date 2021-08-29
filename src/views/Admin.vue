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
import {mapState, mapActions} from 'vuex';
export default {
  name: "Admin",
  computed:{
    ...mapState(['users'])
  },
  data(){
    return {
      fields:["email", "password", "tip", "name", "surname", "actions"]
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
  }
}
</script>

<style scoped>

</style>