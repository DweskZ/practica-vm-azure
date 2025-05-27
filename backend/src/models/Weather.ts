import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  city!: string;

  @Column()
  description!: string;

  @Column("float")
  temperature!: number;

  @Column({ type: "float", nullable: true })
  feels_like!: number;

  @Column({ type: "float", nullable: true })
  humidity!: number;

  @Column({ type: "float", nullable: true })
  wind_speed!: number;

  @Column({ nullable: true })
  icon!: string;

  @Column({ nullable: true })
  country!: string;

  @Column({ nullable: true })
  date!: string;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;
}
