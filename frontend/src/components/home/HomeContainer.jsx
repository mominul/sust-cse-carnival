import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Socket from "../shared/Socket";

const HomeContainer = () => {
  return (
    <div className="container mx-auto px-5 my-5 ">
      {/* add a search and filer and sorting */}
      <HomeSearchAndFilter />
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <ProductCard key={index} />
        ))}
      </div>

      {/* socket */}

      <Socket />
    </div>
  );
};

export default HomeContainer;

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white hover:shadow-xl duration-200 shadow-lg rounded-lg overflow-hidden cursor-pointer">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={"https://i.ebayimg.com/images/g/q1gAAOSw0zhiiMXU/s-l1600.jpg"}
          className="hover:scale-125 object-cover object-bottom transition-transform duration-300 ease-in-out"
          alt={product?.title}
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-md mb-2">Mechanical Keyboard</h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">$50</span>
        </div>
      </div>
    </div>
  );
};

const HomeSearchAndFilter = () => {
  return (
    <div className="flex justify-between items-center mb-5">
      <div>
        <h1 className="text-2xl font-semibold">All Products</h1>
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="apple">Price</SelectItem>
              <SelectItem value="banana">Name</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
