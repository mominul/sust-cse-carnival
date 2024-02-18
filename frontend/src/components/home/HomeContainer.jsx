'use client'

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
import noItem from '../../../public/noItem.jpg'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { toast } from "sonner"
import starTechLogo from '../../../public/starTechLogo.png'
import rayansLogo from '../../../public/rayansLogo.png'
import darazLogo from '../../../public/darazLogo.png'
import pickabooLogo from '../../../public/pickabooLogo.png'

import { w3cwebsocket as W3CWebSocket } from "websocket";
import Link from "next/link";


const socket = new W3CWebSocket("ws://127.0.0.1:8000/ws/search/");

const HomeContainer = () => {
  // const { toast } = useToast()

  const [products, setProducts] = useState([])

  const [newMessage, setNewMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState("");


  console.log('filterBy', filterBy)


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
    localStorage.removeItem('products')
    setNewMessage(message)
    
  }

  const handleProducts = (products =[]) => {
    // fetch products from the server
    setProducts(products)

    toast.info( `Showing ${products.length} products for ${newMessage}`)
  }


  // const socket = new W3CWebSocket("ws://127.0.0.1:8000/ws/search/");

  useEffect(()=>{
    // socket = new W3CWebSocket("ws://127.0.0.1:8000/ws/search/");

    //  console.log('socket', socket)


     socket.onopen = () => {
      console.log("WebSocket connected");
      // You may send an initial message here if required
      // socket.send(JSON.stringify({ query: "Initial message" }));
    };
  
    socket.onmessage = async (message) => {
      // console.log("Received message:", JSON.parse(message.data));
  
      setLoading(true)
  
      
  
        if(JSON.parse(message.data)?.type === "data") {
          // console.log("search result");
          // setData([...data, ...JSON.parse(message.data)?.items || []]);
  
          let newProducts = await JSON.parse(message.data)?.items 
  
          const oldProducts = JSON.parse(localStorage.getItem('products')) || []
  
          newProducts = [...oldProducts, ...newProducts]
  
          localStorage.setItem('products', JSON.stringify(newProducts))
  
          // console.log('newProducts', newProducts)
  
          handleProducts([
           ...JSON.parse(localStorage.getItem('products')),...newProducts
          ]);
        }
    
        if(JSON.parse(message.data)?.type !== "data") {
          setLoading(false)
        }
      
  
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

  },[newMessage])


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
    localStorage.removeItem('products')
    setLoading(true)
    setProducts([])
  } else {
    console.error("WebSocket not connected");
  }
};

// console.log('products', products)

  return (
    <div className="container mx-auto px-5 my-5 ">
      {/* add a search and filer and sorting */}
      <HomeSearchAndFilter loading={loading} handleFilter={handleFilter} filterBy={filterBy} sendMessage={sendMessage} search={newMessage} handleSearch={handleMessages} />
     
     



      {
  products.length === 0 && !newMessage && !loading && 

  <div className="w-full pt-5">
    <h1 className="w-full text-center text-xl">
      Search for a product
    </h1>
    <p className="text-sm text-center">
      we will find the best deals for you. 
    </p>
  </div>
}


      {
  products.length === 0 && newMessage && !loading && 

  <div className="w-full">
    <Image height={300} width={400} className="w-9/12 md:w-1/2 mx-auto" src={noItem
    } alt="no item" />
  </div>
}
     
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <ProductCard key={index} />
        ))} */}

{
  loading && Array(8).fill(0).map((_, index) => (
    <LoadingSkeleton key={index} />
  ))
}


{
  products.length > 0 && products.map((product, index) => (
   <Link target="_blank" href={product?.link} key={index}>

<ProductCard key={index} product={product} />
    </Link>
  ))
}





      </div>

      {/* socket */}

      {/* <Socket message={newMessage} handleSearch={handleMessages} handleProducts={handleProducts} /> */}
 

 <ChatPrompt/>
 
    </div>
  );
};

export default HomeContainer;

