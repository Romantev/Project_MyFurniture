import "./BigStuff.css";
import { loadingContext, refreshContext } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav/Nav";
import AddButton from "../../components/AddButton/AddButton";
import AddNewItem from "../../components/AddNewItem/AddNewItem";
import DetailCard from "../../components/DetailCard/DetailCard";

const BigStuff = () => {
  const { refresh, setRefresh } = useContext(refreshContext);
  const { loading, setLoading } = useContext(loadingContext);
  const [formIsActive, setFormIsActive] = useState(false);
  const [stuff, setStuff] = useState([]);
  const [searchForTitle, setSearchForTitle] = useState("");
  const [searchForRoom, setSearchForRoom] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/stuff`);
        const bigStuff = data?.filter((stuff) => stuff.category === "Bigstuff");
        setStuff(bigStuff);
      } catch (error) {
        console.log("fetchData: ", error);
      }
    };
    fetchData();
  }, [loading, refresh]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/stuff?titleSearch=${searchForTitle}`
        );
        setStuff(data);
      } catch (error) {
        console.log("fetchData: ", error);
      }
    };
    fetchData();
  }, [searchForTitle]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/stuff?searchRoom=${searchForRoom}`
        );
        setStuff(data);
      } catch (error) {
        console.log("fetchData: ", error);
      }
    };
    fetchData();
  }, [searchForRoom]);

  return (
    <>
      <Nav />
      {/* search for title */}
      <input
        onChange={(e) => setSearchForTitle(e.target.value)}
        type="text"
        placeholder="Search for Title"
      />
      {/* search for room */}
      <input
        onChange={(e) => setSearchForRoom(e.target.value)}
        type="text"
        placeholder="Search for Room"
      />
      <main className="pages">
        <AddButton setFormIsActive={setFormIsActive} />
        <AddNewItem
          formIsActive={formIsActive}
          setFormIsActive={setFormIsActive}
          category={"bigstuff"}
        />
        {loading ? (
          <div className="loadingwindow">
            <h1>Loading...</h1>
          </div>
        ) : (
          stuff?.map((elm, index) => {
            return <DetailCard elm={elm} key={index} />;
          })
        )}
      </main>
    </>
  );
};

export default BigStuff;
