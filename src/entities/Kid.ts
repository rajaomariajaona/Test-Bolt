import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Attendance } from "./Attendance";

@Entity()
export class Kid {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  qrCode: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Attendance, attendance => attendance.kid)
  attendances: Attendance[];
}