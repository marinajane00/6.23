<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view></router-view> -->
	<dbSource v-if="data.source && data.theme" :Appdata="data" ></dbSource>
  </div>
</template>

<script>
import dbSource from './components/dbSource.vue'
import io from 'socket.io-client'
import store from './vuex/store'
//import async from 'async'

export default {
  name: 'app',
  data(){
	  return {
		  data:{
			source:null,
			theme:null
		  }
	  }
  },
  mounted(){
	console.log(location.search);
	console.log("app vue here+++++++++++++++++")
	
	const socket = io.connect('http://localhost:8071?id=1');
	var self=this;
	this.$store.commit('changeSocket',socket)
	socket.on('source', function(e){
		self.data.source=e;
	});
	
	socket.on('theme', function(e){
		self.data.theme=e;
		console.log("test++++")
		console.log(e)
	});
  },
  store:store,
  components: { dbSource }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
</style>
