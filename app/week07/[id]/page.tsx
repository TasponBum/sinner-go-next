import Link from "next/link";
import { shops } from "../component/shopitem";
import Loading from "../component/loading";
import { Suspense } from "react";

export default async function Shopdetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = shops.find((item) => item.id === Number(id));

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center">
          Shop Detail
        </h1>

        <div className="border rounded-lg p-4 m-4">
          <p className="mt-4 font-semibold">
            ID : {item?.id}
          </p>
          <p className="my-4">
            Title : {item?.title}
          </p>
          <p className="my-4">
            Open status : {item?.openstatus ? "Open" : "Closed"}
          </p>
        </div>

        <Link
          href="/week07"
          className="inline-block bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>
    </Suspense>
  );
}