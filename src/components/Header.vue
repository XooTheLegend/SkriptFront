<template>
  <div id="nav">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item><router-link to="/">Vesti</router-link></b-nav-item>
        <b-nav-item><router-link to="/login">Login</router-link></b-nav-item>
        <b-nav-item><router-link to="/admin">Users</router-link></b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-button v-on:click="clear">log out</b-button>
        <h1>Hi: someone</h1>
      </b-navbar-nav>

    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
name: "Header"
}
</script>

<style scoped>

</style>