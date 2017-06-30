import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mutations = {
	changeSocket(state,val){
		state.socket=val
	}
}

const state = {
	socket:null
}
export default new Vuex.Store({
    state,
    mutations
})