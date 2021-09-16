import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users:[],
    news:[],
    comments:[]
  },
  mutations: {

    set_comments: function(state, comments){
      state.comments = comments;
    },

    add_comment: function(state, comment){
      state.comments.push(comment);
    },

    set_users: function(state, users){
      state.users = users;
    },

    add_user: function(state, user){
      state.users.push(user);
    },

    remove_user: function(state, id){
      for(let t = 0; t < state.users.length; t++){
        if(state.users[t].id === id){
          state.users.splice(t,1);
          break;
        }
      }
    },
    update_user: function(state, payload){
      for(let t = 0; t < state.users.length; t++){
        if(state.users[t].id === JSON.parse(payload.id)){
          state.users[t].email = payload.user.email;
          state.users[t].password = payload.user.password;
          state.users[t].tip = payload.user.tip;
          state.users[t].name = payload.user.name;
          state.users[t].surname = payload.user.surname;
          break;
        }
      }
    },

    set_news: function(state, news){
      state.news = news;
    },

    add_news: function(state, xnews){
      state.news.push(xnews);
    },

    remove_news: function(state, id){
      for(let t = 0; t < state.news.length; t++){
        if(state.news[t].id === id){
          state.news.splice(t,1);
          break;
        }
      }
    },

    update_news: function(state, payload){
      for(let t = 0; t < state.news.length; t++){
        if(state.news[t].id === JSON.parse(payload.id)){
          state.news[t].author = payload.news.author;
          state.news[t].title = payload.news.title;
          state.news[t].content = payload.news.content;
          state.news[t].category = payload.news.category;
          break;
        }
      }
    }
  },
  actions: {

    load_comments:function({commit}, id){
        fetch(`http://localhost:8080/api/comment/${id}`, {method: 'get'}).then((response)=>{
          if(!response.ok)
            throw response;
          return response.json()
        }).then((jsonData)=>{
          commit('set_comments', jsonData);
        }).catch((error) => {
          if (typeof error.text === 'function')
            error.text().then((errorMessage) => {
              alert(errorMessage);
            });
          else
            alert(error);
        });
    },

    new_comment:function({commit}, comment){
      fetch('http://localhost:8080/api/comments', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: comment
      }).then((response)=>{
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('add_comment', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage + " error msg");
          });
        else
          alert(error + " error");
      });
    },

    load_users: function({commit}){
      fetch('http://localhost:8080/api/users', { method: 'get',
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }}).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_users', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage + " xd");
          });
        else
          alert(error);
      });
    },

    delete_user: function({commit}, id){
      fetch(`http://localhost:8080/api/user/${id}`, { method: 'delete',
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        }}).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('remove_user', jsonData.id);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    new_user: function({commit}, user){
      fetch('http://localhost:8080/api/users', {
        method: 'post',
        headers: {
          'Content-Type' : 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        },
        body: user
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('add_user', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    change_user: function({commit}, payload){
      fetch(`http://localhost:8080/api/user/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type' : 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        },
        body: payload.user
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('update_user', {id:payload.id, user:jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    load_news: function({commit}){
      fetch('http://localhost:8080/api/news', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_news', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    delete_news: function({commit}, id){
      fetch(`http://localhost:8080/api/new/${id}`, { method: 'delete',
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        }}).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('remove_news', jsonData.id);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    new_news: function({commit}, news){
      fetch('http://localhost:8080/api/news', {
        method: 'post',
        headers: {
          'Content-Type' : 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        },
        body: news
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('add_news', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    change_news: function({commit}, payload){
      fetch(`http://localhost:8080/api/new/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type' : 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        },
        body: payload.news
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('update_news', {id:payload.id, news:jsonData});
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
})
