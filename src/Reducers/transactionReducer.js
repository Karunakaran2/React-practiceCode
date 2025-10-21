import React from "react";

export const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return [
        ...state,
        {
          id: Date.now(),
          description: action.payload.description,
          amount: parseFloat(action.payload.amount),
        },
      ];

    case "DELETE_TRANSACTION":
      return state.filter((t) => t.id !== action.payload);

    case "SET_TRANSACTIONS":
      return action.payload;

    default:
      return state;
  }
};
