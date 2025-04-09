<template>
    <div style="display: inline-block">{{ globalConfig }}</div>
</template>

<script setup>
import { reactive, toRefs, watch, computed, inject } from 'vue';
const globalConfig = inject('globalConfig');
console.log(globalConfig, 'globalConfig');
</script>
