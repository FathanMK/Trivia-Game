import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "transactions" })
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  transaction_id: string;

  @Column()
  diamond_id: string;

  @Column()
  user_id: number;

  @Column()
  diamond_before: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  status: string;
}
