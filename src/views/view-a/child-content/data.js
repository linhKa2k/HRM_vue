// Define static config, example: table config
 
import {ref, reactive} from "vue"
export const columns = [

  {
    title: "STT",
    key: "STT",
    dataIndex: "STT",
    fixed: "left",
    align: "center",
    width : "30px"

  },
  {
    title: "Tên đăng nhập",
    key: "name",
    dataIndex: "userName",
    align: "center",
    fixed: "left",
    
  },
  {
    title: "Ngày tạo",
    key: "createAt",
    dataIndex: "createAt",
    align: "center",

    
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "isActive",
    align: "center",

  },
  
  {
    title: "Thao tác",
    key: "action",
    align: "center",


  },
];

export const demoData = [
  {
    name: "Nguyễn Thị Định",
    isActive: true,
  },
  {
    name: "Tạ Quảng Bửu",
    isActive: false,
  },
];

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
    span: 6,
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

