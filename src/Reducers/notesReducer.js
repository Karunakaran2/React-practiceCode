import React from "react";

export const notesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload.title,
          description: action.payload.description,
          color: action.payload.color,
          createdAt: new Date().toLocaleString(),
        },
      ];

    case "DELETE_NOTE":
      return state.filter((n) => n.id !== action.payload);

    case "UPDATE_NOTE":
      return state.map((note) =>
        note.id === action.payload.id
          ? {
              ...note,
              title: action.payload.title,
              description: action.payload.description,
              color: action.payload.color,
              createdAt: new Date().toLocaleString(),
            }
          : note
      );

    case "SET_NOTES":
      return action.payload;

    default:
      return state;
  }
};
