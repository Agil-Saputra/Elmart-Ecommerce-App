import { useContext, useReducer } from "react";
import { createContext } from "react";
import { Reducer } from "./Reducer";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const Context = createContext();

const Provider = ({ children }) => {
  const [value, setValue] = useLocalStorage("cart", []);
  const [addressValue, setAddressValue] = useLocalStorage("address", []);

  const INITIAL_STATE = {
    cart: value || [],
    address: addressValue || [],
    searchQuery: "",
  };

  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    setValue(state.cart);
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    setAddressValue(state.address);
    localStorage.setItem("address", JSON.stringify(state.address));
  }, [state.address]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const State = () => {
  return useContext(Context);
};

export default Provider;
