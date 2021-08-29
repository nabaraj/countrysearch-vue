<template>
  <div id="app">
    <!-- <b-overlay :show="updateExists" rounded="sm"> -->
    <router-view />
    <!-- <template v-slot:overlay>
        <div class="text-center">
          <b-icon icon="cloud-download" font-scale="3"></b-icon>
          <p id="cancel-label">New updates are available!</p>
          <b-button
            variant="outline-darkBlue"
            size="sm"
            aria-describedby="cancel-label"
            @click="refreshApp"
          >
            Refresh
          </b-button>
        </div>
      </template> -->
    <!-- </b-overlay> -->
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false,
    };
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      this.updateExists = true;
    },
    refreshApp() {
      // Handle a user tap on the update app button.
      this.updateExists = false;
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    },
  },
};
</script>

<style lang="scss"></style>
