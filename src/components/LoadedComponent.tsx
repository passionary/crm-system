import React, { useState, useEffect } from "react";
import { Loader } from "./Loader";
import { connect } from "react-redux";

const LoadedComponent = ({ component }: any) => {
  const [base, setBase] = useState(0);
  let [rates, setRates] = useState();
  const [date, setDate] = useState("");
  useEffect(() => {
    const key = process.env.REACT_APP_FIXER;

    fetch(
      `http://data.fixer.io/api/latest?access_key=${key}&symbols=KZT,USD,EUR`
    )
      .then((res) => res.json())
      .then((res) => {
        setRates(res.rates);
        setDate(res.date);
        setBase(10000 / (res.rates!["KZT"] / res.rates!["EUR"]));
      });
  }, []);
  if (!rates) return <Loader />;
  return React.createElement(component, { rates, base, date });
};

export default LoadedComponent;
