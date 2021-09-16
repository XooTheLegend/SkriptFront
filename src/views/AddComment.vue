<template>
  <div class="pt-5">
    <form @submit.prevent="send">
      <div class="form-group">
        <label for="author">Author</label>
        <input v-model="author" type="text" class="form-control" id="author" aria-describedby="usernameHelp" placeholder="Enter author">
      </div>
      <div class="form-group">
        <label for="text">Text</label>
        <input v-model="content" type="text" class="form-control" id="text" aria-describedby="usernameHelp" placeholder="Enter text">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "AddComment",
  data(){
    return{
      author:'',
      content:''
    }
  },
  methods:{
    ...mapActions(['new_comment']),
    validate(){
      if(this.author ==='' || this.author===null){
        alert('Author field is required!');
        return false;
      }

      if(this.content ==='' || this.content===null){
        alert('content field is required!');
        return false;
      }

      if(this.author.length < 4 && this.author.length>20){
        alert('Author field must be between 4 and 20 characters!')
        return false;
      }

      if(this.content.length < 20 && this.content.length>100){
        alert('Content field must be between 20 and 100 characters!')
        return false;
      }
      return true;
    },
    send(){
      if(!this.validate()){
        return;
      }

      const id = this.$route.params.id
      const data = JSON.stringify({
        author:this.author,
        content:this.content,
        news:id
      });

      this.new_comment(data).then(()=>{
        this.$router.push(`/preview-news/${id}`)
      })

    }
  },
  beforeRouteEnter(to,from,next) {
    fetch(`http://localhost:8080/api/new/${to.params.id}`, {method: 'get'}).then((response) => {
      if (response.ok) {
        next();
      } else {
        next({name: "PageNotFound"});
      }
    });
  }
}
</script>

<style scoped>

</style>