import { Sequelize } from "sequelize";
import "dotenv/config";
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db: { sequelize?: Sequelize } = {};

const dbUrl =
  env === "development"
    ? `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
    : `postgres://${config.username}:${config.password}@${config.host}/${config.database}`;

let sequelize = new Sequelize(dbUrl, {
  logging: true,
  dialectOptions: {
    ssl:
      env === "development"
        ? false
        : {
            require: true,
            rejectUnauthorized: true,
          },
  },
});

db.sequelize = sequelize;

export { db, sequelize };
