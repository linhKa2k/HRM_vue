<template>
    <div>
      <a-modal v-model:visible="isVisible" :title="titleModal" @cancel="hideModal">
        <template #footer>
          <a-button v-if="titleModal != title.VIEW" type="primary" :loading="isLoadingBtn" @click="handleSubmit">{{
              modelRef.id ? 'Cập nhật' : 'Tạo tài khoản'
          }}
          </a-button>
          <a-button @click="hideModal" :loading="isLoadingBtn">Huỷ</a-button>
        </template>
        <a-form :model="modelRef" v-bind="formItemLayout">
          <a-form-item label="Tên đăng nhập" v-bind="validateInfos.name">
            <a-input v-model:value="modelRef.name" :disabled="titleModal !== title.CREATE" class="input-form-modal" />
          </a-form-item>
          <a-form-item name="rules" label="Ngày sinh">
            <a-date-picker v-model:value="modelRef['date']" value-format="YYYY-MM-DD" class="input-form-modal"
              :format="['DD/MM/YYYY', 'DD/MM/YY']" :disabled="titleModal === title.VIEW" />
          </a-form-item>
          <a-form-item label="Mật khẩu" class="form-item">
            <a-input-password v-model:value="modelRef.passWord" :disabled="titleModal !== title.EDIT"
              class="input-form-modal" />
          </a-form-item>
          <a-form-item v-if="disabled" name="switch" label="Trạng thái">
            <a-space>
              <a-select ref="select" :value="modelRef.isActive == true ? 1 : 0" :options="options"
                class="input-form-modal" @change="handleChangeStatus" :disabled="titleModal === title.VIEW"></a-select>
            </a-space>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </template>
  <script setup>
  import { ref, watch, reactive, toRaw, computed } from "vue";
  import { Form, message } from 'ant-design-vue';
  import { bool, func, object, number, string } from "vue-types";
  import { title } from "@/utils/constants"
  import ModalForm from "@/styles/dataTable.css"
  import { options, formItemLayout, rulesRef } from './dataModal'
  const useForm = Form.useForm;
  const isLoadingBtn = ref(false)
  const modelRef = reactive({
    name: "",
    date: "",
    id: "",
    isActive: "",
    passWord: ""
  })
  const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
    onValidate: (...args) => { },
  });
  const props = defineProps({
    onGetAccount: func(),
    isVisible: bool(),
    onHideModal: func(),
    onAddAccount: func(),
    detailAccount: object(),
    onUpdateAccount: func(),
    currentPage: number(),
    onActionModal: func(),
    titleModal: string() 
  });
  const handleChangeStatus = (value) => {
    value === 1 ? modelRef.isActive = true : modelRef.isActive = false;
  }
  const handleSubmit = () => {
    validate().then(() => {
      handleDispatchAction(toRaw(modelRef))
    })
      .catch(err => { });
  };
  const handleDispatchAction = async (data) => {
    try {
      isLoadingBtn.value = true
      await props.onActionModal(data)
    } catch (error) {
      alert(error)
      message(error);
    } finally { 
      resetFields()
      isLoadingBtn.value = false
    }
  }
  const hideModal = async (data) => {
    resetFields()
    props.onHideModal()
  }
  const disabled = computed(() => {
    if (modelRef.id) return true
  });
  watch(() => props.detailAccount, (data) => {
    modelRef.name = data.userName
    modelRef.date = data.date
    modelRef.passWord = data.passWord
    modelRef.id = data._id
    modelRef.isActive = data.isActive
  })
  </script>
  
  
