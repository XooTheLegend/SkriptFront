<template>
  <div class="pt-5">
    <form @submit.prevent="send">
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="title" type="text" class="form-control" id="title" aria-describedby="usernameHelp" placeholder="Enter title">
      </div>
      <div class="form-group">
        <label for="text">Text</label>
        <input v-model="content" type="text" class="form-control" id="text" aria-describedby="usernameHelp" placeholder="Enter text">
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <input v-model="category" type="text" class="form-control" id="category" aria-describedby="usernameHelp" placeholder="Enter category">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions} from 'vuex';
export default {
  name: "AddNews",
  data(){
    return{
      title:'',
      author:'',
      content:'',
      category:''
    }
  },
  methods:{
    ...mapActions(['new_news']),
    validate(){
      if(this.title==='' || this.title===null){
        alert('Title field is required!')
        return false;
      }

      if(this.content==='' || this.content===null){
        alert('Content field is required!')
        return false;
      }

      if(this.title.length<4 && this.title.length>20){
        alert('Title must be between 4 and 20!');
        return false;
      }

      if(this.content.length <20 && this.content.length > 200){
        alert('Content must be between 20 and 200!');
        return false;
      }

      return true;
    },
    send(){

      if(!this.validate()){
          return;
      }

      const jwt = localStorage.getItem('jwt');
      const payload = JSON.parse(atob(jwt.split('.',)[1]));
      const author = payload.user.email;
      const data = JSON.stringify({
        author:author,
        title:this.title,
        content:this.content,
        category:this.category
      });
      this.new_news(data).then(()=>{
        this.$router.push({name:"Home"})
      })

    },
  },
  beforeRouteEnter(from,to,next){
    if(localStorage.getItem('jwt') == null || localStorage.getItem('jwt') === ''){
      next({name: "PageNotFound"});
    }else{
      next();
    }
  }
}
</script>

<style scoped>

</style>