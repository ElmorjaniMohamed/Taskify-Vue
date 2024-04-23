import { defineStore } from "pinia";

import { computed, ref } from "vue";

import { CsrfCookie, login, register, logout, getUser } from "../http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const errors = ref({});

  const isLoggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    try {
      const { data } = await getUser();
      user.value = data;
    } catch {
      user.value = null;
    }
  };

  const handleLogin = async (credentials) => {
    await CsrfCookie();
    try {
      await login(credentials);
      await fetchUser();
      errors.value = {};
    } catch (error) {
      if (error.responce && error.responce.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const handleRegister = async (newUser) => {
    await register(newUser);
    await handleLogin({
      email: newUser.email,
      password: newUser.password,
    });
  };

  const handleLogout = async () => {
    await logout();
    user.value = null;
  };

  return {
    user,
    errors,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout,
  };
});
