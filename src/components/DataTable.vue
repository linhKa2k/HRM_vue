<template  >
  <div class="table-container-item">
    <div class="wrapper-btn--add">
        <slot name="action">
        </slot>
    </div>
    <div class="wrapper-item-table">
      <a-table bordered :data-source="data.dataSource" :columns="columns" :loading="isLoading" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'" class="table-item-status">
            <span>
              <a-tag :color="record.isActive ? 'green' : 'gray'">
                {{ record.isActive ? "Hoạt động" : "Không hoạt động" }}
              </a-tag>
            </span>
          </template>
          <template v-if="column.key === 'name'">
            <div class="table-item-name">
              {{ record.userName }}
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <slot name="detail" :detailAccount="record" ></slot>
            <a-button type="text" @click="handleChooseAccount(record)">
              <EditOutlined />
            </a-button>
            <a-button type="link" @click="handleUpdateStatus(record)">
              <UnlockOutlined v-if="record.isActive" />
              <LockOutlined v-else />
            </a-button>
            <a-button type="text" danger @click="handleDeleteAccount(record)">
              <DeleteOutlined />
            </a-button>
          </template>
        </template>
      </a-table>
    </div>
    <div class="btn-item--pagination">
      <div>
        <a-pagination v-model:current="data.currentPage" :defaultPageSize="1" :total="data.totalPage"
          @change="handleGetAccount" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { array, shape, number, func, oneOf, bool } from "vue-types";
import { DeleteOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons-vue';
import { TABLE_SIZE } from "@/utils/constants";
import '../styles/DataTable.css'
const emit = defineEmits(['dataAccount', "dataUpdate", "dataDelete"])
const props = defineProps({
  data: shape({
    totalPage: number(),
    dataSource: array(),
    currentPage: number(),
    options: array(),
  }),
  columns: array().def([]),
  size: oneOf([TABLE_SIZE.small, TABLE_SIZE.medium, TABLE_SIZE.large]),
  onGetAccount: func(),
  onAddAccount: func(),
  onShowModal: func(),
  isLoading: bool(),
});
const handleGetAccount = async (data) => {
  try {
    await props.onGetAccount(data);
  } finally {
  }
}
const handleDeleteAccount = async (record) => {
  emit("dataDelete", record)
}
const handleUpdateStatus = async (data) => {
  emit("dataUpdate", data)
}
const handleChooseAccount = (record) => {
  emit("dataAccount", record)
}
</script>
