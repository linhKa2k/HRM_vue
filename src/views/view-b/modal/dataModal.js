import {ref, reactive} from "vue"

export const options = ref([{
    value: 0,
    label: "Không hoạt động",
    width : "200px"
  },
  {
    value: 1,
    label: 'Hoạt động',
    width : "200px"
  
  }
  ]);
  
  export const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  export const formTailLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
      offset: 4,
    },
  };
  
  export const rulesRef = reactive({
    name: [{
      required: true,
      message: 'Vui lòng nhập tên đăng nhập',
    }],
  });
  
  