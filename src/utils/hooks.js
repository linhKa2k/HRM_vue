import { ref } from "vue";
import { title } from "./constants"

export const useLoading = () => {
  const isLoading = ref(false);

  const setLoading = (status) => {
    isLoading.value = status;
  };

  return {
    isLoading,
    setLoading,
  };
};

export const useModal = () => {
  const isVisible = ref(false);

  const showModal = () => (isVisible.value = true);

  const hideModal = () => (isVisible.value = false);

  return {
    isVisible,
    showModal,
    hideModal,
  };
};

export const useFlag = () => {
  const modeModal = ref("Thêm tài khoản");

  const viewMode = () => modeModal.value = title.VIEW
  const editMode = () => modeModal.value = title.EDIT
  const createMode = () => modeModal.value = title.CREATE

  return {
    modeModal,
    viewMode,
    editMode,
    createMode,
  }
}


