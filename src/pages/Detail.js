// import Background from "../image/Player.png";
// import Background2 from "../image/Player2.png";
import LeftSide from "../image/Movie.png";
import RightSide from "../image/Films.png";
import Yeary from "../image/Grp.png";
import ReactPlayer from "react-player";
function DetailFilm() {
  //   const  Background = [{Background1},{Background2}]
  return (
    <div className="black">
      {/* <Navbar /> */}
      <div className="thewitch">
        <div></div>
      </div>

      {/* <img  src={Background} alt="Background" /> */}
      <div className="background">
        <ReactPlayer url={"https://www.youtube.com/watch?v=0_Kq3IQQMNA"} />
      </div>
      <div className="bottom">
        <div className="pad">
          <div className="bottomm">
            <div>
              <img className="left" src={LeftSide} alt="Background" />
              <div className="absol">
                <img className="lefts" src={Yeary} alt="Background" />
              </div>
            </div>
            <div className="rights">
              <img src={RightSide} alt="Background" />
              <i class="fa fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailFilm;
