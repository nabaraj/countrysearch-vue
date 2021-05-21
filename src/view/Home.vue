<template>
  <div>
    <Header />
    <b-container>
      <div class="text-center" v-if="countries === 'loading'">
        <b-spinner />
      </div>
      <div v-else>
        <b-row class="mx-n4 filterTool">
          <b-col cols="12" sm="3" class="mb-4 px-4">
          <div class="position-relative">
            <b-icon-search class="position-absolute searchIcon"/>
            <b-input 
              aria-label="searc by country name"
              type="search" 
              name="searchCountry" 
              v-model="searchText" 
              class="pl-5 themeFormControll shadow-sm "  
              placeholder="Search for a country.."

            />
          </div>
        </b-col>
        <b-col cols="12" sm="3" class="mb-4 ml-auto px-4 d-flex position-relative slectRegionCol">
          <b-icon-chevron-down class="selectArrow" />
          <b-select
            aria-label="filter by region"
            v-model="selected"
            class="shadow-sm themeFormControll"
            :options="regionList"
            name="filterRegion"
          />
        </b-col>
        </b-row>
      <b-row class="mx-n4">
        
        <b-col
          cols="12"
          sm="3"
          v-for="country in filteredList"
          v-bind:key="country.alpha2Code"
          class="countryGrid px-4 py-3"
        >
          <router-link :to="`/details/${country.alpha3Code}`">
            <b-card
              :title="country.name"
              :img-src="country.flag"
              :img-alt="country.name"
              img-top
              tag="article"
              style="max-width: 20rem"
              class="mb-2 shadow-sm"
            >
              <div>
                <ul class="list-unstyled font-14">
                  <li>
                    <span class="font-weight-bold pr-1">Population:</span
                    >{{ country.population }}
                  </li>
                  <li>
                    <span class="font-weight-bold pr-1">Region:</span
                    >{{ country.region }}
                  </li>
                  <li>
                    <span class="font-weight-bold pr-1">Capital:</span
                    >{{ country.capital }}
                  </li>
                </ul>
              </div>
            </b-card>
          </router-link>
        </b-col>
      </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Header from "./../components/Header";
export default {
  name: "Home",
  data: function () {
    return {
      selected: null,
      searchText:''
    };
  },
  components: {
    Header,
  },
  computed: {
    ...mapState({
      countries: (state) => state.countries,
      regionList: (state) => state.regionList,
    }),
    filteredList: function () {
      if (this.countries === "loading"){
        return []
      }
      let countryFiltred = this.countries;

      if(this.searchText){
       countryFiltred = this.countries.filter((item)=>{
          return item.name.toLowerCase().includes(this.searchText.toLowerCase());
        })
      }
      if(this.selected){
        countryFiltred = countryFiltred.filter((item) => {
          return item.region === this.selected;
        });
      }
      
      return countryFiltred;
    },
  },
  watch: {},
  methods: {
    ...mapActions(["getCountries"])
  },
  created: function () {
    if (this.countries === "loading") {
      this.$store.dispatch("getCountries");
    }
  },
};
</script>

<style lang="scss">
.countryGrid {
  a {
    &:hover {
      text-decoration: none;
    }
  }
  .card-title {
    font-size: 16px;
    font-weight: bold;
    color: inherit;
    text-decoration: none;
  }
  .card-img-top {
    height: 150px;
    width: 100%;
    object-fit: cover;
  }
}
.custom-select {
  background-image: none;
}
.selectArrow {
  position: absolute;
  right: 34px;
  top: 50%;
  pointer-events: none;
  transform: translateY(-50%);
}
.searchIcon{
  top:50%;
  left:13px;
  transform: translateY(-50%);
}
.filterTool{
  input, select{
    height: 50px;
  }
}
</style>