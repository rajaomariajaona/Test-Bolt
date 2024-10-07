import { DataSource } from "typeorm";
import { Kid } from "../entities/Kid";
import { Event } from "../entities/Event";
import { Attendance } from "../entities/Attendance";
import { Admin } from "../entities/Admin";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [Kid, Event, Attendance, Admin],
  synchronize: true,
  logging: false,
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
};