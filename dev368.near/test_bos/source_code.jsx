State.init({
  diem: 0,
  display: "none",
});
console.log(state.diem);
return (
  <div>
    <h1>Các bạn làm trắc nghiệm dưới đây</h1>
    <h4>(Mỗi câu 5 điểm)</h4>
    <div>
      <h3>Câu hỏi 1: Khi nào đã diễn ra cuộc cách mạng tháng 8 năm 1945?</h3>
      <input
        style={{
          display: "inline",
        }}
        onChange={() => {
          State.update({ diem: 5 });
        }}
        type="checkbox"
        id="v0"
      />
      <label for="v0"> 2/8/1945</label>
      <input
        style={{
          display: "inline",
        }}
        type="checkbox"
        id="v1"
      />
      <label for="v1"> 19/8/1945</label>
      <input
        style={{
          display: "inline",
        }}
        type="checkbox"
        id="v2"
      />

      <label for="v2">30/4/1975</label>
      <input
        style={{
          display: "inline",
        }}
        type="checkbox"
        id="v3"
      />
      <label for="v3"> 1/5/1954</label>
    </div>
    <div>
      <h3>Câu hỏi 2: Ai là người sáng lập ra Đảng Cộng Sản Việt Nam ?</h3>
      <input
        style={{
          display: "inline",
        }}
        onChange={() => {
          State.update({ diem: state.diem + 5 });
        }}
        type="checkbox"
        checked={checked}
        id="vehicle1"
      />
      <label for="vehicle1"> Hồ Chí Minh</label>
      <input
        style={{
          display: "inline",
        }}
        type="checkbox"
        id="vehicle1"
      />
      <label for="vehicle1">Võ Nguyên Giáp</label>
      <input
        style={{
          display: "inline",
        }}
        type="checkbox"
        id="vehicle2"
      />
      <label for="vehicle2">Trường Chinh</label>
      <input
        style={{
          display: "inline",
        }}
        type="checkbox"
        id="vehicle3"
      />
      <label for="vehicle3">Phạm Văn Đồng</label>
    </div>

    <button
      onClick={() => {
        State.update({ display: "block" });
      }}
    >
      Nộp
    </button>
    <div style={{ color: "red", height: 200 + "px", display: state.display }}>
      <h3>Kết Quả : Bạn đạt được {state.diem} điểm</h3>
    </div>
  </div>
);
