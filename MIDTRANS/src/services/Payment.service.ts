import { TransactionRepository } from "../repositories";

class PaymentServices {
  async payment(transaction: any, user_id: any, diamond_before: number) {
    try {
      const newTransaction = {
        transaction_id: transaction.transaction_details.order_id,
        name:
          transaction.customer_details.first_name +
          transaction.customer_details.last_name,
        email: transaction.customer_details.email,
        status: "PENDING",
        diamond_id: transaction.item_details.id,
        user_id,
        diamond_before,
      };
      await TransactionRepository.save(newTransaction);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new PaymentServices();
