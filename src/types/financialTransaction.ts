import { TransactionStatus } from "./transactionStatus";
import { Wallet } from "./wallet";

export interface FinancialTransaction {
  financialTransactionId: string;
  walletId: number;
  transactionCode: string;
  amount: number;
  createdAt: string | null;
  expiredAt: string | null;
  status: TransactionStatus | null;
  wallet: Wallet | null;
}
