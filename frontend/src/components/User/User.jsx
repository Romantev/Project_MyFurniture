const User = ({ user }) => {
  return (
    <div>
      {/* <img src={user.image.url} alt={user.name} /> */}
      <h1>{user.name}</h1>
      <h2>{user.age}</h2>
      <h2>{user.country}</h2>
      <h3>{user.email}</h3>
    </div>
  );
};

export default User;
