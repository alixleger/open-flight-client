import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./auth.module";
import { user } from "./user.module";
import { flights } from "./flights.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    user,
    flights
  }
});
