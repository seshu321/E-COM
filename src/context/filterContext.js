import React, { useContext, useEffect, useReducer } from "react";
import reducerFn from "../reducers/filter_reducer";
import ProductsContext from "./productsContext";

const initialState = {
  allProducts: [],
  filterProducts: [],
  sortValue: "ascending",
  filters: {
    searchText: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext({});

export const FilterContextProvider = ({ children }) => {
  const { products } = useContext(ProductsContext);
  const [state, dispatchFn] = useReducer(reducerFn, initialState);

  useEffect(() => {
    dispatchFn({ type: "LOAD_PRODCUTS", payload: products });
  }, [products]);
  useEffect(() => {
    dispatchFn({ type: "FILTERED_PRODUCTS" });
  }, [products, state.filters]);

  useEffect(() => {
    dispatchFn({ type: "SORT_PRODUCTS" });
  }, [products, state.sortValue,state.filters]);

  const updateSort = (e) => {
    dispatchFn({ type: "UPDATE_SORT", payload: e.target.value });
  };

  const updateFilter = (e) => {
    let name = e.target.name;
  
    let value;

    if (name === "searchText") {
      value = e.target.value;
    }
    if (name === "category") {
      value = e.target.innerHTML;
   
    }
    if (name === "company") {
      value = e.target.value;
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    if (name === "price") {
      value = Number(e.target.value);
    }

    dispatchFn({ type: "UPDATE_FILTERS", payload: { name, value } });
  };

  const clearFilters = () => {
    dispatchFn({ type: "CLEAR_ALL" });
  };
  const contextValue = {
    updateSort,
    sortValue: state.sortValue,
    filterProducts: state.filterProducts,
    allProducts: state.allProducts,
    updateFilter,
    filters: state.filters,
    clearFilters,
  };
  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
