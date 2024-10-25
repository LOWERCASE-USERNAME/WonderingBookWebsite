import { PaymentType } from "./paymentType";
import { Wallet } from "./wallet";

export interface Payment {
  paymentId: string;
  walletId: number;
  payAmount: number;
  paymentType: PaymentType | null;
  createdAt: string | null;
  wallet: Wallet | null;
}
