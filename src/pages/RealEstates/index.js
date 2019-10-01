import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../config/API";

function RealEstates(props) {
  const [realEstatesData, setRealEstatesData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/real-estates");
      console.log("TCL: fetchData -> response", response);
    }
    fetchData();
  }, []);
  return <div>I am here to take over</div>;
}

RealEstates.propTypes = {};

export default RealEstates;
