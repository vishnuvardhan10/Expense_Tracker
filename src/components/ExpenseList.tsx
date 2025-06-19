// src/components/ExpenseList.tsx
import React, { useState } from "react";
import { useExpense } from "../context/ExpenseContext";
import "./styles.css";

interface ExpenseListProps {
  filterCategory: string;
  filterMonth: string;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ filterCategory, filterMonth }) => {
  const { expenses, deleteExpense, updateExpense } = useExpense();
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: "", amount: "", category: "", date: "" });

  const filtered = expenses.filter(e => {
    const matchesCategory = filterCategory ? e.category.toLowerCase().includes(filterCategory.toLowerCase()) : true;
    const matchesMonth = filterMonth ? e.date.startsWith(filterMonth) : true;
    return matchesCategory && matchesMonth;
  });

  const startEdit = (id: string, data: any) => {
    setEditId(id);
    setEditData({ ...data });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateExpense({ id: editId, ...editData, amount: parseFloat(editData.amount) });
      setEditId(null);
      setEditData({ title: "", amount: "", category: "", date: "" });
    }
  };

  return (
    <div className="expense-list">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(e => (
            <tr key={e.id}>
              {editId === e.id ? (
                <>
                  <td><input value={editData.title} onChange={ev => setEditData({ ...editData, title: ev.target.value })} /></td>
                  <td><input type="number" value={editData.amount} onChange={ev => setEditData({ ...editData, amount: ev.target.value })} /></td>
                  <td><input value={editData.category} onChange={ev => setEditData({ ...editData, category: ev.target.value })} /></td>
                  <td><input type="date" value={editData.date} onChange={ev => setEditData({ ...editData, date: ev.target.value })} /></td>
                  <td>
                    <button onClick={handleEditSubmit}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{e.title}</td>
                  <td>₹{e.amount.toFixed(2)}</td>
                  <td>{e.category}</td>
                  <td>{e.date}</td>
                  <td>
                    <button onClick={() => startEdit(e.id, e)}>Edit</button>
                    <button onClick={() => deleteExpense(e.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
