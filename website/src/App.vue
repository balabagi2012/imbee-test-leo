<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import firebase from "@/firebase";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(
        (res) => {
          // 若允許通知 -> 向 firebase 拿 token
          return messaging.getToken();
        },
        (err) => {
          // 若拒絕通知
          console.log(err);
        }
      )
      .then((token) => {
        // 成功取得 token
        console.log(token);
      });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
