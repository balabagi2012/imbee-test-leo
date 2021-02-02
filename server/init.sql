CREATE DATABASE fcm_job;

GRANT ALL PRIVILEGES ON fcm_job.* TO 'leo' @'%' IDENTIFIED BY 'leo_password';

GRANT ALL PRIVILEGES ON fcm_job.* TO 'leo' @'localhost' IDENTIFIED BY 'leo_password';

USE fcm_job CREATE TABLE fcm_job (
  identifier VARCHAR(40) deliverAt DATE PRIMARY KEY (identifier)
);

INSERT INTO
  fcm_job(identifier, deliverAt)
VALUES
('fcm-msg-test', "2021-02-02T08:19:55.245Z")