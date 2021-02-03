<template>
  <div id="app">
    <h1>devices</h1>
    <div>
      <ul>
        <li v-for="device in devices" :key="device.identifier">
          identifier:{{ device.identifier }} token:{{ device.token }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
export default {
  name: "App",
  components: {},
  data() {
    return {
      devices: [],
      jobs: [],
    };
  },
  mounted() {
    this.fetchDevices();
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
      .then(async (token) => {
        // 成功取得 token
        await this.setDevice(token);
        await this.fetchDevices();
      });
  },
  methods: {
    async fetchDevices() {
      const response = await fetch(`http://localhost:3000/devices`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      this.devices = await response.json();
    },
    async setDevice(token) {
      await fetch(`http://localhost:3000/devices/web`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
    },
    async fetchJobs() {
      const response = await fetch(`http://localhost:3000/jobs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      this.jobs = await response.json();
    },
  },
};
</script>

<style lang="scss">
</style>
