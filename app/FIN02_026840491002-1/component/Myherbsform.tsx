
"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function MyHerbForm() {
  const [herbsname, setHerbsname] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [property, setProperty] = useState("");
  const [usage, setUsage] = useState("ใช้ภายใน");
  const [type, setType] = useState("ยาใช้ภายใน");
  const [supplier, setSupplier] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "herbs"), {
        herbsname,
        imageUrl,
        detail,
        property,
        usage,
        type,
        supplier,
        contact,
        createdAt: serverTimestamp(),
      });

      console.log("บันทึกสำเร็จ Document ID:", docRef.id);
      alert("บันทึกข้อมูลลง Firebase เรียบร้อยแล้ว!");

      setHerbsname("");
      setImageUrl("");
      setDetail("");
      setProperty("");
      setUsage("ใช้ภายใน");
      setType("ยาใช้ภายใน");
      setSupplier("");
      setContact("");
    } catch (error: any) {
      console.error("Error adding document: ", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + (error?.message || error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        เพิ่มข้อมูลยาสมุนไพร
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border rounded-xl shadow-sm p-8 space-y-6"
      >

        {/* ชื่อสมุนไพร */}
        <div>
          <label className="block text-base font-medium mb-2">
            ชื่อสมุนไพร *
          </label>
          <input
            type="text"
            value={herbsname}
            onChange={(e) => setHerbsname(e.target.value)}
            className="w-full border p-3 rounded-lg text-base"
            placeholder="กรอกชื่อสมุนไพร"
            required
          />
        </div>

        {/* รูปภาพ */}
        <div>
          <label className="block text-base font-medium mb-2">
            URL รูปภาพ
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border p-3 rounded-lg text-base"
            placeholder="กรอก URL รูปภาพ"
          />
        </div>

        {/* รายละเอียด */}
        <div>
          <label className="block text-base font-medium mb-2">
            รายละเอียด
          </label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className="w-full border p-3 rounded-lg text-base"
            placeholder="กรอกรายละเอียดสมุนไพร"
            rows={5}
          />
        </div>

        {/* สรรพคุณ */}
        <div>
          <label className="block text-base font-medium mb-2">
            สรรพคุณ *
          </label>
          <textarea
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            className="w-full border p-3 rounded-lg text-base"
            placeholder="กรอกสรรพคุณของสมุนไพร"
            rows={5}
            required
          />
        </div>

        {/* การนำไปใช้ Radio */}
        <div>
          <label className="block text-base font-medium mb-3">
            การนำไปใช้ *
          </label>
          <div className="flex gap-8 text-base">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="usage"
                value="ใช้ภายใน"
                checked={usage === "ใช้ภายใน"}
                onChange={(e) => setUsage(e.target.value)}
              />
              ใช้ภายใน
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="usage"
                value="ใช้ภายนอก"
                checked={usage === "ใช้ภายนอก"}
                onChange={(e) => setUsage(e.target.value)}
              />
              ใช้ภายนอก
            </label>
          </div>
        </div>

        {/* ประเภทสมุนไพร Select */}
        <div>
          <label className="block text-base font-medium mb-2">
            ประเภทสมุนไพร *
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border p-3 rounded-lg text-base"
          >
            <option value="ยาใช้ภายใน">ทั่วไป</option>
            <option value="ยาใช้ภายนอก">ใจสั่งมา</option>
          </select>
        </div>

        {/* ผู้ผลิต */}
        <div>
          <label className="block text-base font-medium mb-2">
            ชื่อผู้ผลิต *
          </label>
          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full border p-3 rounded-lg text-base"
            placeholder="กรอกชื่อผู้ผลิต"
            required
          />
        </div>

        {/* ปุ่มบันทึก */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-4 rounded-lg text-lg hover:bg-green-700 transition cursor-pointer disabled:bg-gray-400"
        >
          {loading ? "กำลังบันทึกข้อมูล..." : "บันทึกข้อมูล"}
        </button>

      </form>
    </div>
  );
}
