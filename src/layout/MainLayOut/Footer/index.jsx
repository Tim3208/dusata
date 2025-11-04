import { useNavigate } from "react-router-dom";

const MainLayOutFooter = () => {
  const nav = useNavigate();
  return (
    <footer className="w-full bg-navy text-gray-5 py-6 sm:py-10">
      {/* 중앙 */}
      <div className="w-[90vw] sm:w-[75vw] max-w-[1440px] mx-auto">
        {/* 상단 */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-0">
          {/* 사이트정보 */}
          <div className="w-full sm:w-1/2 leading-6 text-center sm:text-left">
            {/* title */}
            <h2 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-white pb-2 mb-2.5">
              두사타
            </h2>
            {/* 설명 */}
            <p>
              삼육대학교 학생들을 위한 <br />
              전용 소개팅 웹사이트
            </p>
          </div>

          {/* 목록 */}
          <nav className="flex justify-between w-full sm:gap-0">
            <ul className="text-center sm:text-right">
              <li className="pb-3 text-white font-bold text-base sm:text-lg">
                서비스
              </li>
              <li
                className="pb-2 cursor-pointer transition-colors hover:text-white text-sm sm:text-base"
                onClick={() => nav("/map")}
              >
                포스트잇 작성
              </li>
              <li
                className="pb-2 cursor-pointer transition-colors hover:text-white text-sm sm:text-base"
                onClick={() => nav("/register")}
              >
                알림함
              </li>
              <li
                className="pb-2 cursor-pointer transition-colors hover:text-white text-sm sm:text-base"
                onClick={() => nav("/report")}
              >
                마이페이지
              </li>
            </ul>
            <ul className="flex-[0.25] text-center sm:text-right">
              <li className="pb-3 text-white font-bold text-base sm:text-lg">
                고객지원
              </li>
              <li
                className="pb-2 cursor-pointer transition-colors hover:text-white text-sm sm:text-base"
                onClick={() => nav("/faq")}
              >
                FAQ
              </li>
              <li
                className="pb-2 cursor-pointer transition-colors hover:text-white text-sm sm:text-base"
                onClick={() => nav("/faq#qna")}
              >
                Q&A
              </li>
            </ul>
            <ul className="flex-[0.25] text-center sm:text-right">
              <li className="pb-3 text-white font-bold text-base sm:text-lg">
                Front
              </li>
              <a href="#" className="text-gray-5 hover:text-white">
                <li className="pb-2 cursor-pointer transition-colors text-sm sm:text-base">
                  김규림
                </li>
              </a>
              <a href="#" className="text-[var(--gray-5)] hover:text-white">
                <li className="pb-2 cursor-pointer transition-colors text-sm sm:text-base">
                  김태현
                </li>
              </a>
              <a
                href="https://github.com/Tim3208"
                className="text-[var(--gray-5)] hover:text-white"
              >
                <li className="pb-2 cursor-pointer transition-colors text-sm sm:text-base">
                  박정우
                </li>
              </a>
              <a href="#" className="text-[var(--gray-5)] hover:text-white">
                <li className="pb-2 cursor-pointer transition-colors text-sm sm:text-base">
                  오금서
                </li>
              </a>
            </ul>
            <ul className="flex-[0.25] text-center sm:text-right">
              <li className="pb-3 text-white font-bold">Back</li>
              <a href="#" className="text-[var(--gray-5)] hover:text-white">
                <li className="pb-2 cursor-pointer transition-colors text-sm sm:text-base">
                  구교승
                </li>
              </a>
              <a href="#" className="text-[var(--gray-5)] hover:text-white">
                <li className="pb-2 cursor-pointer transition-colors text-sm sm:text-base">
                  신가연
                </li>
              </a>
              <a href="#" className="text-[var(--gray-5)] hover:text-white">
                <li className="pb-2 cursor-pointer transition-colors text-sm sm:text-base">
                  이찬영
                </li>
              </a>
              <a href="#" className="text-[var(--gray-5)] hover:text-white">
                <li className="pb-2 cursor-pointer transition-colors text-sm sm:text-base">
                  정혜빈
                </li>
              </a>
            </ul>
          </nav>
        </div>
        {/* 하단 */}
        <div className="mt-8 h-[58px] border-t border-gray-6 flex justify-between items-center">
          <span>
            © 2025 두유는 사랑을 타고. All rights reserved.{" "}
            <a
              href="/terms"
              target="_blank"
              className="pl-4 text-gray-5 cursor-pointer"
            >
              이용약관
            </a>
            <a
              href="/privacy-policy"
              target="_blank"
              className="pl-4 text-[var(--gray-5)] cursor-pointer"
            >
              개인정보처리방침
            </a>
          </span>
          <a
            href="https://github.com/Tim3208/dusata"
            className="text-2xl text-[var(--gray-5)]"
          >
            {/* <FontAwesomeIcon icon={faGithub} /> */}
          </a>
        </div>
      </div>
    </footer>
  );
};
export default MainLayOutFooter;
