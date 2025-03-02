<script setup lang="ts">
const { user, loggedIn, clear } = useUserSession();
</script>

<template>
  <div class="centered">
    hello world
    <NuxtLink
      to="/auth/discord"
      external
    >
      Login with Discord
    </NuxtLink>

    <div v-if="loggedIn && user">
      <button @click="clear">
        Logout
      </button>
      <pre>{{ user }}</pre>
    </div>
  </div>
</template>

<style scoped>

</style>
