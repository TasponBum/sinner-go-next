"use cilnet"
import Link from "next/link";
import { shops } from "../component/shopitem";
import Loading from "../component/loading";
import { Suspense } from "react";
import { useState, useEffect } from "react";

export default async function Shopdetail( {params} ) {
   const { id } = await params;
   
   const [shop, setShop] = useState({});

   useEffect(()=>{
    const fetchData = async () => {
      try {
        const resData = await fetch(`http://localhost:8000/${id}`)
        if(resData.ok){
            const resShop = await resData.json()
              setShop(resShop);
          }else{
            throw new Error(`Network respond was not ok`);
          }

      }catch(error){
        console.log(`Error fetching data : ${error}`);
      }
    }
    fetchData();
   },[shop]);
    



    return (
        <Suspense fallback={<Loading />}>
        <div className="w-xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold text-center">
        Shop Detail
      </h1>

      <div
        key={shops.shopID}
        className="border rounded-lg p-4 m-4">
        
        <p className="mt-4 font-semibold">
          ID : {shops.shopID}
        </p>
        <p className="my-4">
          Title : {shops.shopName}
        </p>
        <p className="my-4">
          openstatus : {shops.shopStatus}
        </p>
      </div>

      <Link
        href="/week07"
        className="bg-gray-600 text-white px-4 py-2 rounded"> Back </Link>
    </div>
    </Suspense>
    );
    
}