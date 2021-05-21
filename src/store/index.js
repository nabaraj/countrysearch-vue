import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries: 'loading',
    theme: 'light',
    regionList: [{ value: null, text: 'Filter by Region' }]
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
    }
  },
  actions: {
    getCountries({ commit }) {
      let url = 'https://restcountries.eu/rest/v2/all';
      // const activityRequestObject = {
      //   url,
      //   method: 'GET'
      // };
      commit('updateCountries', 'loading');
      fetch(url)
        .then(response => response.json())
        .then(data => {
          commit('updateCountries', data);
          let regionObject = {}, regionList = [];
          data.map((item) => {
            if (!regionObject[item.region] && item.region) {
              regionObject[item.region] = item.region;
            }
          });
          Object.keys(regionObject).map((item) => {
            regionList.push({ value: item, text: item });
          });
          commit('updateRegionList', regionList)
        });

      // });
    },
    changeTheme({ commit }, theme) {
      commit('updateTheme', theme)
    }
  }
  // },
});
