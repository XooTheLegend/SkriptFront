<template>
  <div>
    <div>
      <h1>{{this.title}}</h1>
      <p>{{this.content}}</p>
      <h2>By: {{this.author}}</h2>
      <h3>Category:{{this.category}}</h3>
      <h4>Date Created: {{(new Date(this.date)).toISOString().slice(0,19).replace('T',' | ')}}</h4>
      <h5>Views: {{this.count}}</h5>
    </div>
    <h1 id="xd">COMMENTS:{{comments.length}}</h1>
    <b-button variant="dark" @click="addComment">Add Comment</b-button>
    <div v-for="c in comments" :key="c.id" class="border">
      <h1>{{c.author}}</h1>
      <h1>{{c.content}}</h1>
      <b-button variant="success" v-bind:id="c.id" @click="like($event)">Like</b-button>
      <p>Likes: {{c.likes}}</p>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "PreviewNews",
  computed:{
    comments(){
      return this.$store.state.comments
    }
  },
  data(){
    return{
      news:this.$store.state.news,
      author:'',
      title:'',
      content:'',
      count:0,
      category:'',
      date:''
    }
  },
  methods:{
    addComment(){
      this.$router.push(`/add-comment/${this.$route.params.id}`)
    },
    ...mapActions(["load_comments"]),
    like(event){
      const commentId = event.currentTarget.id
      const cookie = localStorage.getItem('cookie')
      const data = JSON.stringify({
        value:cookie,
        commentId:commentId
      });

      fetch('http://localhost:8080/api/check-likes',{
        method:'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then((response)=>{
        if(!response.ok)
          throw response

        return response;
      }).then((jsonData)=>{
        for(let c=0;c<this.comments.length;c++){
          if(this.comments[c].id === parseInt(commentId)){
            this.comments[c].likes++;
            break;
          }
        }
        console.log(jsonData)
        //this.$router.push(`/preview-news/${id}`)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage + " error msg");
          });
        else
          alert(error + " error");
      });
    }
  },
  mounted(){

    this.load_comments(this.$route.params.id);
    this.comments = this.$store.state.comments

    let newx=null;
    for(let i=0;i<this.news.length;i++){
      if(this.news[i].id === parseInt(this.$route.params.id)){
        newx = this.news[i];
      }
    }
    this.author = newx.author;
    this.title = newx.title;
    this.content = newx.content;
    this.category = newx.category;
    this.date = newx.date;
    this.count = newx.count;
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
  #xd{
    color:red;
  }
</style>