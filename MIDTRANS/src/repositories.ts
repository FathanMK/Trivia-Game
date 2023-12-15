import AppDataSource from "./AppDataSource";
import { Transaction } from "./entities/Transaction.entity";

const TransactionRepository = AppDataSource.getRepository(Transaction);

export { TransactionRepository };