const ProductCard = ({ product }) => {
  return (
    <div  className="bg-white h-auto flex flex-col justify-between sm:h-[290px] md:h-[330px] lg:h-[320px] hover:shadow-xl duration-200 shadow-lg rounded-lg overflow-hidden cursor-pointer">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          // src={"https://i.ebayimg.com/images/g/q1gAAOSw0zhiiMXU/s-l1600.jpg"}
          src={product?.image}
          className="hover:scale-125 h-44 object-contain object-bottom transition-transform duration-300 ease-in-out  mx-auto object-bottom"
          alt={product?.title}
          objectFit="cover"
        />
      </div>
      <div className="p-4">

      <h3 className="font-semibold  text-base lg:text-md mb-2 sm:hidden">
          {
            product?.title
          }
        </h3>


         {/* if screen size more than small and less than medium */}

         <h3 className="font-semibold hidden hidden sm:block md:hidden text-base lg:text-md mb-2">
          {product?.title.length > 55 ? product?.title.slice(0, 55) + "..." : product?.title}
        </h3>

         {/* if screen size more than medium and less than large */}

         <h3 className="font-semibold hidden hidden md:block lg:hidden text-base lg:text-md mb-2">
          {product?.title.length > 60 ? product?.title.slice(0, 60) + "..." : product?.title}
        </h3>

        {/* if screen size more than large */}

        <h3 className="font-semibold hidden lg:block text-base lg:text-md mb-2">
          {product?.title.length > 65 ? product?.title.slice(0, 65) + "..." : product?.title}
        </h3>
        <div className="flex justify-between items-center pt-3">
          <span className="text-gray-800 ">  {product?.price} </span>
        


{
  product?.logo?.toLowerCase() == "startech.png" && <span className="text-gray-600">  <Image height={60} width={60} src={starTechLogo} alt="starTech" /> </span>
}

{
  product?.logo?.toLowerCase() == "ryans.png" && <span className="text-gray-600">  <Image height={60} width={60} src={rayansLogo} alt="starTech" /> </span>
}

{
  product?.logo?.toLowerCase() == "daraz.png" && <span className="text-gray-600">  <Image height={60} width={60} src={darazLogo} alt="starTech" /> </span>
}

{
  product?.logo?.toLowerCase() == "pickaboo.png" && <span className="text-gray-600">  <Image height={60} width={60} src={pickabooLogo} alt="starTech" /> </span>
}
          
        </div>
      </div>
    </div>
  );
};

