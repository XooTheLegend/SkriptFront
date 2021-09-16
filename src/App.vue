<template>
  <div id="app">
    <Header/>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import Header from "@/components/Header";
export default{
  name:'App',
  components: {Header},
  methods:  {
    //...mapActions(['load_users']),
    ...mapActions(['load_news'])
  },
  mounted(){
    //this.load_users();
    this.load_news();

    fetch('http://localhost:8080/cookie',{method:'get'}).then((response)=>{
        if(!response.ok)
          throw response;

        return response.json();
    }).then((data)=>{
        if(localStorage.getItem('cookie') ==='' || localStorage.getItem('cookie')===null){
          localStorage.setItem('cookie',data.cookie);
        }
    }).catch((error) => {
      if (typeof error.text === 'function')
        error.text().then((errorMessage) => {
          alert(errorMessage);
        });
      else
        alert(error);
    });

  }

}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
