import "./AddNewItem.css";
import axios from "axios";
import { useContext } from "react";
import { refreshContext, loadingContext } from "../../context/Context";

const AddNewItem = ({ formIsActive, setFormIsActive, category }) => {
  const { refresh, setRefresh } = useContext(refreshContext);
  const { loading, setLoading } = useContext(loadingContext);

  const handleFormActive = () => {
    setFormIsActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormIsActive(false);
    handleLoading();
    const formData = new FormData(e.target);
    const res = await axios.post(`/api/${category}`, formData);
    e.target.reset();
    setRefresh((prev) => !prev);
  };

  const handleLoading = () => {
    if (loading === false) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <div className={formIsActive ? "formular-active" : "formular-nonactive"}>
      <button className="buttonClose" onClick={handleFormActive}>
        X
      </button>
      <form onSubmit={handleSubmit}>
        <h2>ADD NEW ITEM</h2>
        <input
          type="file"
          placeholder="image"
          name="image"
          className="input-img"
        />
        <select name="room" id="room">
          <option value="Living Room">Living Room</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Workroom">Workroom</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Bathroom">Bathroom</option>
        </select>
        <input type="text" placeholder="TITLE" name="title" />
        <input type="text" placeholder="CONTENT" name="content" />
        <button className="buttonPublish" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddNewItem;
