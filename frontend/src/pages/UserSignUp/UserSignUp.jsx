import "./UserSignUp.css";
import Nav from "../../components/Nav/Nav";
import axios from "axios";

const UserSignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const res = await axios.post("/api/user/signup", formData);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <main className="signup-body">
        <form className="user-formular" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" name="name" />
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <input type="file" name="image" />
          <button type="submit">Sign Up</button>
        </form>
      </main>
    </>
  );
};

export default UserSignUp;
