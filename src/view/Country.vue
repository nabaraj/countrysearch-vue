<template>
  <div>
    <Header />
    <b-container>
      <router-link to="/"
        ><b-button class="mb-4 borderButtonLink"
          ><b-icon-arrow-left /> Back</b-button
        ></router-link
      >
      <div v-for="item in getCountryDetails" v-bind:key="item.name">
        <b-row>
          <b-col cols="6">
            <img :src="item.flag" alt="" class="img-fluid" />
          </b-col>
          <b-col cols="6" class="p-4">
            <h3 class="font-weight-bold">{{ item.name }}</h3>
            <b-row class="font-10">
              <b-col cols="6">
                <div class="pb-2">
                  <span class="font-weight-bold pr-1">Native Name:</span
                  >{{ item.nativeName }}
                </div>
                <div class="pb-2">
                  <span class="font-weight-bold pr-1">Population:</span
                  >{{ item.population }}
                </div>
                <div class="pb-2">
                  <span class="font-weight-bold pr-1">Region:</span
                  >{{ item.region }}
                </div>
                <div class="pb-2">
                  <span class="font-weight-bold pr-1">Sub Region:</span
                  >{{ item.subregion }}
                </div>
                <div class="pb-2">
                  <span class="font-weight-bold pr-1">Capital:</span
                  >{{ item.capital }}
                </div>
              </b-col>
              <b-col cols="6">
                <div class="pb-2">
                  <span class="font-weight-bold pr-1">Top Level Domain:</span
                  >{{ item.topLevelDomain.join(",") }}
                </div>
                <div class="pb-2">
                  <span class="font-weight-bold pr-1">Currencies :</span>
                  {{ combineiTem(item.currencies, "code") }}
                </div>
                <div class="pb-2">
                  <span class="font-weight-bold pr-1">Currencies :</span>
                  {{ combineiTem(item.languages, "name") }}
                </div>
              </b-col>
              <b-col cols="12" class="font-14">
                <span class="font-weight-bold pr-1">Border Countries :</span>
                <router-link
                  :to="country.alpha3Code"
                  v-for="country in borderCountries"
                  v-bind:key="country.name"
                  class="btn borderButtonLink shadow-sm mx-2 px-2 py-1"
                >
                  {{ country.name }}
                </router-link>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Header from "../components/Header.vue";
export default {
  components: { Header },
  data: function () {
    return {
      borderCountries: [],
    };
  },
  name: "Country",
  computed: {
    ...mapState({
      countries: (state) => state.countries,
    }),
    getCountryDetails() {
      if (this.countries !== "loading") {
        let getName = this.$route.params.name;
        return this.countries.filter((item) => {
          let selected = "";
          if (item.alpha3Code === getName) {
            selected = item;
            this.borderCountries = [];
            this.getBorderCountries(item.borders);
          }

          return selected;
        });
      }
      return [];
    },
  },
  methods: {
    ...mapActions(["getCountries"]),
    createLink: function (name) {
      return "/details/" + name;
    },
    combineiTem: function (itemArr, code) {
      let filtredArr = itemArr.map((item) => item[code]);
      return filtredArr.join(",");
    },
    getBorderCountries: function (borders) {
      console.log(borders);

      this.countries.map((item) => {
        if (borders.includes(item.alpha3Code)) {
          this.borderCountries.push({
            name: item.name,
            alpha3Code: item.alpha3Code,
          });
        }
      });
    },
  },
  created: function () {
    if (this.countries === "loading") {
      this.$store.dispatch("getCountries");
    }
  },
};
</script>

<style>
</style>