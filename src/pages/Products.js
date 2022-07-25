import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import ProductsContext from "../context/productsContext";
import styled from "styled-components";
import ProductItem from "../components/ProductItem";
import PageHero from "../components/PageHero";
import Loading from "../components/Loading";
import Filters from "../components/Filters";
import FilterContext from "../context/filterContext";

const Wrapper = styled.main`
  .products-filters-container {
    display: flex;
    .filters-container {
      width: 400px;
    }
  }
  .products-container {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 1200px) {
    .products-container {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 992px) {
    .products-filters-container {
      display: flex;
      flex-direction: column;
      .filters-container {
        width: 100%;
      }
    }
    .products-container {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 570px) {
    .products-container {
      grid-template-columns: 1fr;
    }
  }
`;
const Products = () => {
  const { products, productsLoading } = useContext(ProductsContext);
  const { filterProducts } = useContext(FilterContext);
  const location = useLocation();

  console.log(filterProducts)
  if (productsLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <PageHero title="products" />

      <div className="products-filters-container section section-center page-100">
        <div className="filters-container">
          <Filters />
        </div>
        <div className="products-container ">
          {filterProducts && filterProducts.length>0 &&
            filterProducts.map((item, index) => (
              <ProductItem item={item} key={index} />
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Products;
