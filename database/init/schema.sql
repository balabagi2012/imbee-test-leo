GRANT ALL PRIVILEGES ON fcm_job.* TO 'leo' @'%' IDENTIFIED BY 'leo_password';

GRANT ALL PRIVILEGES ON fcm_job.* TO 'leo' @'localhost' IDENTIFIED BY 'leo_password';

CREATE TABLE fcm_job (
  identifier varchar(40),
  deliverAt date,
  PRIMARY KEY(`identifier`)
) DEFAULT CHARSET = utf8;