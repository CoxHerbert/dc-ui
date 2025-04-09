<!-- MyButton.vue -->
<template>
    <el-button v-bind="$attrs" :type="type" class="my-button">
        <slot />
    </el-button>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'primary',
    },
});
</script>

<style scoped>
.my-button {
    border-radius: 8px;
    font-weight: bold;
}
</style>
