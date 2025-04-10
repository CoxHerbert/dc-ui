<template>
    <div class="default" v-if="$slots.default" @click="openDialog">
        <slot name="default"></slot>
    </div>
    <div v-else-if="disabled && type === 'text'">{{ viewText }}</div>
    <el-input-tag
        class="ipt-tag-select"
        v-model="iptTagData"
        clearable
        :placeholder="placeholder"
        @click="openDialog"
        @remove-tag="removeTag"
        :style="{ width: width }"
        :disabled="disabled"
        :suffix-icon="suffixIcon"
        v-else-if="type === 'input'"
    >
        <template #tag="user">
            <div class="flex items-center">
                <el-icon><User /></el-icon>
                <span>{{ user.value.realName }}</span>
            </div>
        </template>
    </el-input-tag>
    <el-dialog
        class="select-dialog"
        v-model="open"
        :show-close="false"
        @close="closeDialog"
        width="1200px"
        modal
        draggable
        destroy-on-close
        append-to-body
    >
        <template #header>
            <div class="head-title">
                {{ title || '' }}
            </div>
            <div class="head-close" @click="closeDialog">
                <el-icon><Close /></el-icon>
            </div>
        </template>
        <div class="dialog-body w-full h-full" v-loading="loading">
            <div class="tabs-container">
                <el-tabs v-model="tab" @tab-change="handleChangeTab">
                    <!-- <el-tab-pane label="常用" name="commonlyUse"></el-tab-pane> -->
                    <el-tab-pane label="部门" name="dept">
                        <el-input v-model="deptSearch" placeholder="请输入部门" prefix-icon="Search" clearable />
                        <div class="tree-container">
                            <el-tree
                                ref="deptTreeRef"
                                :data="deptData"
                                @node-click="deptNodeClick"
                                node-key="id"
                                :filter-node-method="deptFilterNode"
                            >
                                <template #default="{ data }">
                                    <div
                                        class="default-node"
                                        :class="{
                                            'is-active': data.id === queryParams.deptId,
                                        }"
                                    >
                                        {{ data.deptName }}
                                    </div>
                                </template>
                            </el-tree>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="角色" name="role">
                        <el-input v-model="roleSearch" placeholder="请输入角色" prefix-icon="Search" clearable />
                        <div class="tree-container">
                            <el-tree
                                ref="roleTreeRef"
                                :data="roleData"
                                @node-click="roleNodeClick"
                                node-key="id"
                                :filter-node-method="roleFilterNode"
                            >
                                <template #default="{ data }">
                                    <div
                                        class="default-node"
                                        :class="{
                                            'is-active': data.id === queryParams.roleId,
                                        }"
                                    >
                                        {{ data.roleName }}
                                    </div>
                                </template>
                            </el-tree>
                        </div>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="工作组" name="workGroup"></el-tab-pane> -->
                </el-tabs>
            </div>
            <div class="data-content">
                <div class="search-wrap">
                    <el-input
                        v-model="queryParams.realName"
                        placeholder="请输入姓名"
                        prefix-icon="Search"
                        @keyup.enter="getData"
                        clearable
                    />
                    <el-button type="primary" @click="getData">查询</el-button>
                    <el-button @click="resetQuery">重置</el-button>
                </div>
                <div class="tag-container">
                    <div class="tag-list">
                        <div class="no-data" v-if="showSelectedRows.length === 0">暂无选中数据</div>
                        <el-tag
                            v-for="tag in showSelectedRows"
                            :key="tag.id"
                            closable
                            size="large"
                            effect="plain"
                            @close="removeSelected(tag)"
                        >
                            {{ tag?.realName }}
                        </el-tag>
                    </div>
                    <div class="statistics-box">
                        <span>
                            已选 {{ Array.isArray(showSelectedRows) ? showSelectedRows.length : 0 }}
                            {{ multipleLimit !== 0 ? `最多可选 ${multipleLimit || 0}` : '' }}
                        </span>

                        <el-button type="primary" text @click="clearableSelected"> 清空 </el-button>
                    </div>
                </div>
                <div class="table-container">
                    <el-table
                        :data="userData"
                        @select="handleSelect"
                        @select-all="handleSelectAll"
                        @row-click="handleRowClick"
                        @row-dblclick="handleRowDbClick"
                        :row-class-name="rowClassName"
                        row-key="id"
                        height="100%"
                        ref="userTableRef"
                    >
                        <el-table-column type="selection" width="40" :reserve-selection="true" />
                        <el-table-column prop="" label="" width="60" align="center">
                            <template #default="scoped">
                                <div class="round-name">
                                    {{ scoped.row?.realName ? scoped.row.realName.charAt(0) : '' }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="realName" label="姓名" min-width="80" align="center">
                            <template #default="scoped">
                                {{ scoped.row?.realName || '-' }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="account" label="账号" min-width="100" align="center">
                            <template #default="scoped">
                                {{ scoped.row?.phone || '-' }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="roleName" label="角色" min-width="100" align="center">
                            <template #default="scoped">
                                {{ scoped.row?.roleName || '-' }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="deptName" label="部门" min-width="100" align="center">
                            <template #default="scoped">
                                {{ scoped.row?.deptName || '-' }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="account" label="工号" min-width="80" align="center">
                            <template #default="scoped">
                                {{ scoped.row?.account || '-' }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <dc-pagination
                    v-show="total > 0"
                    :total="total"
                    v-model:page="queryParams.current"
                    v-model:limit="queryParams.size"
                    @pagination="getData"
                />
            </div>
        </div>

        <template #footer>
            <el-button type="primary" @click="confirm">确定</el-button>
            <el-button @click="closeDialog">取消</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { inject, defineEmits, defineProps, reactive, toRefs, computed, watch, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { deepClone } from '../../utils/util';
const { store, api, request } = inject('globalConfig');

// 校验数量
const validateSelectionLimit = ({ selection }) => {
    let mergedArray = [...showSelectedRows.value];
    if (selection) mergedArray = [...showSelectedRows.value, ...selection];
    const uniqueRows = Array.from(new Map(mergedArray.map((item) => [item.id, item])).values());
    const total = uniqueRows?.length || 0;
    if (total > props.multipleLimit && props.multipleLimit !== 0) {
        ElMessage({
            type: 'error',
            message: `最多可选${props.multipleLimit}行`,
        });
        return false;
    }
    return true;
};
const emit = defineEmits(['update:modelValue', 'change']);
const props = defineProps({
    // 标题
    title: {
        type: String,
        default: '人员选择',
    },
    // 绑定的值
    modelValue: {
        type: [String, Array, Object], // 使用数组指定多个类型
        default: null,
    },
    // 展示的类型 text 和 input
    type: {
        type: String,
        default: 'input',
        validator: (value) => ['text', 'input'].includes(value),
    },
    /**
     * 双向绑定数据返回的数据格式 object string
     * object 单选时返回 {}
     * object 多选时返回 [{}]
     * string 单选和多选时''
     * **/
    returnType: {
        type: String,
        default: 'string',
        validator: (value) => ['string', 'object'].includes(value),
    },
    // input tag 宽度
    width: {
        type: String,
        default: '100%',
    },
    // 占位符，默认为“请输入查询选择”
    placeholder: {
        type: String,
        default: '请输入查询选择',
    },
    suffixIcon: {
        type: String,
        default() {
            return '';
        },
    },
    // 是否多选 true开启多选 false关闭多选
    multiple: {
        type: Boolean,
        default: true,
    },
    // multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制
    multipleLimit: {
        type: Number,
        default: 1,
    },
    // 是否可以清空选项
    clearable: {
        type: Boolean,
        default: false,
    },
    // 是否可编辑
    disabled: {
        type: Boolean,
        default: false,
    },
});
const componentData = reactive({
    open: false,
    loading: false,
    // 选中的tab
    tab: 'dept',
    // 总条数
    total: 0,
    // 查询参数
    queryParams: {
        current: 1,
        size: 10,
        realName: '',
        roleId: null,
        deptId: null,
    },
    // 展示数据
    infoRows: [],
    // 已选中的项，完整数据
    selectedRows: [],
    // 部门数据
    deptData: [],
    // 角色数据
    roleData: [],
    // 用户数据
    userData: [],
    // 输入框数据
    iptTagData: [],
    // 部门过滤字段
    deptSearch: '',
    // 角色过滤
    roleSearch: '',
    // 部门树Dom
    deptTreeRef: null,
    // 角色树Dom
    roleTreeRef: null,
    // 用户列表Dom
    userTableRef: null,
    // 定时器
    timer: null,
    // 延迟时长
    doubleClickDelay: 300,
    // 设置标志位
    isTriggeredByClick: false,
});
const {
    open,
    loading,
    tab,
    total,
    queryParams,
    infoRows,
    selectedRows,
    deptData,
    roleData,
    userData,
    iptTagData,
    deptSearch,
    roleSearch,
    deptTreeRef,
    roleTreeRef,
    userTableRef,
    timer,
    doubleClickDelay,
    isTriggeredByClick,
} = toRefs(componentData);
const showSelectedRows = computed(() => {
    let result = [];
    if (Array.isArray(infoRows.value)) {
        result = [...infoRows.value];
    }
    if (Array.isArray(selectedRows.value)) {
        result = [...result, ...selectedRows.value];
    }
    return result;
});
const viewText = computed(() => {
    if (Array.isArray(iptTagData.value) && iptTagData.value.length) {
        return iptTagData.value
            .map((item) => {
                let value = item.id;
                try {
                    value = item?.realName;
                } catch (error) {
                    value = item.id;
                }
                return value;
            })
            .join('，');
    } else {
        return '-';
    }
});
watch(
    () => props.modelValue,
    async (newVal, oldVal) => {
        let ids;
        if (Array.isArray(newVal)) {
            ids = newVal.map((item) => item?.id || item);
        } else if (typeof newVal === 'object' && newVal !== null) {
            try {
                ids = [newVal?.id];
            } catch (error) {
                ids = '';
            }
        } else if (typeof newVal === 'string') {
            ids = !!newVal ? newVal.split(',') : [];
        } else {
            ids = '';
        }
        if (!ids || (Array.isArray(ids) && !ids.length)) {
            componentData.iptTagData = [];
            return;
        }
        await request.getView({
            url: '/blade-bip/bip-blade-user/select-data',
            data: ids,
        });
        const currentGlobalData = store.getters.globalData['/blade-bip/bip-blade-user/select-data'];
        componentData.iptTagData = ids.map((id) => {
            const currentItem = currentGlobalData[id];
            if (currentItem) {
                return {
                    ...currentItem,
                    isInfo: true,
                };
            }
            return id;
        });
    },
    { deep: true, immediate: true }
);
// 部门过滤
watch(
    () => deptSearch.value,
    (val) => {
        if (deptTreeRef.value) deptTreeRef.value.filter(val);
    },
    { deep: true, immediate: true }
);
// 角色过滤
watch(
    () => roleSearch.value,
    (val) => {
        if (roleTreeRef.value) roleTreeRef.value.filter(val);
    },
    { deep: true, immediate: true }
);
// 更新table
watch(
    () => userData.value,
    (newVal) => {
        nextTick(() => {
            newVal.forEach((row) => {
                const newSelectedRow = showSelectedRows.value.find((item) => item.id === row.id);
                if (newSelectedRow) {
                    const infoIndex = infoRows.value.findIndex((infoRow) => infoRow.id === newSelectedRow.id);
                    if (infoIndex > -1) {
                        userTableRef.value.toggleRowSelection(row, true);
                        selectedRows.value.push(infoRows.value[infoIndex]);
                        infoRows.value.splice(infoIndex, 1);
                    }
                }
            });
        });
    },
    { deep: true, immediate: true }
);
// 角色过滤
watch(
    () => selectedRows.value,
    (newVal, oldVal) => {
        const isValidate = validateSelectionLimit({ selection: newVal });
        if (isValidate) {
            // 校验通过
            newVal.forEach((row) => {
                userTableRef.value.toggleRowSelection(row, true);
            });
        } else {
            // 校验未通过
            newVal.forEach((row) => {
                userTableRef.value.toggleRowSelection(row, false);
            });
            oldVal.forEach((row) => {
                userTableRef.value.toggleRowSelection(row, true);
            });
            selectedRows.value = oldVal;
        }
    },
    { deep: true, immediate: true }
);
// 获取组织机构
const getDept = async () => {
    const res = await api.system.dept.getList();
    const { code, data } = res.data;
    if (code === 200) {
        deptData.value = data;
    }
};
// 获取角色
const getRole = async () => {
    const res = await api.system.role.getList({
        size: 99999,
        current: 1,
    });
    const { code, data } = res.data;
    if (code === 200) {
        roleData.value = data;
    }
};
// 获取用户
const getData = async () => {
    const res = await api.system.user.getList(queryParams.value);
    const { code, data } = res.data;
    if (code === 200) {
        userData.value = data.records;
        total.value = data.total;
    }
};
// 处理tab变化
const handleChangeTab = () => {
    switch (tab.value) {
        case 'dept':
            roleSearch.value = '';
            queryParams.value.roleId = null;
            if (Array.isArray(deptData.value) && !deptData.value.length) getDept();
            resetQuery();
            break;
        case 'role':
            deptSearch.value = '';
            queryParams.value.deptId = null;
            if (Array.isArray(roleData.value) && !roleData.value.length) getRole();
            resetQuery();
            break;
    }
};
// 重置查询
const resetQuery = () => {
    queryParams.value.realName = '';
    queryParams.value.current = 1;
    getData();
};
// 过滤部门节点
const deptFilterNode = (value, data) => {
    if (!value) return true;
    return data.deptName.includes(value);
};
// 过滤角色节点
const roleFilterNode = (value, data) => {
    if (!value) return true;
    return data.roleName.includes(value);
};
// 数据选择项
const removeSelected = (option) => {
    if (option?.isInfo) {
        const findIndex = infoRows.value.findIndex((item) => item.id === option.id);
        const findRow = userData.value.find((row) => row.id === option.id);
        infoRows.value.splice(findIndex, 1);
        if (findRow) userTableRef.value.toggleRowSelection(findRow, false);
    } else {
        const findIndex = selectedRows.value.findIndex((item) => item.id === option.id);
        selectedRows.value.splice(findIndex, 1);
        userTableRef.value.toggleRowSelection(option, false);
    }
};
// 清空已选中的数据
const clearableSelected = () => {
    selectedRows.value.forEach((selectedRow) => {
        userTableRef.value.toggleRowSelection(selectedRow);
    });
    selectedRows.value = [];
    infoRows.value = [];
};
// 处理单选
const handleSelect = (selection, row) => {
    console.log('handleSelect', row);
    if (props.multiple) {
        const isValidate = validateSelectionLimit({ selection });
        if (isValidate) {
            // 数量正常
            const infoRowIndex = infoRows.value.findIndex((item) => item.id === row.id);
            const selectedRowIndex = selectedRows.value.findIndex((item) => item.id === row.id);
            if (infoRowIndex > -1) {
                // 已选中
                infoRows.value.splice(infoRowIndex, 1);
                userTableRef.value.toggleRowSelection(row, false);
            } else if (selectedRowIndex > -1) {
                // 已选中
                selectedRows.value.splice(selectedRowIndex, 1);
                userTableRef.value.toggleRowSelection(row, false);
            } else {
                // 未选中
                selectedRows.value.push(row);
                userTableRef.value.toggleRowSelection(row, true);
            }
        } else {
            // 数量超出
            userTableRef.value.toggleRowSelection(row, false);
        }
    } else {
        // 处理单选逻辑
        const isSelected = !!showSelectedRows.value.length;
        if (isSelected) {
            const selectedRow = showSelectedRows.value[0];
            const infoRowIndex = infoRows.value.findIndex((item) => item.id === selectedRow.id);
            const selectedRowIndex = selectedRows.value.findIndex((item) => item.id === selectedRow.id);
            if (infoRowIndex > -1) {
                const userRow = userData.value.find((item) => item.id === selectedRow.id);
                infoRows.value.splice(infoRowIndex, 1);
                if (userRow) {
                    userTableRef.value.toggleRowSelection(userRow, false);
                    userTableRef.value.toggleRowSelection(row, true);
                    selectedRows.value.push(row);
                }
            } else if (selectedRowIndex > -1) {
                if (row.id === selectedRow.id) {
                    selectedRows.value.splice(row, 1);
                    userTableRef.value.toggleRowSelection(selectedRow, false);
                } else {
                    selectedRows.value.splice(row, 1);
                    userTableRef.value.toggleRowSelection(selectedRow, false);
                    userTableRef.value.toggleRowSelection(row, true);
                    selectedRows.value.push(row);
                }
            }
        } else {
            // 未选中
            selectedRows.value.push(row);
            userTableRef.value.toggleRowSelection(row, true);
        }
    }
};
// 处理全选
const handleSelectAll = (selection) => {
    selectedRows.value = selection;
};
// 点击某一行
const handleRowClick = (row) => {
    isTriggeredByClick.value = true;
    clearTimeout(timer.value);
    timer.value = setTimeout(async () => {
        if (props.multiple) {
            const isValidate = await validateSelectionLimit2(row);
            if (isValidate) {
                // 数量正常
                const infoRowIndex = infoRows.value.findIndex((item) => item.id === row.id);
                const selectedRowIndex = selectedRows.value.findIndex((item) => item.id === row.id);
                if (infoRowIndex > -1) {
                    // 已选中
                    infoRows.value.splice(infoRowIndex, 1);
                    userTableRef.value.toggleRowSelection(row, false);
                } else if (selectedRowIndex > -1) {
                    // 已选中
                    selectedRows.value.splice(selectedRowIndex, 1);
                    userTableRef.value.toggleRowSelection(row, false);
                } else {
                    // 未选中
                    selectedRows.value.push(row);
                    userTableRef.value.toggleRowSelection(row, true);
                }
            } else {
                // 数量超出
                userTableRef.value.toggleRowSelection(row, false);
            }
        } else {
            // 处理单选逻辑
            const isSelected = !!showSelectedRows.value.length;
            if (isSelected) {
                const selectedRow = showSelectedRows.value[0];
                const infoRowIndex = infoRows.value.findIndex((item) => item.id === selectedRow.id);
                const selectedRowIndex = selectedRows.value.findIndex((item) => item.id === selectedRow.id);
                if (infoRowIndex > -1) {
                    const userRow = userData.value.find((item) => item.id === selectedRow.id);
                    infoRows.value.splice(infoRowIndex, 1);
                    if (userRow) {
                        userTableRef.value.toggleRowSelection(userRow, false);
                        userTableRef.value.toggleRowSelection(row, true);
                        selectedRows.value.push(row);
                    }
                } else if (selectedRowIndex > -1) {
                    if (row.id === selectedRow.id) {
                        selectedRows.value.splice(row, 1);
                        userTableRef.value.toggleRowSelection(selectedRow, false);
                    } else {
                        selectedRows.value.splice(row, 1);
                        userTableRef.value.toggleRowSelection(selectedRow, false);
                        userTableRef.value.toggleRowSelection(row, true);
                        selectedRows.value.push(row);
                    }
                }
            } else {
                // 未选中
                selectedRows.value.push(row);
                userTableRef.value.toggleRowSelection(row, true);
            }
        }
    }, doubleClickDelay.value);
};
// 双击某一行
const handleRowDbClick = async (row) => {
    console.log('handleRowDbClick', row);
    isTriggeredByClick.value = true;
    clearTimeout(timer.value);
    if (props.multiple) {
        // 处理多选逻辑
        const isValidate = await validateSelectionLimit2(row);

        if (isValidate) {
            // 数量正常
            const infoRowIndex = infoRows.value.findIndex((item) => item.id === row.id);
            const selectedRowIndex = selectedRows.value.findIndex((item) => item.id === row.id);
            if (infoRowIndex > -1) {
                // 已选中
                infoRows.value.splice(infoRowIndex, 1);
                userTableRef.value.toggleRowSelection(row, false);
            } else if (selectedRowIndex > -1) {
                // 已选中
                selectedRows.value.splice(selectedRowIndex, 1);
                userTableRef.value.toggleRowSelection(row, false);
            } else {
                // 未选中
                selectedRows.value.push(row);
                userTableRef.value.toggleRowSelection(row, true);
            }
        } else {
            // 数量超出
            userTableRef.value.toggleRowSelection(row, false);
        }
    } else {
        // 处理单选逻辑
        const isSelected = !!showSelectedRows.value.length;
        if (isSelected) {
            const selectedRow = showSelectedRows.value[0];
            const infoRowIndex = infoRows.value.findIndex((item) => item.id === selectedRow.id);
            const selectedRowIndex = selectedRows.value.findIndex((item) => item.id === selectedRow.id);
            if (infoRowIndex > -1) {
                const userRow = userData.value.find((item) => item.id === selectedRow.id);
                infoRows.value.splice(infoRowIndex, 1);
                if (userRow) {
                    userTableRef.value.toggleRowSelection(userRow, false);
                    userTableRef.value.toggleRowSelection(row, true);
                    selectedRows.value.push(row);
                }
            } else if (selectedRowIndex > -1) {
                if (row.id === selectedRow.id) {
                    selectedRows.value.splice(row, 1);
                    userTableRef.value.toggleRowSelection(selectedRow, false);
                } else {
                    selectedRows.value.splice(row, 1);
                    userTableRef.value.toggleRowSelection(selectedRow, false);
                    userTableRef.value.toggleRowSelection(row, true);
                    selectedRows.value.push(row);
                }
            }
            if (showSelectedRows.value.length === 1) {
                confirm();
            }
        } else {
            // 未选中
            selectedRows.value.push(row);
            userTableRef.value.toggleRowSelection(row, true);
            confirm();
        }
    }
};
// 点击部门节点
const deptNodeClick = (node) => {
    queryParams.value.current = 1;
    queryParams.value.deptId = node.id;
    getData();
};
// 点击角色节点
const roleNodeClick = (node) => {
    queryParams.value.current = 1;
    queryParams.value.roleId = node.id;
    getData();
};
// 确认选择
const confirm = () => {
    iptTagData.value = showSelectedRows.value || [];
    if (props.returnType === 'object') {
        if (props.multiple) {
            emit('update:modelValue', showSelectedRows.value);
            emit('change', showSelectedRows.value);
        } else {
            const user = showSelectedRows.value.length > 0 ? showSelectedRows.value[0] : null;
            emit('update:modelValue', user);
            emit('change', user);
        }
    } else if (props.returnType === 'string') {
        const ids = Array.isArray(showSelectedRows.value)
            ? showSelectedRows.value.map((item) => item.id).join(',')
            : '';
        emit('update:modelValue', ids);
        if (props.multiple) {
            emit('change', showSelectedRows.value);
        } else {
            const user = showSelectedRows.value.length > 0 ? showSelectedRows.value[0] : null;
            emit('change', user);
        }
    }
    closeDialog();
};
// 打开弹窗
const openDialog = async () => {
    open.value = true;
    loading.value = true;
    await getDept();
    await getData();
    infoRows.value = deepClone(iptTagData.value);
    loading.value = false;
};
// 关闭弹窗
const closeDialog = () => {
    tab.value = 'dept';
    total.value = 0;
    queryParams.value = {
        current: 1,
        size: 10,
        realName: '',
    };
    selectedRows.value = [];
    deptData.value = [];
    userData.value = [];
    deptSearch.value = '';
    roleSearch.value = '';
    timer.value = null;
    open.value = false;
};
// 选中的行名
const rowClassName = ({ row }) => {
    if (!!showSelectedRows) {
        const total = showSelectedRows.value?.length || 0;
        const isFind = Array.isArray(showSelectedRows.value)
            ? showSelectedRows.value.find((item) => item.id === row.id)
            : false;
        if (isFind && props.multipleLimit !== 0) {
            return 'row-selected';
        } else if (!props.multiple && props.multipleLimit !== 0) {
            return 'row-cursor';
        } else if (total > props.multipleLimit - 1 && props.multipleLimit !== 0) {
            return 'row-disabled';
        } else {
            return '';
        }
    }
};
const removeTag = () => {
    if (props.returnType === 'object') {
        if (props.multiple) {
            emit('update:modelValue', iptTagData.value);
            emit('change', iptTagData.value);
        } else {
            const user = Array.isArray(iptTagData.value) && iptTagData.value.length ? iptTagData.value[0] : null;
            emit('update:modelValue', user);
            emit('change', user);
        }
    } else if (props.returnType === 'string') {
        const ids = Array.isArray(iptTagData.value) ? iptTagData.value.map((item) => item.id).join(',') : '';
        emit('update:modelValue', ids);
        if (props.multiple) {
            emit('change', iptTagData.value);
        } else {
            const user = Array.isArray(iptTagData.value) && iptTagData.value.length ? iptTagData.value[0] : null;
            emit('change', user);
        }
    }
};
// 校验数量
const validateSelectionLimit2 = (row) => {
    return new Promise((reslove, reject) => {
        const findItem = showSelectedRows.value.find((item) => item.id === row.id);
        let mergedArray = [...showSelectedRows.value];
        if (!findItem) mergedArray = [...showSelectedRows.value, row];
        const uniqueRows = Array.from(new Map(mergedArray.map((item) => [item.id, item])).values());
        const total = uniqueRows?.length || 0;
        console.log('validateSelectionLimit2', total);
        if (total > props.multipleLimit && props.multipleLimit !== 0) {
            ElMessage({
                type: 'error',
                message: `最多可选${props.multipleLimit}行`,
            });
            return reslove(false);
        }
        return reslove(true);
    });
};
</script>
