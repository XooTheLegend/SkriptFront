<template>
  <div class="home container">
    <b-button v-if="loged" variant="primary" @click="add">AddNews</b-button>
    <div v-for="n in news" :key="n.id" class="border">
      <h1>{{n.title}}</h1>
      <p>{{n.content.substring(0,24) + "..." }}</p>
      <b-button variant="dark" v-bind:id="n.id" @click="preview($event)">Opsirnije</b-button>
      <b-button variant="primary" v-if="loged" v-bind:id="n.id" @click="edit_news($event)">Edit</b-button>
      <b-button variant="danger" v-if="loged" v-bind:id="n.id" @click="del_news($event)">Delete</b-button>
      <p>by:{{n.author}}</p>
    </div>

  </div>
</template>

<script>

import {mapActions} from 'vuex';

export default {
  name: 'Home',
  data(){
    return{
      fields:["author", "title", "content", "actions"],
      news: [],
      loged:false
    }
  },
  methods:{
    ...mapActions(["change_news"]),
    add(){
      this.$router.push({name:'AddNews'});
    },
    ...mapActions(["delete_news"]),
    preview(item){
      const id = item.currentTarget.id
      const cookie = localStorage.getItem('cookie')
      const data = JSON.stringify({
        value:cookie,
        news:id
      });
      fetch('http://localhost:8080/api/check-cookie',{
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
        console.log(jsonData)
        for(let n=0;n<this.news.length;n++){
          if(this.news[n].id === parseInt(id)){
            this.news[n].count++;
            break;
          }
        }
        this.$router.push(`/preview-news/${id}`)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage + " error msg");
          });
        else
          alert(error + " error");
      });
    },
    edit_news(item){
      const id = item.currentTarget.id
      this.$router.push(`/edit-news/${id}`)
    },
    del_news(item){
      const id = item.currentTarget.id;
      this.delete_news(id).then(()=>{
        fetch(`http://localhost:8080/api/comments/${id}`,{method: 'delete'}).then((response)=>{
          if(!response.ok)
            throw response;

          return response;
        }).then((res)=>{
          console.log(res)
        }).catch((error)=>{
          if (typeof error.text === 'function')
            error.text().then((errorMessage) => {
              alert(errorMessage);
            });
          else
            alert(error);
        });
      });

    }
  },
  mounted(){
    this.news = this.$store.state.news
    if (!(localStorage.getItem('jwt') === '' || localStorage.getItem('jwt')==null)) {
      this.loged = true
    }
  }

}
</script>
