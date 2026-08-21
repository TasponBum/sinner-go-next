"use client";
import { title } from "process";
import { dataitem, appenditem } from "../data/dataitem";
import Todofrom from "./component/Todofrom";
import { useState , useEffect } from "react";
import Modal from "./component/Modal";

export default function Todolist(){
    
    const toDolist = [...dataitem , ...appenditem]
    const [tasks, setTasks] = useState(toDolist);
    const [numofTasks, setNoft] = useState(tasks.length);
    const [status, setStatus] = useState<boolean | null>(null);
    const filteredTasks = 
    status == null? tasks
    :tasks.filter(
        (items) => items.status == status
    );
    
    const [open, setOpen] = useState(false);
    const [selectedTask, setselectedTask] = useState(null);
    
    const[editingTask, setEditingTask] = useState(null)
    const resetEditingtask = () => setEditingTask(null);
    
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
    
    const addTask = (title, status) => {
    const newTask = {
        id : tasks.length+1,
        title: title,
        description: "รายละเอียด บลาๆๆ++",
        date_time: "13/08/69",
        author: "Tester 01",
        status: status,
    };
    console.log("newTask.status =", newTask.status);

    setTasks([...tasks, newTask]);
    setNoft(tasks.length+1); 
}


    console.log(`Name: ${name}`);
    console.log(`Major: ${major}`);

      const onEdit = (t) => {
        //alert(`งานที่คุณต้องแก้${t}`);
        setEditingTask(t);
      }

      const updateTask = (id, title, status) => {
        setTasks(
          tasks => tasks.map(
            t => t.id === id?
            {
              ...t,
              title : title,
              status : status
          } :t
          ));
        setEditingTask(null);
        }


      const onDelete = (id) => {
       // alert(`คุณต้องการลบข้อมูล รหัสงาน$ {id}?`);
       const updateTasks = tasks.filter(
        item => item.id != id
      );
      setTasks(updateTasks);
    }
    
    const handleView = (tasks) => {
         setselectedTask(tasks);
         setOpen(true);
      } ;

      const tmpTdl =filteredTasks.map((item,index)=> {
      const {id, title, description, author, date_time, status} = item;
      
    return <div key={id} 
    className="flex items-start gap-4 p-5 mb-2 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ">
    
    {/* คอนเทนเนอร์หลัก (จัดเรียงบนลงล่าง) */}
    <div className="max-w-3xl bg-gradient-to-br from-gray-800 to-slate-800 border border-gray-200 rounded-xl p-6 shadow-lg mb-8">
      
      {/* ส่วนเนื้อหาด้านบน */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-100 border-b border-gray-700 pb-2 mb-3">
          หัวข้อ {title}
        </h2>
        <h2 className="text-lg font-bold text-gray-100 border-b border-gray-700 pb-2 mb-3">
          คำอธิบาย {description}
        </h2>
        <h2 className="text-lg font-bold text-gray-100 border-b border-gray-700 pb-2">
          อาจารย์ผู้สอน {author}
        </h2>
      </div>
      
      
      <div className="flex gap-2 mt-2">
    {/* View */}
      <button onClick={(e)=>handleView(item)} className="bg-yellow-500 text-white px-3 py-1 rounded ">View</button>
    {/* Edit */}
    <button onClick={(e)=>onEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded ">Edit</button>

    {/* Delete */}
    <button onClick={(e)=>onDelete(id)} className="bg-red-500 text-white px-3 py-1 rounded transition-all duration-200 hover:-translate-y-1 cursor-pointer">Delete</button>
</div>
    
      {/* ส่วนกล่องสีขาว (จัดให้อยู่ซ้ายล่าง) */}
      <div className="flex justify-start mt-2">
        <div className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-sm inline-block">
          เวลา {date_time}
        </div>
      </div>

    </div>
  </div>
      
    }
);
      
    return (
    
    <div
      className="min-h-screen bg-cover bg-center bg-fixed py-10 "
      style={{
      backgroundImage: "url('https://4kwallpapers.com/images/walls/thumbs_2t/26937.jpg')",
  }}
      
      >
      <div className="w-full max-w-xl mx-auto mt-10 p-10 border-2 border-gray-200 rounded-xl shadow-lg bg-gradient-to-r from-black to-gray-600 transition-all duration-300 hover:bg-gray-700  hover:-translate-y-1  ">
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



    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mt-10 sm:mt-14 px-5 ">
        
        <div className="text-white text-lg sm:text-xl font-bold bg-black/60 px-5 py-3 rounded-xl"> จำนวนงานที่ต้องทำ{" "}
        <span className="text-yellow-300">
            {tasks.length}
        </span>{" "}
        รายการ
        </div>
        
    <Todofrom
    addTask={addTask}
    editingTask={editingTask}
    updateTask={updateTask}
    reseteditingTask={resetEditingtask}
    />
      
        {/* <div>
            <button className="w-full sm:w-auto px-6 py-3 bg-black/60 hover:bg-gray-700 text-white font-bold rounded-xl transition-all duration-200 hover:-translate-y-1"
            onClick={addTask}>เพิ่มงาน</button>
        </div> */}
        
        <div className="flex gap-3">
            <button className="w-full sm:w-auto px-6 py-3  bg-black/60  text-white font-bold rounded-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer" onClick ={() => setStatus(null)}> All </button>
            <button className="w-full sm:w-auto px-6 py-3  bg-black/60  text-white font-bold rounded-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer" onClick={() => setStatus(true)}> Completed </button>
            <button className="w-full sm:w-auto px-6 py-3  bg-black/60  text-white font-bold rounded-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer"onClick={() => setStatus(false)}> Pending </button>


        </div>
    
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mt-10 sm:mt-16 px-4 w-full">
        {tmpTdl}
      </div>
          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
              setselectedTask(null);
            }
            }
            task={selectedTask}
          />

</div>

);
}