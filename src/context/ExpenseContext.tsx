// src/context/ExpenseContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Expense } from "../types";

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpense must be used within ExpenseProvider");
  return context;
};

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("expenses");
    if (stored) setExpenses(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const updateExpense = (updated: Expense) => {
    setExpenses(prev => prev.map(e => (e.id === updated.id ? { ...updated } : e)));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, updateExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
