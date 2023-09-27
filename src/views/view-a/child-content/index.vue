<template>
  <data-table :isLoading="tableLoading.isLoading.value" :size="TABLE_SIZE.large"
    :data="{ dataSource: listAccount, totalPage, currentPage }" :columns="columns" :on-get-account="handleGetPagination"
    :on-show-modal="showModal" :on-choose-account="handleChooseAccount" @data-account="handleChooseAccount"
    @data-update="handleUpdateAccount" @data-delete="handleDeleteAccount" >
    <template v-slot:action>
      <div class="input-search" >
        <a-input @change="handleSearchData" v-model:value="textSearch" placeholder="Search" >
          <template #suffix>
              <search-outlined />
          </template>
         </a-input>
      </div>
      <div class="btn-add" >
        <a-button type="primary" @click="showModal"> Thêm tài khoản
          <plus-outlined />
        </a-button>
      </div>
    </template>
    <template v-slot:detail="props" >
      <a-button  type="text" @click="handleSeeDetails(props.detailAccount)">
           <eye-outlined  />
        </a-button>
    </template>
  </data-table>
  <modal-form :isVisible="formModal.isVisible.value" :titleModal="modalFlag.modeModal.value" :on-hide-modal="hideModal" :detailAccount="detailAccount"
    :on-add-account="addAccount" :on-update-account="updateAccount" :on-get-account="getListAccount"
    :currentPage="currentPage" :on-action-modal="handleActionModal" />
</template>
<script setup>
import { useStore } from "@/stores";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia"
import { debounce } from 'lodash-es';
import { message, Modal } from 'ant-design-vue';
import {SearchOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { TABLE_SIZE } from "@/utils/constants";
import ModalForm from "../../view-b/modal/ModalForm.vue"
import { columns } from "./data";
import { useLoading, useModal, useFlag } from "@/utils/hooks";

const { getListAccount, addAccount, deleteAccount, updateAccount, searchAccount } = useStore();
const { listAccount, totalPage, currentPage } = storeToRefs(useStore());
const formModal = useModal();
const detailAccount = ref({})
const alertNotifi = ref('')
const textSearch = ref('')
const modalFlag = useFlag()
const tableLoading = useLoading();
const hideModal = () => {
  formModal.hideModal()
  detailAccount.value = {}
}
const showModal = () => {
  modalFlag.createMode()
   formModal.showModal()
}
const handleGetPagination = async (data) => {
  try {
    if (textSearch.value) {
      await handleSearchAccount(data)
    } else {
      await hadleGetAccount(data)
    }
  } catch (e) {
    message.error(e)
  } 
}

const hadleGetAccount = async (data) => {
  tableLoading.setLoading(true)
  try {
      await getListAccount(data)
  } catch (error) {
    message.error(e)
  } finally {
  tableLoading.setLoading(false)
  }
}

const handleSearchAccount = async (data) => {
  tableLoading.setLoading(true)
  try {
    const params = {
        page: data,
        textSearch: textSearch.value
      }
      await searchAccount(params)
  } catch (error) {
    message.error()
  } finally {
    tableLoading.setLoading(false)
  }
}
const   handleSearchData = debounce(value => {
  try {
    const data = { page: 1,textSearch: textSearch.value }
    textSearch.value ? handleSearchAccount(data) : hadleGetAccount(1)
  } catch (error) {
    message.error(error)
    alert(error)
  } 
}, 1000);
const handleDeleteAccount = async (record) => {
  try {
    Modal.confirm({
      title: `Xác nhận xoá tài khoản ${record.userName} `,
      content: 'Bạn có chắc chắn muốn xoá tài khoản này, hành động này sẽ khiến người dùng không thể truy cập vào hệ thống !',
      onOk: async () => {
        await deleteAccount(record);
        await getListAccount(currentPage.value);
        message.success("Xoá thành công")
      },
    });
  } catch (e) {
    message.error("Thất bại : ", e)
  }
}
const handleActionModal = async (data) => {
  try {
    if (detailAccount.value._id) {
      await updateAccount(data)
      alertNotifi.value = "Cập nhật tài khoản thành công"
    } else {
      await addAccount(data)
      alertNotifi.value = "Thêm tài khoản thành công"
    }
    hideModal()
    await handleGetPagination(currentPage.value);
    message.success(alertNotifi.value)
  } catch (error) {
    alert(error)
    message.error(error)
  }
}
const handleChooseAccount = async (data) => {
  detailAccount.value = data
  formModal.showModal()
  modalFlag.editMode()
}

const handleSeeDetails = async (data) => {
  detailAccount.value = data
  formModal.showModal()
  modalFlag.viewMode()
}

const handleUpdateAccount = async (record) => {
  detailAccount.value = record
  const dataUpdate = { id: record._id, isActive: !record.isActive, date: record.date, passWord: record.passWord }
  try {
    Modal.confirm({
      title: `Xác nhận thay đổi hoạt động của tài khoản `,
      content: 'Bạn có chắc chắn muốn thay đổi hoạt động ?',
      onOk: async () => {
        await updateAccount(dataUpdate)
        await getListAccount(currentPage.value);
        message.success("Cập nhật tài khoản thành công")
      },
    })
  } catch (e) {
    message.error("Thất bại : ", e)
  } finally {
  }
}
onMounted(async () => await handleGetPagination(1));
</script>
