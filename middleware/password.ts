export default defineNuxtRouteMiddleware(async (to, from) => {
  const loginStore = useLogin();

  if (!loginStore.logged) {
    return navigateTo('/password');
  }
});
