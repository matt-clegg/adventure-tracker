export default defineNuxtConfig({
  modules: ["@nuxthub/core", "@nuxt/eslint", "nuxt-auth-utils"],

  devtools: { enabled: true },

  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-07-30",

  hub: {
    database: true
  },

  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: "double",
        commaDangle: "never"
      }
    }
  }
});
