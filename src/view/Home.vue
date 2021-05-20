<template>
  <div>
    <Header />
    <b-container>
      <div class="text-center" v-if="countries === 'loading'">
        <b-spinner />
      </div>
      <b-row v-else>
        <b-col cols="6"></b-col>
        <b-col cols="6" class="mb-4 d-flex position-relative slectRegionCol">
          <b-icon-chevron-down class="selectArrow" />
          <b-select
            v-model="selected"
            class="w-50 ml-auto"
            :options="regionList"
          />
        </b-col>
        <b-col
          cols="12"
          sm="3"
          v-for="country in filteredList"
          v-bind:key="country.alpha2Code"
          class="countryGrid"
        >
          <router-link :to="createLink(country.alpha3Code)">
            <b-card
              :title="country.name"
              :img-src="country.flag"
              :img-alt="country.name"
              img-top
              tag="article"
              style="max-width: 20rem"
              class="mb-2"
            >
              <b-card-text>
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
              </b-card-text>
            </b-card>
          </router-link>
        </b-col>
      </b-row>
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
      if (this.countries !== "loading" && !this.selected) {
        return this.countries;
      }
      let countryFiltred = this.countries.filter((item) => {
        console.log(item.region);
        return item.region === this.selected;
      });
      console.log(countryFiltred);
      return countryFiltred;
    },
  },
  watch: {},
  methods: {
    ...mapActions(["getCountries"]),
    createLink: function (name) {
      return "/details/" + name;
    },
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
    height: 200px;
    width: 100%;
    object-fit: cover;
  }
}
.custom-select {
  background-image: none;
}
.selectArrow {
  position: absolute;
  right: 27px;
  top: 50%;
  pointer-events: none;
  transform: translateY(-50%);
}
</style>