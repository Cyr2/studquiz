export default defineNuxtRouteMiddleware(async (to, from) => {
  const loginStore = useLogin();
  loginStore.initializeLogin();

  if (!loginStore.logged) {
    return navigateTo(`/password?redirect=${to.fullPath}`);
  }
});
