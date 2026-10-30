
"use client";

export default function MyHomePage() {
  // ข้อมูลส่วนตัวของนักศึกษา
  const name = "Taspon Bumrungsin";
  const major = "เทคโนโลยีสารสนเทศ IT";
  const ID = "026840491002-1";
  const email = "ใส่อีเมลของคุณ";
  const phone = "ใส่เบอร์โทรศัพท์ของคุณ";

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-6">
        หน้าแรก
      </h1>

      <div className="bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-5 text-center">
          ข้อมูลส่วนตัวนักศึกษา
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
            <p className="font-medium">{name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">รหัสนักศึกษา</p>
            <p className="font-medium">{ID}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">สาขาวิชา</p>
            <p className="font-medium">{major}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
