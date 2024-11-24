export default defineNuxtRouteMiddleware(async (to, from) => {
  const loginStore = useLogin();
  console.log("Middleware check:", loginStore.logged);

  if (!loginStore.logged) {
    return navigateTo('/password');
  }
});
