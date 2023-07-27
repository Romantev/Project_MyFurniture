import "./SmallStuff.css";
import { loadingContext, refreshContext } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav/Nav";
import AddButton from "../../components/AddButton/AddButton";
import AddNewItem from "../../components/AddNewItem/AddNewItem";
import DetailCard from "../../components/DetailCard/DetailCard";

const SmallStuff = () => {
  const [stuff, setStuff] = useState([]);
  const [formIsActive, setFormIsActive] = useState(false);
  const { loading, setLoading } = useContext(loadingContext);
  const { refresh, setRefresh } = useContext(refreshContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/smallstuff`);
        setStuff(data);
      } catch (error) {
        console.log("fetchData: ", error);
      }
    };
    fetchData();
  }, [refresh, loading]);

  return (
    <>
      <Nav />
      <main className="pages">
        <AddButton
          formIsActive={formIsActive}
          setFormIsActive={setFormIsActive}
        />
        <AddNewItem
          formIsActive={formIsActive}
          setFormIsActive={setFormIsActive}
          category={"smallstuff"}
        />
        {loading ? (
          <div className="loadingwindow">
            <h1>Loading...</h1>
          </div>
        ) : (
          stuff?.map((elm, index) => {
            return <DetailCard category={"smallstuff"} elm={elm} key={index} />;
          })
        )}
      </main>
    </>
  );
};

export default SmallStuff;
