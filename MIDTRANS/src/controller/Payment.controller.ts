import { Request, Response } from "express";
import { nanoid } from "nanoid";
import axios from "axios";
import PaymentServices from "../services/Payment.service";
import { TransactionRepository } from "../repositories";
import setDiamonds from "../utils/setDiamonds";

class PaymentControllers {
  async payment(req: Request, res: Response) {
    const { diamond, user_detail, user_id, diamond_before } = req.body;
    const transaction = {
      transaction_details: {
        order_id: nanoid(),
        gross_amount: diamond.price,
      },
      item_details: diamond,
      customer_details: user_detail,
    };
    const axiosOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Basic U0ItTWlkLXNlcnZlci1sNUQ3dFJvdEpEN3Zrbm9ZOXlmY1pCMmI6",
      },
    };
    await axios
      .post(
        "https://app.sandbox.midtrans.com/snap/v1/transactions",
        transaction,
        axiosOptions
      )
      .then((response) => {
        PaymentServices.payment(transaction, user_id, diamond_before).then(
          () => {
            res.status(201).json({
              message: "Transaction is successfully created!",
              data: response.data,
            });
          }
        );
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json({ message: error });
      });
  }
  async midtransCallback(req: Request, res: Response) {
    const body = req.body;

    const transaction = await TransactionRepository.findOneBy({
      transaction_id: body.order_id,
    });
    if (transaction) {
      if (
        body.transaction_status === "capture" ||
        body.transaction_status === "settlement"
      ) {
        await TransactionRepository.update(
          { transaction_id: body.order_id },
          { status: "SETTLED" }
        );
        const transaction = await TransactionRepository.findOneBy({
          transaction_id: body.order_id,
        });
        if (transaction) {
          const currentDiamond =
            transaction.diamond_before +
            setDiamonds(transaction.diamond_id as string);
          await axios
            .put(`http://127.0.0.1:8000/api/user/${transaction?.user_id}`, {
              diamonds: currentDiamond,
            })
            .catch((error) => console.error(error));
        }
      }
      if (body.transaction_status === "deny") {
        await TransactionRepository.update(
          { transaction_id: body.order_id },
          { status: "DENIED" }
        );
      }
    }
  }
}

export default new PaymentControllers();
