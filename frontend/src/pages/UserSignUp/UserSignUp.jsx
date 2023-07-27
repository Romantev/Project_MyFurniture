import "./UserSignUp.css";
import Nav from "../../components/Nav/Nav";
import axios from "axios";

const UserSignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await axios.post("/api/user", formData);
    console.log(res);
    e.target.reset();
  };

  return (
    <>
      <Nav />
      <main className="signup-body">
        <form className="user-formular" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" name="name" />
          <input type="email" placeholder="Email" name="email" />
          <input type="number" placeholder="Age" name="age" />
          <input type="text" placeholder="Country" name="country" />
          <input type="file" name="image" />
          <button type="submit">Sign Up</button>
        </form>
      </main>
    </>
  );
};

export default UserSignUp;
