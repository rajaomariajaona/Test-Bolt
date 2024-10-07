import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Kid } from "./Kid";
import { Event } from "./Event";

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Kid, kid => kid.attendances)
  kid: Kid;

  @ManyToOne(() => Event, event => event.attendances)
  event: Event;

  @Column()
  checkInTime: Date;
}