import { createContext, useReducer } from "react";

// Creating the common context api for toggle theme mode..
const ThemeContext = createContext();

// initial state
const INITIAL_STATE = { darkMode: false };
console.log(INITIAL_STATE)
// Reducer function to update the component state..
const themeModereducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
};

//
const ThemeProvider = (props) => {
  const [state, dispatch] = useReducer(themeModereducer, INITIAL_STATE);
  return (
    <ThemeContext.Provider value={{state, dispatch}}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export {ThemeContext, ThemeProvider};