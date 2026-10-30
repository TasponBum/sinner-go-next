
"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

type Herb = {
  id: string;
  herbsname: string;
  imageUrl?: string;
  detail?: string;
  property?: string;
  usage?: string;
  type?: string;
  supplier?: string;
  contact?: string;
};

export default function MyHerbList() {
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจาก Firestore
  const getHerbs = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "herbs")
      );

      const herbData = querySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      })) as Herb[];

      setHerbs(herbData);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      alert("ไม่สามารถโหลดข้อมูลสมุนไพรได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHerbs();
  }, []);

  // ลบข้อมูลจาก Firestore
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "คุณต้องการลบข้อมูลสมุนไพรนี้หรือไม่?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "herbs", id));

      setHerbs((currentHerbs) =>
        currentHerbs.filter((herb) => herb.id !== id)
      );

      alert("ลบข้อมูลเรียบร้อยแล้ว");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบ:", error);
      alert("ไม่สามารถลบข้อมูลได้");
    }
  };

  if (loading) {
    return <p className="p-6">กำลังโหลดข้อมูล...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold">
        รายการสมุนไพรทั้งหมด
      </h1>

      {herbs.length === 0 ? (
        <p>ยังไม่มีข้อมูลสมุนไพร</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {herbs.map((herb) => (
            <div
              key={herb.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              {herb.imageUrl && (
                <img
                  src={herb.imageUrl}
                  alt={herb.herbsname}
                  className="mb-4 h-40 w-full rounded-lg object-cover"
                />
              )}

              <h2 className="mb-3 text-xl font-bold">
                {herb.herbsname}
              </h2>

              <p>รายละเอียด: {herb.detail || "-"}</p>
              <p>สรรพคุณ: {herb.property || "-"}</p>
              <p>การนำไปใช้: {herb.usage || "-"}</p>
              <p>ประเภท: {herb.type || "-"}</p>
              <p>ผู้ผลิต: {herb.supplier || "-"}</p>
              <p>ข้อมูลติดต่อ: {herb.contact || "-"}</p>

              <button
                onClick={() => handleDelete(herb.id)}
                className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                ลบข้อมูล
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
