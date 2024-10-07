import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Attendance } from "./Attendance";

@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Attendance, attendance => attendance.event)
  attendances: Attendance[];
}