import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementUI from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";

const app = createApp(App);
app.use(ElementUI);
app.use(router);
app.mount("#app");
