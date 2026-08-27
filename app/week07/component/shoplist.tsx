"use client";
import { useState } from "react";
import Link from "next/link";


export default function Shoplist({ data }) {
    const [keyword , setKeyword] = useState("");
    
    const filtershops = data.filter(
    (item) => {
        const searchText = keyword.toLowerCase();
        return item.title.toLowerCase().includes(searchText)
     } 
    );
    
    
    return(
        <div className="max-w-3xl mx-auto p-6">

       
        <div className="mb-6">
          <input
          type="text"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          placeholder="Search shop..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>


            <div className="mb-4 text-2xl text-white text-center">
                    Found {data.length} shop(s)
            </div>
            
            <div className="space-y-3.5">
                {
                    filtershops.map(shop =>(
                        <div key={shop.id} className="border rounded-1xl p-4">
                            <h2 className="font-semibold">
                                {shop.title}
                            </h2>
                            <p> Open status: {shop.openstatus} </p>
                            <Link
                                href={`/week07/${shop.id}`}
                                className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                            >
                            View deatil
                            </Link>
                        </div>
                    ))

                }
            </div>
        
        </div>
    );
}