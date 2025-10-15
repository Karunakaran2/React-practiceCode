import React, { useEffect, useReducer, useRef, useState } from "react";
import { transactionReducer } from "../Reducers/transactionReducer";

const Transactions = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  // const [transactions, setTransactions] = useState([]);
  const [transactions, dispatch] = useReducer(transactionReducer, []);
  const [filter, setFilter] = useState("all");

  const isFirstRender = useRef(true);

  useEffect(() => {
    const transactionSaved = JSON.parse(localStorage.getItem("transactions"));
    if (transactionSaved)
      dispatch({ type: "SET_TRANSACTIONS", payload: transactionSaved });
    // if (transactionSaved) setTransactions(transactionSaved);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();
    if (description.trim() === "" || amount.trim() === "") {
      alert("Fields are Required");
      return;
    }
    dispatch({
      type: "ADD_TRANSACTION",
      payload: { description, amount: parseFloat(amount) },
    });
    // const newTransaction = {
    //   id: Date.now(),
    //   description,
    //   amount: parseFloat(amount),
    // };
    // setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
  };

  // const onDelete = (id) => {
  //   setTransactions(transactions.filter((t) => t.id !== id));
  // };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const balance = income - expense;

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "income") return t.amount > 0;
    if (filter === "expense") return t.amount < 0;
    return true;
  });

  return (
    <div className="expense-tracker container mt-5 p-4 rounded-2 shadow w-50">
      <h1 className="text-center mb-4">💰 Expense Tracker</h1>

      <div className="text-center mb-4">
        <h3>
          Balance:{" "}
          <span className="text-primary fw-bold">₹{balance.toFixed(2)}</span>
        </h3>
        <div className="d-flex justify-content-around mt-3">
          <p className="text-success fw-bold">Income: ₹{income.toFixed(2)}</p>
          <p className="text-danger fw-bold">
            Expense: ₹{Math.abs(expense).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="card card-body mb-4">
        <h5 className="text-center fw-bold mb-3">Add New Transaction</h5>
        <form onSubmit={addTransaction}>
          <input
            type="text"
            placeholder="Description"
            className="form-control mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount (+ for income, - for expense)"
            className="form-control mb-3"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTransaction(e)}
          />
          <button className="btn btn-primary" type="submit">
            Add Transaction
          </button>
        </form>
      </div>

      <h4 className="fw-bold mb-3">Transaction History</h4>

      <div className="d-flex justify-content-center gap-2 my-3">
        <button
          className={`btn ${
            filter === "all" ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn ${
            filter === "income" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setFilter("income")}
        >
          Income
        </button>
        <button
          className={`btn ${
            filter === "expense" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => setFilter("expense")}
        >
          Expense
        </button>
      </div>

      {transactions.length === 0 ? (
        <p className="text-muted">No transactions yet.</p>
      ) : (
        <ul className="list-unstyled">
          {filteredTransactions.map((t) => (
            <li
              key={t.id}
              className={`d-flex justify-content-between align-items-center mb-2 p-2 rounded shadow-sm ${
                t.amount > 0
                  ? "border-start border-4 border-success text-success"
                  : "border-start border-4 border-danger text-danger"
              }`}
            >
              <div>
                <strong>{t.description}</strong> <br />
                <small>₹{t.amount.toFixed(2)}</small>
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() =>
                  dispatch({ type: "DELETE_TRANSACTION", payload: t.id })
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
