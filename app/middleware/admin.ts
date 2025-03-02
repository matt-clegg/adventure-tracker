export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/admin") {
    const { user } = useUserSession();
    if (!user.admin) {
      return navigateTo("/");
    }
  }
});
