<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="min-h-screen min-w-screen flex flex-col gap-2 items-center bg-slate-100 pt-32 max-md: p-4">
    <h1 class=" text-4xl font-bold">Just do it</h1>
    <RouterView />
  </main>
</template>

