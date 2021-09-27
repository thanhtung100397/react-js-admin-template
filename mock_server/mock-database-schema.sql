CREATE TABLE IF NOT EXISTS user(
   id               VARCHAR(36)     NOT NULL PRIMARY KEY,
   username         VARCHAR(255)    NOT NULL,
   password         VARCHAR(255)    NOT NULL,
   first_name       VARCHAR(35)     NOT NULL,
   last_name        VARCHAR(70)     NOT NULL,
   banned           INTEGER(1)      NOT NULL                DEFAULT 0,
   created_date     DATETIME        NOT NULL                DEFAULT CURRENT_TIMESTAMP
);
