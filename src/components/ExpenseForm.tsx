import React, { useState } from "react";
import { Expense } from "../types";
import { useExpense } from "../context/ExpenseContext";
import { v4 as uuid } from "uuid";
import "./styles.css";

const ExpenseForm = () => {
  const { addExpense } = useExpense();
  const [form, setForm] = useState({ title: "", amount: "", category: "", date: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: uuid(),
      title: form.title,
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date
    };
    addExpense(newExpense);
    setForm({ title: "", amount: "", category: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
      <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Utilities">Utilities</option>
        <option value="Health">Health</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      <button type="submit">Add Expense</button>
    </form>
  );
};
export default ExpenseForm;