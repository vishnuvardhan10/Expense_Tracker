export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
}