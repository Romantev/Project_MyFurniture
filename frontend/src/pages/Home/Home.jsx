import "./Home.css";
import Nav from "../../components/Nav/Nav.jsx";
import BigStuffImg from "../../assets/Img/big_stuff_img.jpeg";
import NSBSImg from "../../assets/Img/nsbs_stuff_img.jpeg";
import SmallStuffImg from "../../assets/Img/small_stuff_img.jpeg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <header>
        <Nav />
        <h1>MY FURNITURE</h1>
      </header>
      <main className="home">
        <div className="home-card">
          <Link to="/bigstuff">
            <img src={BigStuffImg} alt="" />
            <h3>BIG STUFF</h3>
          </Link>
        </div>
        <div className="home-card">
          <Link to="notsobigstuff">
            <img src={NSBSImg} alt="" />
            <h3>NOT SO BIG STUFF</h3>
          </Link>
        </div>
        <div className="home-card">
          <Link to="/smallstuff">
            <img src={SmallStuffImg} alt="" />
            <h3>SMALL STUFF</h3>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
