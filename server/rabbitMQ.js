import rabbit from "rabbit.js";

class RabbitMQ {
  static context = null;
  static pubFCM;
  static subFCM;
  static pubDone;
  static subDone;

  static async initSockets() {
    if (this.context === null) {
      this.context = rabbit.createContext("amqp://leo:leo_password@rabbitmq");
      this.pubFCM = this.context.socket("PUBLISH");
      this.subFCM = this.context.socket("SUBSCRIBE");
      this.pubFCM.connect("notification.fcm");
      this.subFCM.connect("notification.fcm");
      // this.pubFCM.setEncoding("utf8");
      this.subFCM.setEncoding("utf8");
      this.pubDone = this.context.socket("PUBLISH");
      this.subDone = this.context.socket("SUBSCRIBE");
      this.pubDone.connect("notification.done");
      this.subDone.connect("notification.done");
      // this.pubDone.setEncoding("utf8");
      this.subDone.setEncoding("utf8");
    }
  }
}

export default RabbitMQ;
