import "./AddButton.css";

const AddButton = ({ setFormIsActive }) => {
  const handleFormActive = () => {
    setFormIsActive(true);
  };

  return (
    <button onClick={handleFormActive} className="addButton">
      Add new Item
    </button>
  );
};

export default AddButton;
