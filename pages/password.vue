<template>
  <div class="flex flex-col items-center gap-10">
    <div class="flex items-center flex-col gap-4">
      <ul class="flex gap-2">
        <li v-for="i in 4" :key="i" class="flex">
          <span class="w-5 h-5 border-2 border-bee-black-800 rounded-full" :class="[{'!border-hive-yellow-500 bg-buzz-orange-500': selected[i - 1]}]" />
        </li>
      </ul>
    </div>
    <ul class="grid grid-cols-3 text-2xl gap-2">
      <li v-for="i in 10" :key="i" :class="(i % 10) === 0 ? 'col-span-3 flex justify-center' : ''">
        <button class="w-20 h-20 flex items-center justify-center border-2 border-bee-black-500 active:bg-honeycomb-gold-500 active:border-hive-yellow-500 rounded-full" @click="addPassword((i % 10).toString())">{{ i % 10 }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const password = config.public.password;

const selected = ref([]);

const loginStore = useLogin();
loginStore.initializeLogin();

const route = useRoute();
const router = useRouter();

const addPassword = (i) => {
  if (selected.value.length < 4) {
    selected.value.push(i);
    if (selected.value.length === 4) {
      if (selected.value.join('') === password) {
        loginStore.setLogged(true);
        const redirectTo = route.query.redirect || '/';
        router.push(redirectTo);
      } else {
        selected.value = [];
      }
    }
  }
}

const handleKeydown = (event) => {
  const key = event.key;
  if (!isNaN(key) && key >= 0 && key <= 9) {
    addPassword(key);
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>
