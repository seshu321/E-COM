import React, { useContext } from "react";
import styled from "styled-components";
import FilterContext from "../context/filterContext";
import { getUnique } from "../utils/helpers";
import { formatPrice } from "../utils/helpers";

const Wrapper = styled.main`
.input{
    padding 0.5rem 0.3rem;
    border:none;
    outline:none;
    background: var(--clr-grey-10);
    width:80%;
 
}
  .sort {
    margin-top:2rem;
    select {
        width:80%;
      padding: 4px;
      font-size: 1rem;
    }
  }

  .company-list{
    margin:2rem 0;
    font-size:1rem;
    select {
        width:80%;
        padding: 4px;
        font-size: 1rem;
      }
  }
  .categories{
    margin-top:2rem;
  }
  .categori-list{
 
    button{
        display:block;
        border:none;
        margin:0.5rem 0;
        background:transparent;
        color: var(--clr-grey-5);
    }
    button.active{
        border-bottom:1px solid grey;
    }

  }
  .free-shipping{
    width:80%;
    display:flex;
    justify-content:space-between;
    align-items:center;
  
    p{
        margin-top:10px;
    }
  }
  .clear-products{
    background-color:red;
    color:white;
    padding:0.5rem 1rem;
    border-radius:5px;
    border:none;
  }
  @media (max-width:992px){
    display:grid;
    grid-template-columns:1fr 1fr;
    .categories{
        margin-top:0rem;
      }
  }
  @media (max-width:576px){
    display:grid;
    grid-template-columns:1fr ;
  }
`;
const Filters = () => {
  const {
    updateSort,
    sortValue,
    updateFilter,
    clearFilters,
    allProducts,
    filters: {
      searchText,
      category,
      company,
      shipping,
      min_price,
      max_price,
      price,
    },
  } = useContext(FilterContext);

  let categories = getUnique(allProducts, "category");
  let companies = getUnique(allProducts, "company");


  return (
    <Wrapper>
      <div className="left">
        <input
          className="input"
          onChange={updateFilter}
          type="text"
          value={searchText}
          placeholder="search here"
          name="searchText"
        />
        <div className="sort">
          <h5>Sort By</h5>
          <select value={sortValue} onChange={updateSort}>
            <option value="ascending">Price(Low to High)</option>
            <option value="descending">Price( High to Low)</option>
            <option value="latest">latest </option>
          </select>
        </div>
        <div className="company-list">
          <h5>Companies</h5>

          <select onChange={updateFilter} name="company" value={company}>
            {companies.map((item, index) => (
              <option
                key={index}
                onClick={updateFilter}
                name="category"
                className={company === item ? "active" : ""}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div> 
        <h5>price</h5>

        <p className="price">{formatPrice(price)}</p>
        <input
          type="range"
          name="price"
          min={min_price}
          max={max_price}
          onChange={updateFilter}
          value={price}
        />
      </div>
      </div>
      <div className="right">
        <div className="categories">
          <h5>Categories</h5>
          <div className="categori-list">
            {categories.map((item, index) => (
              <button
                key={index}
                onClick={updateFilter}
                name="category"
                className={category === item ? "active" : ""}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
    
        <div className="free-shipping">
          <p>Free-shipping </p>
          <input
          checked={shipping}
            
            name="shipping"
            onChange={updateFilter}
            type="checkbox"
          />
        </div>
        <button className="clear-products" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </Wrapper>
  );
};

export default Filters;
