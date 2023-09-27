import { defineStore } from "pinia";
import { ref } from "vue";
import { businessApi } from "@/apis";
import { LIMIT } from "@/utils/constants";

export const useStore = defineStore("businessName", () => {
  const listAccount = ref([])
  const totalPage = ref(0)
  const currentPage = ref(0)

  const getListAccount = async (params) => {
    const data = { page: params, limit: LIMIT }
    const { getApi } = businessApi(data);
    currentPage.value = params
    const res = await getApi(data)
    listAccount.value = res.listData
    totalPage.value = res.totalPage
    return;
  }

  const addAccount = async (data) => {
    const { addApi } = businessApi(data)
    await addApi(data)
    currentPage.value = 1
    return;
  }

  const deleteAccount = async (data) => {
    const { deleteApi } = businessApi(data)
    const countAccount = listAccount.value.length
    const prevPage = currentPage.value - 1
    currentPage.value = countAccount === 1 ? prevPage : currentPage.value
    return await deleteApi(data)
  }
  const updateAccount = async (data) => {
    const { updateApi } = businessApi(data)
    return await updateApi(data)
  }

  const searchAccount = async (params) => {
    const data = { page: params.page, textSearch: params.textSearch, limit: LIMIT }
    const { searchApi } = businessApi(data);
    currentPage.value = params.page
    const res = await searchApi(data)
    listAccount.value = res.listData
    totalPage.value = res.totalPage
    return;
  }

  return {
    listAccount,
    totalPage,
    currentPage,
    getListAccount,
    addAccount,
    deleteAccount,
    updateAccount,
    searchAccount
  };
});
