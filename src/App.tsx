import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filter from "./components/Filter";
import { ExpenseProvider } from "./context/ExpenseContext";
import "./components/styles.css";

interface User {
  username: string;
  password: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMonth, setFilterMonth] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogin = (username: string, password: string) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      if (parsedUser.username === username && parsedUser.password === password) {
        setUser(parsedUser);
      } else {
        alert("Invalid username or password");
      }
    } else {
      alert("User not registered");
    }
  };

  const handleRegister = (username: string, password: string) => {
    const newUser = { username, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    setShowRegister(false); // Redirect to login screen
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowRegister(false);
  };

  if (!user) {
    return showRegister ? (
      <Register onRegister={handleRegister} />
    ) : (
      <Login onLogin={handleLogin} onNavigateToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <ExpenseProvider>
      <div className="app-container">
        <div className="header">
          <h1>Welcome, {user.username}</h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
        <Filter
          onCategoryChange={setFilterCategory}
          onMonthChange={setFilterMonth}
        />
        <ExpenseForm />
        <ExpenseList
          filterCategory={filterCategory}
          filterMonth={filterMonth}
        />
      </div>
    </ExpenseProvider>
  );
};

export default App;