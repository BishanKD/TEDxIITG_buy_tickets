import React from "react";
import { useNavigate } from "react-router-dom";

function SelectUserType() {
  const navigate = useNavigate();

  const handleIITGSelection = () => {
    navigate("/iitg");
  };

  const handleNonIITGSelection = () => {
    navigate("/payment");
  };

  return (
    <div style={{ margin: "50px auto", maxWidth: "500px", textAlign: "center" }}>
      <h1>TEDx IITG - Buy Tickets</h1>
      <p>Select your category:</p>
      <div>
        <button onClick={handleIITGSelection} style={{ margin: "10px" }}>
          I am from IITG
        </button>
        <button onClick={handleNonIITGSelection} style={{ margin: "10px" }}>
          I am not from IITG
        </button>
      </div>
    </div>
  );
}

export default SelectUserType;
