<template>
  <h1 class="text-red-200">StudBee</h1>
  <NuxtLink to="/quizz">Start Quizz</NuxtLink>
</template>

<style>
button:hover {
  transform: translateY(.3rem);
  box-shadow: 0 0 #58cc02;
}

button {
  display: block;
  font-weight: 700;
  border-radius: 1rem;
  background-color: #89e219;
  color: #1b2428;
  width: 100%;
  padding: .8rem;
  text-transform: uppercase;
  box-shadow: 0 .3rem #58cc02;
  transition: .2s;
}

button:hover {
  transform: translateY(.3rem);
  box-shadow: 0 0 #58cc02;
}
</style>