import mysql from "mysql";

class Model {
  static connection = mysql.createConnection({
    host: "localhost",
    user: "leo",
    password: "leo_password",
    port: "3306",
    database: "fcm_job",
  });

  constructor(){
    this.connection.connect()
  }

  static async getJobs() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM fcm_job";
      this.connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });

    });
  }

  static async createJob(identifier, deliverAt) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO fcm_job(identifier,deliverAt) VALUES(?,?)";
      this.connection.query(
        sql,
        [identifier, deliverAt],
        function (err, result) {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
}

export default Model;
