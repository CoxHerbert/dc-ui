<template>
    <div class="scroll-seamless-container">
        <div class="table-header">
            <div
                class="table-column"
                v-for="(column, columnIndex) of columns"
                :class="[column.align]"
                :style="{
                    flex: column?.width ? 'unset' : 1,
                    width: column?.width || 'unset',
                }"
                :key="columnIndex"
            >
                <span class="cell">{{ column.label }}</span>
            </div>
        </div>

        <vue3ScrollSeamless class="scroll-wrap" :classOptions="classOptions" :dataList="tableData">
            <div v-if="tableData.length > 0">
                <div class="table__row" v-for="(item, rowIndex) of tableData" :key="rowIndex">
                    <div
                        class="table-column"
                        v-for="(column, columnIndex) of columns"
                        :class="[column.align]"
                        :style="{
                            flex: column?.width ? 'unset' : 1,
                            width: column?.width,
                        }"
                        :key="columnIndex"
                    >
                        <span class="cell">{{ item[column.prop] }}</span>
                    </div>
                </div>
            </div>
            <div
                v-if="tableData.length == 0"
                style="
                    width: 100%;
                    height: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-size: 18px;
                "
            >
                暂无数据
            </div>
        </vue3ScrollSeamless>
    </div>
</template>
<script setup>
import { defineProps, computed } from 'vue';
import { vue3ScrollSeamless } from 'vue3-scroll-seamless';

const props = defineProps({
    columns: {
        type: Array,
        defaulyt: [],
    },
    tableData: {
        type: Array,
        defaulyt: [],
    },
});

const classOptions = computed(() => {
    return {
        step: 0.3, //滚动速度值越大越快，但是值太小会卡顿
        limitMoveNum: props.tableData.length, //无缝滚动列表元素的长度，一般设置为列表的长度
        direction: 1, //方向: 0 往下 1 往上 2 向左 3 向右。
    };
});
</script>
