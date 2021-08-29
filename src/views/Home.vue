<template>
  <div class="home container">
    <b-button variant="primary" v-on:click="add">Add</b-button>
    <b-form-input placeholder="search"></b-form-input>
    <b-button variant="primary">Search</b-button>
    <div v-for="n in news" :key="n.id" class="border">
      <h1>{{n.title}}</h1>
      {{n.content.substring(0,24) + "..." }}
      <h2>by:{{n.author}}</h2>
      <b-button variant = "dark" v-bind:id="n.id" @click="preview($event)">Opsirnije</b-button>
      <b-button variant="info" v-bind:id="n.id" @click="edit($event)">Edit</b-button>
      <b-button variant="danger" v-bind:id="n.id" v-on:click="delete_news($event.currentTarget.id)">Delete</b-button>
    </div>

  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(["news"])
  },
  methods:{
    add(){
      this.$router.push({name:'AddNews'}); //view za dodavanje vesti
    },
    //edit(item){
      //const id = item.currentTarget.id
      //this.$router.push(`/edit-news/${id}`); //ruta za editovanje vesti
    //},
    ...mapActions(["delete_news"]),
    preview(item){
      const id = item.currentTarget.id
      this.$router.push(`/preview-news/${id}`) //ruta za pregled vesti
    }
  }

}
</script>
