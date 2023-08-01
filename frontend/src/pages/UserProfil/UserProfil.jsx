import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import axios from "axios";
import User from "../../components/User/User";

const UserProfil = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/user");
      setUserData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <section>
          {userData?.map((user, index) => {
            return <User key={index} user={user} />;
          })}
        </section>
      </main>
    </>
  );
};

export default UserProfil;
