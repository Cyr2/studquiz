<template>
  <div class="flex flex-col items-center gap-10">
    <div class="flex items-center flex-col gap-4">
      <ul class="flex gap-2">
        <li v-for="i in 4" :key="i" class="flex">
          <span class="w-5 h-5 border-2 border-wax-gray rounded-full" :class="[{'bg-wax-gray': selected[i - 1]}]" />
        </li>
      </ul>
    </div>
    <ul class="grid grid-cols-3 text-2xl gap-2">
      <li v-for="i in 10" :key="i" :class="(i % 10) === 0 ? 'col-span-3 flex justify-center' : ''">
        <button class="w-20 h-20 flex items-center justify-center border-2 border-wax-gray rounded-full" @click="addPassword((i % 10).toString())">{{ i % 10 }}</button>
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
loginStore.setLogged(false);

const addPassword = (i) => {
  if (selected.value.length < 4) {
    selected.value.push(i);
    if (selected.value.length === 4) {
      if(selected.value.join('') === password) {
        loginStore.setLogged(true);
        navigateTo("/")
      } else {
        selected.value = [];
      }
    }
  }
}
</script>