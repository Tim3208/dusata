import MainLayOut from "../../layout/MainLayOut";
import { useState } from "react";

const MainPage = () => {
  return (
    <MainLayOut>
      <div className="p-6 bg-blue-600 text-white rounded-md">
        Tailwind가 제대로 동작하면 이 박스가 스타일 적용되어 보입니다.
      </div>
    </MainLayOut>
  );
};

export default MainPage;
