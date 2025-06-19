// src/components/Filter.tsx
import { useState } from "react";
import "./styles.css";

interface FilterProps {
  onCategoryChange: (category: string) => void;
  onMonthChange: (month: string) => void;
}

const Filter = ({ onCategoryChange, onMonthChange }: FilterProps) => {
  const [cat, setCat] = useState("");
  const [month, setMonth] = useState("");

  return (
    <div className="filter-container">
      <input
        placeholder="Filter by Category"
        value={cat}
        onChange={e => {
          setCat(e.target.value);
          onCategoryChange(e.target.value);
        }}
      />

      <input
        type="month"
        value={month}
        onChange={e => {
          setMonth(e.target.value);
          onMonthChange(e.target.value);
        }}
        className="month-filter"
      />
    </div>
  );
};

export default Filter;
