
import Link from "next/link";
import { shops } from "../component/shopitem";
import Loading from "../component/loading";
import { Suspense } from "react";
//import { useState,useEffect } from "react";


export default async function ShopDetail({params}) {
    const {id} = await params;
/*
    const shop = shops.find(
        item => item.id === Number(id)
    );
*/

  //const [shop,setshop] = useState({});
/*
  useEffect(()=>{
    const fetchData = async() => {
      try {
        const resData = await  fetch(`http://localhost:8000/${id}`);
        if(resData.ok){
          const resShop = await resData.json();
          setshop(resShop);
        }else{
          throw new Error(`Network response was not ok`);
        }
      }catch(error){
        console.log(`Error fetching data: ${error}`);
      }
    }
    fetchData();
  },[shop]);
*/

    let shop ={};
      try {
        const resData = await  fetch(`http://localhost:8000/api/shops/${id}`);

        if(!resData.ok){
          throw new Error(`Network response was not ok`);
        }
        shop = await resData.json();

        console.log(shop);
      }catch(error){
        console.log(`Error fetching data: ${error}`);
      }



    const Status = (sta: boolean) => {
        if (sta)
          return <span style={{ color: "green" }}>open</span>
          return <span style={{ color: "red" }}>close</span>;
    };


    return(
        <>
        <Suspense fallback={<Loading/>}>
        <div className="w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold">
        Shop Detail
      </h1>

      <div
        key={shop.ShopID}
        className="border rounded-lg p-4 m-4"
      >
        <p className="mt-4 font-semibold">
          ID:{shop.ShopID}
        </p>
        <p className="my-4">
          Title:{shop.shopName}
        </p>
        <p className="my-4">
          Type:{shop.shopType}
        </p>
        <p className="my-4">
        Loc: lat: {shop.shopLo?.lat} long: {shop.shopLo?.long}
        </p>
        <p className="my-4">
          Open Status:{Status(shop.shopStatus)}
        </p>
      </div>

      <Link
        href="/week07/"
        className="bg-gray-600 text-white px-4 py-2 rounded"
      >Back</Link>

    </div>
        </Suspense>
        </>
    );
}