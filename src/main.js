import Antd, { message } from "ant-design-vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "ant-design-vue/dist/antd.css";
import VWave from "v-wave";

import DataTable from "@/components/DataTable.vue";

import App from "./App.vue";
import router from "./router";
import "./styles/main.css";

const app = createApp(App);

/* Set global message */
app.config.globalProperties.$message = message;

app.use(createPinia());
app.use(router);
app.use(Antd);

/* Setup ripple */
app.use(VWave, {
  directive: "ripple",
  color: "currentColor",
  easing: "ease-out",
  duration: 0.4,
  dissolveDuration: 0.15,
  initialOpacity: 0.2,
  finalOpacity: 0.1,
  cancellationPeriod: 75,
  trigger: "auto",
});

/* Register component below this line */
app.component("data-table", DataTable);
/* Register component above this line */

app.mount("#app");
