"use client";

import { useState } from "react";
import { herbs } from "../herbs";

export default function HerbHome( ) 
{
  // ข้อมูลส่วนตัวของผู้สอบ
  const name = "Taspon Bumrungsin";
  const major = "เทคโนโลยีสารสนเทศ IT";
  const ID = "026840491002-1";

  // State เก็บรายการสมุนไพร
  const [herbList, setHerbList] = useState(herbs);

  // State ของฟอร์ม
  const [herbsname, setHerbsname] = useState("");
  const [detail, setDetail] = useState("");
  const [type, setType] = useState("");
  const [supplier, setSupplier] = useState("");

  // ฟังก์ชันเพิ่มข้อมูล
  const handleSubmit = (e : any) => {
    e.preventDefault();
    if (!herbsname) return;

    const newHerb = {
      id: herbList.length + 1,
      herbsname: herbsname,
      detail: detail,
      type: type,
      supplier: supplier,
    };

    setHerbList([...herbList, newHerb]);
    
  };


  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-5 text-center">ระบบจัดการข้อมูลสมุนไพร</h1>

      {/* ฟอร์มกรอกข้อมูล */}
      <form onSubmit={handleSubmit} className="bg-white p-4 border rounded mb-6 space-y-3 shadow-sm">
        <h2 className="font-semibold text-lg">เพิ่มข้อมูลสมุนไพร</h2>
        <div>
          <label className="block text-sm">ชื่อสมุนไพร:</label>
          <input
            type="text"
            value={herbsname}
            onChange={(e) => setHerbsname(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="กรอกชื่อสมุนไพร"
          />
        </div>
        
        
        <div>
          <label className="block text-sm">รายละเอียด:</label>
          <input
            type="text"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="กรอกรายละเอียด"
            />
        
        
        </div>
        <div>
          <label className="block text-sm">ประเภทสมุนไพร:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="กรอกประเภท"
            />
        </div>
        <div>
          <label className="block text-sm">ผู้จัดจำหน่าย:</label>
          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="รายละเอียดคนจัดจำหน่าย" 
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer ">
          บันทึกข้อมูล
        </button>
      </form>

      {/* แสดงรายการสมุนไพร */}
      
        <div className="mb-8">
        <h2 className="font-semibold text-lg mb-3"> รายการสมุนไพร ({herbList.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {herbList.map((item, index) => (
            <div key={index} className="border p-4 rounded bg-white shadow-sm">
              <p><b>รหัส:</b> {item.id}</p>
              <p><b>ชื่อสมุนไพร:</b> {item.herbsname}</p>
              <p><b>รายละเอียด:</b> {item.detail}</p>
              <p><b>ประเภท:</b> {item.type}</p>
              <p><b>ผู้จัดจำหน่าย:</b> {item.supplier}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer แสดงข้อมูลส่วนตัวผู้สอบ */}
      <footer className="border-t pt-4 text-center text-sm text-gray-700 bg-gray-200 p-5 ">
        <p><b>ชื่อ-นามสกุล:</b> {name}</p>
        <p><b>สาขาวิชา:</b> {major}</p>
        <p><b>รหัสนักศึกษา:</b> {ID}</p>
      </footer>
    </div>
  );
}