import "./Details.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { refreshContext } from "../../context/Context";
import Nav from "../../components/Nav/Nav";

const Details = () => {
  const { refresh, setRefresh } = useContext(refreshContext);
  const [singleStuff, setSingleStuff] = useState({});
  const [editTitle, setEditTitle] = useState(singleStuff.title);
  const [editContent, setEditContent] = useState(singleStuff.content);
  const [titleBox, setTitleBox] = useState(false);
  const [contentBox, setContentBox] = useState(false);

  const { id, category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/${category}/${id}`);
        setSingleStuff(data);
      } catch (error) {
        console.log("fetchSingleData: ", error);
      }
    };
    if (category) {
      fetchData();
    }
  }, [category, id, refresh]);

  const handleEditTitle = async () => {
    setTitleBox(true);
    try {
      const newEdit = {
        title: editTitle,
      };
      const { data } = await axios.put(`/api/${category}/${id}`, newEdit);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("handleEdit: ", error);
    }
  };

  const handleContent = async () => {
    setContentBox(true);
    try {
      const newEdit = {
        content: editContent,
      };
      const { data } = await axios.put(`/api/${category}/${id}`, newEdit);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("handleEdit: ", error);
    }
  };

  return (
    <>
      <Nav />
      <main className="detail-page">
        {singleStuff ? (
          <>
            <div className="detail-box">
              <img src={singleStuff.image?.url} alt={singleStuff?.title} />
              <div className="details-content">
                {/* TITLE */}
                <div className="wrapper">
                  <h2>{singleStuff.title}</h2>
                  <div>
                    <button onClick={() => handleEditTitle()}>
                      {titleBox ? "Submit" : "Edit"}
                    </button>
                    <button
                      onClick={() => setTitleBox(false)}
                      className={
                        titleBox ? "closebtn-active" : "closebtn-nonactive"
                      }
                    >
                      Close
                    </button>
                    <input
                      className={
                        titleBox ? "editbox-isactive" : "editbox-nonactive"
                      }
                      type="text"
                      placeholder="NEW CONTENT"
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </div>
                </div>
                {/* ROOM */}
                <h3>{singleStuff.room}</h3>
                {/* CONTENT */}
                <div className="wrapper">
                  <p>{singleStuff.content}</p>
                  <div>
                    <button onClick={() => handleContent()}>
                      {contentBox ? "Submit" : "Edit"}
                    </button>
                    <button
                      onClick={() => setContentBox(false)}
                      className={
                        contentBox ? "closebtn-active" : "closebtn-nonactive"
                      }
                    >
                      Close
                    </button>
                    <input
                      className={
                        contentBox ? "editbox-isactive" : "editbox-nonactive"
                      }
                      type="text"
                      placeholder="NEW CONTENT"
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </>
  );
};

export default Details;
