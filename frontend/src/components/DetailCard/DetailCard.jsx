import "./DetailCard.css";
import axios from "axios";
import { useContext } from "react";
import { refreshContext } from "../../context/Context";
import { Link } from "react-router-dom";

const DetailCard = ({ elm, category }) => {
  const { refresh, setRefresh } = useContext(refreshContext);

  const handleDelete = async (stuffId) => {
    try {
      const { data } = await axios.delete(`/api/stuff/${stuffId}`);
    } catch (error) {
      console.log("handleDelete: ", error);
    }
    setRefresh((prev) => !prev);
  };

  return (
    <div className="detailCard">
      <img src={elm.image?.url} alt={elm.title} />
      <div className="content">
        <h2>{elm.title}</h2>
        <h3>{elm.room}</h3>
        <p>{elm.content}</p>
      </div>
      <div className="buttons">
        <button onClick={() => handleDelete(elm._id)}>Delete</button>
        <Link to={`/${category}/${elm._id}`} className="delete-button">
          Details
        </Link>
      </div>
    </div>
  );
};

export default DetailCard;
