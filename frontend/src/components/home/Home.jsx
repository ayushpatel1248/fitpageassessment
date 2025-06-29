import React from "react";
import products from "../../assets/jsondata/product.json";
import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">
            Fitpage assessment this is product page
          </h2>
          {/* this is product code for every single product */}
          <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((ele, index) => {
              return (
                <Link to={`/product/${ele.id}`}>
                  <div class="group relative">
                    <img
                      src={ele.image}
                      alt="image"
                      class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                    <div class="mt-4 flex justify-between">
                      <div>
                        <h3 class="text-sm text-gray-700">
                          <a href="#">
                            <span
                              aria-hidden="true"
                              class="absolute inset-0"
                            ></span>
                            {ele.name}
                          </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">
                          {ele.description}
                        </p>
                      </div>
                      <p class="text-sm font-medium text-gray-900">
                        {ele.price}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
