<template>
  <b-navbar class="shadow-sm mb-4" sticky>
    <div class="container py-3">
      <h1 class="font-16 font-weight-bold">Where in the world</h1>
      <div class="ml-auto pointer" id="themeChanger" @click="toggletheme">
        <b-icon-moon v-if="theme === 'light'" />
        <b-icon-sun v-if="theme === 'dark'" />
        <span class="text-capitalize pl-1"
          >{{ this.theme === "light" ? "dark" : "light" }} mode</span
        >
      </div>
    </div>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapState({
      theme: (state) => state.theme,
    }),
  },
  watch: {
    theme: function (val) {
      document.body.className = "theme-" + val;
    },
  },
  created: function () {
    document.body.className = "theme-" + this.theme;
  },
  methods: {
    ...mapActions(["changeTheme"]),
    toggletheme: function () {
      let theme = this.theme === "light" ? "dark" : "light";
      this.$store.dispatch("changeTheme", theme);
    },
  },
};
</script>

<style></style>
