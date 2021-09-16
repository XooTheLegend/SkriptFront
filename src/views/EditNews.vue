<template>
  <div class="pt-5">
    <form @submit.prevent="edit">
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
import {mapActions} from 'vuex';
export default {
  name: "EditNews",
  data(){
    return{
      news:this.$store.state.news,
      author:'',
      title:'',
      content:'',
      category:''
    }
  },
  methods:{
    ...mapActions(['change_news']),
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
    edit(){
      if(!this.validate()){
        return;
      }
      const n = JSON.stringify({author:this.author, title:this.title,content:this.content, category:this.category});
      this.change_news({id:this.$route.params.id, news:n}).then(()=>{
        this.$router.push({name:"Home"})
      })
    }
  },

  beforeRouteEnter(to,from,next) {
    if(localStorage.getItem('jwt') == null || localStorage.getItem('jwt') === ''){
      next({name: "PageNotFound"});
    }else{
      next();
    }
  },

  mounted(){
    let newx=null;
    for(let i=0;i<this.news.length;i++){
      if(this.news[i].id === parseInt(this.$route.params.id)){
        newx = this.news[i];
      }
    }
    this.author = newx.author;
    this.title = newx.title;
    this.content = newx.content;
    this.category = newx.category

  }
}
</script>

<style scoped>

</style>