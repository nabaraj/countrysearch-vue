<template>
  <div>
    <Header />
    <b-container>
      <router-link id="backLink" to="/"
        ><b-button class="mb-4 borderButtonLink shadow-sm themeFormControll"
          ><b-icon-arrow-left /> Back</b-button
        ></router-link
      >
      <div>Not Found</div>
    </b-container>
  </div>
</template>

<script>
import Header from "./../components/Header";
export default {
  name: "NotFound",
  components: {
    Header,
  },
};
</script>

<style></style>
