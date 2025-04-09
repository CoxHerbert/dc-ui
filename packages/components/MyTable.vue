<!-- packages/components/MyTable.vue -->
<template>
    <div>
        <el-table :data="tableData" v-bind="$attrs">
            <slot />
        </el-table>
        <el-pagination
            v-if="pagination"
            :total="pagination.total"
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            @current-change="handlePageChange"
        />
    </div>
</template>

<script>
export default {
    name: 'MyTable',
    props: {
        tableData: {
            type: Array,
            default: () => [],
        },
        pagination: {
            type: Object,
            default: null,
        },
    },
    emits: ['update:pagination'],
    methods: {
        handlePageChange(page) {
            this.$emit('update:pagination', {
                ...this.pagination,
                currentPage: page,
            });
        },
    },
};
</script>
