import { Suspense } from "react";
import { shops } from "./component/shopitem";
import Loading from "./component/loading";
import Shoplist from "./component/shoplist";

export default function Firstpage() {
    return (
        <>
        <div className="max-w-3xl mx-auto my-6 justify-center">
            <h1 className="text-2xl font-bold text-center">
                Shop list
            </h1>
        
        <Suspense fallback={<Loading />}>
            <Shoplist data={shops} />
        </Suspense>


        </div>
        </>
    );
}