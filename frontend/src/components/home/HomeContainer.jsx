'use client'

import Image from "next/image";
import React, { useState } from "react";
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";


import { w3cwebsocket as W3CWebSocket } from "websocket";


const HomeContainer = () => {

  const [products, setProducts] = useState([])

  const [newMessage, setNewMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState("");


  const handleFilter = (filter) => {
    setFilterBy(filter);

    // filter the products

    if(filter === "price") {
      const filteredProducts = products.sort((a, b) => a?.price - b?.price);
      setProducts(filteredProducts);
    }

    if(filter === "name") {
      const filteredProducts = products.sort((a, b) => a?.title?.localeCompare(b?.title));
      setProducts(filteredProducts);
    }
  }

    // const filteredProducts = products.filter((product) => product?.title?.toLowerCase().includes(filter.toLowerCase()));

    // setProducts(filteredProducts);
  // };


  const handleMessages = (message) => {
    setNewMessage(message)
  }

  const handleProducts = (products =[]) => {
    // fetch products from the server
    setProducts(products)
  }


  const socket = new W3CWebSocket("ws://127.0.0.1:8000/ws/search/");

  socket.onopen = () => {
    console.log("WebSocket connected");
    // You may send an initial message here if required
    // socket.send(JSON.stringify({ query: "Initial message" }));
  };

  socket.onmessage = (message) => {
    // console.log("Received message:", JSON.parse(message.data));

    setLoading(true)
 

    if(JSON.parse(message.data)?.type === "data") {
      console.log("search result");
      // setData([...data, ...JSON.parse(message.data)?.items || []]);
      handleProducts(JSON.parse(message.data)?.items || []);
    }

    if(JSON.parse(message.data)?.type !== "data") {
      setLoading(false)
    }

    // setMessages([...messages, message.data]);
    // Handle incoming messages from the server
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
    setLoading(false)
    // Handle WebSocket errors
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
    setLoading(false)
    // Handle WebSocket closure
  };
// }, []);

// const sendMessage = () => {
//   console.log("sending message");
//   socket.send(JSON.stringify({ query: 'apple m1'}));
//   // socket.send(JSON.stringify({ query: newMessage }));
// };


const sendMessage = () => {
  if (socket && socket.readyState === socket.OPEN) {
    console.log("sending message");
    socket.send(JSON.stringify({ query: newMessage }));
    setLoading(true)
    setProducts([])
  } else {
    console.error("WebSocket not connected");
  }
};

  return (
    <div className="container mx-auto px-5 my-5 ">
      {/* add a search and filer and sorting */}
      <HomeSearchAndFilter handleFilter={handleFilter} filterBy={filterBy} sendMessage={sendMessage} search={newMessage} handleSearch={handleMessages} />
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <ProductCard key={index} />
        ))} */}

{
  loading && Array(10).fill(0).map((_, index) => (
    <LoadingSkeleton key={index} />
  ))
}


{
  products.length > 0 && products.map((product, index) => (
    <ProductCard key={index} product={product} />
  ))
}


{
  products.length === 0 && !loading && <p>No products found</p>
}


      </div>

      {/* socket */}

      {/* <Socket message={newMessage} handleSearch={handleMessages} handleProducts={handleProducts} /> */}
    </div>
  );
};

export default HomeContainer;

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white hover:shadow-xl duration-200 shadow-lg rounded-lg overflow-hidden cursor-pointer">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          // src={"https://i.ebayimg.com/images/g/q1gAAOSw0zhiiMXU/s-l1600.jpg"}
          src={product?.image}
          className="hover:scale-125 object-cover object-bottom transition-transform duration-300 ease-in-out"
          alt={product?.title}
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-md mb-2">
          {product?.title}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">  {product?.price} </span>
        </div>
      </div>
    </div>
  );
};

const HomeSearchAndFilter = ({search, handleSearch, sendMessage, handleFilter, filterBy}) => {



  console.log('filterBy', filterBy  )


  return (
    <div className="flex justify-between items-center mb-5">
      <div>
        <h1 className="text-2xl font-semibold">All Products</h1>
      </div>

      <div>
      <div className="my-5">
      <div className="flex gap-1">
        <Input
        
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <Button onClick={sendMessage}>Send</Button>
      </div>

   
    </div>
      </div>
      {/* <div>
        <Select onValueChange={(e)=> handleFilter(e.target.values) } >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent >
            <SelectGroup   >
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem onClick={()=> console.log('hello ') } value="price">Price</SelectItem>
              <SelectItem onClick={()=> handleFilter('name')} value="name">Name</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>


      </div> */}
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


const LoadingSkeleton = () => {
  return (
    <div className="bg-white duration-200 shadow-lg rounded-lg overflow-hidden">
      <div className="h-44 w-full bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 w-1/2 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 w-1/3 animate-pulse"></div>
      </div>
    </div>
  );
};