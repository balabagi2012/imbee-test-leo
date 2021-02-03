<template>
  <div id="app">
    <button @click="removeJobs">remove all jobs</button>
    <div>
      <label for="text">text</label>
      <input type="text" v-model="text" />
    </div>
    <h1>devices</h1>
    <div>
      <ul>
        <li v-for="device in devices" :key="device.identifier">
          <span>
            identifier:{{ device.identifier }} token:{{ device.token }}
          </span>
          <button @click="sendNotification(device.token)">
            send Notification
          </button>
        </li>
      </ul>
    </div>
    <h1>jobs</h1>
    <div>
      <ul>
        <li v-for="job in jobs" :key="job.identifier">
          identifier:{{ job.identifier }} deliverAt:{{ job.deliverAt }}
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
      text: "say something...",
      context: null,
      subDone: null,
    };
  },
  mounted() {
    this.fetchDevices();
    this.fetchJobs();
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
    messaging.onMessage((payload) => {
      var notifyMsg = payload.notification;
      var notification = new Notification(notifyMsg.title, {
        body: notifyMsg.body,
        icon: notifyMsg.icon,
      });
      setTimeout(() => this.fetchJobs(), 500);
    });
  },
  methods: {
    async sendNotification(deviceId) {
      await fetch(`http://localhost:3000/jobs`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceId,
          text: this.text,
        }),
      });
    },
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

    async removeJobs() {
      await fetch(`http://localhost:3000/jobs`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      this.jobs = [];
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
