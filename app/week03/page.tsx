import { toDolist } from "../data/toDolist";
export default function Todolist()
{
    
    let name = "Taspon Bumrungsin"
    const major = "เทคโนโลยีสารสนเทศ IT";
    let classYear = "4";
    let classSec = "ทส.ต.";
    let active = true;

    const isActive =(act: Boolean) =>{
        if(act)
        return <span style={{color: "green"}}>กำลังศึกษา</span>;
        return <span style={{color: "red"}}>พ้นสภาพ</span>;
    }
    
    
    console.log(`Name: ${name}`);
    console.log(`Major: ${major}`);

    const tmpTdl =toDolist.map((item,index)=>
      <>
      <div 
    key={index} 
    className="flex items-start gap-4 p-5 mb-2 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
  >
    
    {/* คอนเทนเนอร์หลัก (จัดเรียงบนลงล่าง) */}
    <div className="max-w-3xl bg-gradient-to-br from-gray-800 to-slate-800 border border-gray-200 rounded-xl p-6 shadow-lg mb-8">
      
      {/* ส่วนเนื้อหาด้านบน */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-100 border-b border-gray-700 pb-2 mb-3">
          หัวข้อ {item.title}
        </h2>
        <h2 className="text-lg font-bold text-gray-100 border-b border-gray-700 pb-2 mb-3">
          คำอธิบาย {item.description}
        </h2>
        <h2 className="text-lg font-bold text-gray-100 border-b border-gray-700 pb-2">
          อาจารย์ผู้สอน {item.author}
        </h2>
      </div>

      {/* ส่วนกล่องสีขาว (จัดให้อยู่ซ้ายล่าง) */}
      <div className="flex justify-start mt-2">
        <div className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-sm inline-block">
          เวลา {item.date_time}
        </div>
      </div>

    </div>
  </div>
      </>
    
    );
      

    
    return (
      <>
      <div className="w-full max-w-xl mx-auto mt-10 p-10 border-2 border-gray-200 rounded-xl shadow-lg bg-gradient-to-r from-black to-gray-600 transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <h1 className="text-xl font-bold text-white mb-4 border-b pb-2">
        To do list
      </h1>
      
      <div className="text-gray-200 space-y-2">
        <p><span className="font-semibold">ชื่อ-นามสกุล:</span> {name}</p>
        <p><span className="font-semibold">สาขาวิชา:</span> {major}</p>
        <p><span className="font-semibold">กลุ่มเรียน/ชั้นปี:</span> {classSec} ปี {classYear}</p>
        <p><span className="font-semibold">สถานะภาพนักศึกษา:</span> {isActive(active)}</p>
      </div>
    </div>

      <div className="flex flex-wrap justify-center gap-12 mt-16">
        {tmpTdl}
      </div>

</>


);
}