const HomeSearchAndFilter = ({search, loading, handleSearch, sendMessage, handleFilter, filterBy}) => {



  // console.log('filterBy', filterBy  )


  return (
    <div className="block sm:flex justify-between items-center mb-5">
      <div>
        <h1 className=" text-center sm:text-start text-2xl font-semibold">All Products</h1>
      </div>

      <div className="flex gap-2">
      <div className="my-5">
      <form onSubmit={(e)=>{
        e.preventDefault()
        // console.log('submit')
        sendMessage()

      
      }}  className="flex gap-1">
        <Input
        
        placeholder="Search for a product"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

{/* <input
type="text"
        className="border border-gray-300 rounded-md px-1 h-10 w-60 focus:border-black focus:outline-none transition duration-200 ease-in-out"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      /> */}

        <Button disabled={loading} type='submit' onClick={sendMessage}>Send</Button>
        {/* <button type="submit" className="px-5 h-10 border rounded-lg" onClick={sendMessage}>Send</button> */}
    
    

        <div>
        <select value={filterBy} onChange={(e)=> handleFilter(e.target.value)} className="bg-inherit px-2 py-2">
          
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>
    
      </form>

  

   
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

const chatSocket = new W3CWebSocket("ws://127.0.0.1:8000/ws/chat/");


const ChatPrompt = () => {

  let socket = chatSocket

  const [isOpen, setIsOpen] = useState(false); // State to control the visibility of the chat prompt

  const [messages, setMessages] = useState([]); // State to store the messages
  const [newMessage, setNewMessage] = useState(""); // State to store the new message

  const [loading, setLoading] = useState(false);
  const [botClosed, setBotClosed] = useState(false);


  // const socket = new W3CWebSocket("ws://127.0.0.1:8000/ws/chat/");



  const handleChatOpen = () => {

    const products = JSON.parse(localStorage.getItem('products')) || []
    const productTitles = products.map((product) => product?.title)  || []

        // You may send an initial message here if required
    socket.send(JSON.stringify({ query: JSON.stringify(productTitles) , type: "info" }));


    setIsOpen(true); // Open the chat prompt when the button is clicked
    toast.info('Discuss about your product', {position: 'top-left'})
  };

  const handleCloseChat = () => { 
    setIsOpen(false); // Close the chat prompt
  
    setMessages([]); // Clear the messages


    socket.send(JSON.stringify({ query: JSON.stringify('') , type: "close" }));

    toast.success('Thanks for chatting with us', {position: 'top-left'})

    
  
  }




  socket.onopen = () => {
    console.log("WebSocket connected for chatbot");

   
  };

  socket.onmessage = (message) => {
    // console.log("Received message:", JSON.parse(message.data));

    setLoading(true)

    // setMessages([...messages, newMessage, JSON.parse(message.data)?.response]);
    setMessages([...messages, JSON.parse(message.data)?.response])
    setLoading(false)
    setNewMessage('')
    setBotClosed(false)

 
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
    setLoading(false)
    // Handle WebSocket errors
    setBotClosed(true)
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
    setLoading(false)
    setBotClosed(true)

    // toast.error('Chatbot closed')
    // handleCloseChat()
    // Handle WebSocket closure
  };
// }, []);



const sendMessage = () => {


  const products = JSON.parse(localStorage.getItem('products')) || []
  const productTitles = products.map((product) => product?.title)  || []


  // console.log('productTitles', productTitles)

  if (socket && socket.readyState === socket.OPEN) {
    // console.log("sending message");
   
    if(newMessage === '') {
      toast.error('Please type a message', {position: 'top-left'})
      
    }
    else {

      socket.send(JSON.stringify({ query: newMessage, type:'msg' }));
      setMessages([...messages, newMessage])
      setLoading(true)
      setBotClosed(false)}

    // setMessages([])
  } else {
    console.error("WebSocket not connected");
    setBotClosed(true)
  }
};

const chatBoxRef = useRef(null);

useEffect(() => {
  // Scroll to the bottom of the chat box when messages change
  if (chatBoxRef.current) {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }
}, [messages]);


// console.log('loading = ', loading)


  return (
    <div className="fixed bottom-5 right-5 ">
      {/* Button to open the chat prompt */}
  {
    !isOpen ? <Button onClick={handleChatOpen}>Open Chat</Button> : <Button className='w-full' onClick={handleCloseChat}>Close Chat</Button>
  }
      {/* Chat prompt */}
      {/* {isOpen && <ChatPrompt />} */
  }
      {isOpen && (
        <div className="z-50  bg-white shadow mt-1 border h-96 flex flex-col justify-end p-5 rounded-md">
          <div className="">
           
          <div className="chatBox w-72 overflow-y-scroll h-[300px] flex flex-col justify-end">
          

          <div ref={chatBoxRef} className="chatBox w-72 overflow-y-scroll h-[300px] ">
          
          {
            messages.map((m, index) => (
              <p key={index} className=" text-right text-sm mb-3 text-start">{m}</p>
            ))
          }

          {
            loading && <div className={` animate-pulse  bg-gray-200 h-8 w-full rounded-md mb-2`} />

          }
        </div>
          </div>
           

          <div >

          {
        botClosed && <p className="text-xs text-red-500">Chatbot closed - refresh the browser to chat again</p>
          }

            <form className="flex gap-1 mt-2" onSubmit={(e)=>{
              e.preventDefault()
              sendMessage()

            }}>



            <Input
            autoFocus
            disabled={ botClosed}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`${botClosed ? 'Chatbot closed' : 'Type your message'}`}
            />
            <Button 
            disabled={loading || botClosed}
            
            type='submit'>Send</Button>
            </form>
            </div>
          </div>

         
        </div>
      )}
    </div>
  );
};


