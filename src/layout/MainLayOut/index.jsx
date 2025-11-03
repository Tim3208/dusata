import MainLayOutFooter from "./Footer";
// import MainLayOutHeader from "./Header";

const MainLayOut = ({ children }) => {
  return (
    <div>
      <>
        {/* <MainLayOutHeader /> */}
        <div>{children}</div>
        <MainLayOutFooter />
      </>
    </div>
  );
};
export default MainLayOut;
