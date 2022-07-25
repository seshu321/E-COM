const reducerFn = (state, action) => {
  const { type, payload } = action;

  if (type === "LOAD_PRODCUTS") {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      allProducts: [...payload],
      filterProducts: [...payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (type === "SORT_PRODUCTS") {
    let { filterProducts, sortValue } = state;

    let temp = [...filterProducts];
    let newProducts;
    if (sortValue === "ascending") {
      newProducts = temp.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sortValue === "descending") {
      newProducts = temp.sort((a, b) => {
        return b.price - a.price;
      });
    }

    return { ...state, filterProducts: newProducts };
  }
  if (type === "UPDATE_SORT") {
    return { ...state, sortValue: payload };
  }
  if (type == "FILTERED_PRODUCTS") {
    const { allProducts } = state;
    const { searchText, category, company, color, price, shipping } =
      state.filters;

    let temp = [...allProducts];
    if (searchText) {
      temp = temp.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (category) {
      if (category === "all") {
        temp = temp;
      } else {
        temp = temp.filter((item) => item.category === category);
      }
    }
    if (company) {
      if (company === "all") {
        temp = temp;
      } else {
        temp = temp.filter((item) => item.company === company);
      }
    }
    if (shipping) {
      temp = temp.filter((product) => product.shipping === true);
    }
    temp = temp.filter((product) => product.price <= price);
    return {
      ...state,
      filterProducts: temp,
    };
  }
  if (type === "UPDATE_FILTERS") {
    const { name, value } = payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (type === "CLEAR_ALL") {
    return {
      ...state,

      filters: {
        ...state.filters,
        searchText: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
};

export default reducerFn;
