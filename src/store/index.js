import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries: "loading",
    theme: "light",
    regionList: [{ value: null, text: "Filter by Region" }],
  },
  mutations: {
    updateCountries: (state, result) => {
      state.countries = result;
    },
    updateRegionList: (state, regionList) => {
      state.regionList = [...state.regionList, ...regionList];
    },
    updateTheme: (state, result) => {
      state.theme = result;
    },
  },
  actions: {
    getCountries({ commit }) {
      let url = "https://restcountries.eu/rest/v2/all";
      commit("updateCountries", "loading");
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          commit("updateCountries", data);
          let regionList = [];
          data.map((item) => {
            if (item.region && !regionList.includes(item.region)) {
              regionList.push(item.region);
            }
          });
          commit("updateRegionList", regionList);
        });

      // });
    },
    changeTheme({ commit }, theme) {
      commit("updateTheme", theme);
    },
  },
});
