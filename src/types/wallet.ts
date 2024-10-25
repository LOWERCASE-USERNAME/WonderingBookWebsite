import { User } from "./user";
import { Payment } from "./payment";
import { FinancialTransaction } from "./financialTransaction";

export interface Wallet {
  walletId: number;
  userId: string;
  balance: number | null;
  user: User;
  payments: Payment[] | null;
  transactions: FinancialTransaction[] | null;
}
