GRANT ALL PRIVILEGES ON imbee_test.* TO 'leo' @'%' IDENTIFIED BY 'leo_password';

GRANT ALL PRIVILEGES ON imbee_test.* TO 'leo' @'localhost' IDENTIFIED BY 'leo_password';

CREATE TABLE fcm_job (
  identifier varchar(40),
  deliverAt date,
  PRIMARY KEY(`identifier`)
) DEFAULT CHARSET = utf8;

CREATE TABLE fcm_device (
  identifier varchar(40),
  token varchar(200),
  PRIMARY KEY(`identifier`)
) DEFAULT CHARSET = utf8;