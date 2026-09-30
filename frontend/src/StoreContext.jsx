import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const url = "https://fooddelivery-app-backend-1zsh.onrender.com";

  const [food_list, setFood_list] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState("");

  // ---------------- FETCH FOOD ----------------
  const fetchFood = async () => {
    try {
      const resp = await axios.get(`${url}/api/food/list`);
      setFood_list(resp.data.data);
      console.log("Food loaded:", resp.data.data);
    } catch (error) {
      console.error("Food fetch failed:", error.message);
    }
  };

  // ---------------- CART ----------------
  const addCart = async (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeCart = async (itemId) => {
    setCartItem((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId]--;
      else delete updated[itemId];
      return updated;
    });

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const LoadcartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/fetch`,
        {},
        { headers: { token } }
      );
      setCartItem(response.data.cartData);
    } catch (err) {
      console.error("Cart load failed:", err.message);
    }
  };

  const getsubtotal = () => {
    let total = 0;
    for (const itemId in cartItem) {
      const item = food_list.find((p) => p._id === itemId);
      if (item) total += item.price * cartItem[itemId];
    }
    return total;
  };

  // ---------------- INIT ----------------
  useEffect(() => {
    fetchFood();

    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      LoadcartData(savedToken);
    }
  }, []);

  const Context = {
    foodlist: food_list,
    cartItem,
    addCart,
    removeCart,
    getsubtotal,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={Context}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
