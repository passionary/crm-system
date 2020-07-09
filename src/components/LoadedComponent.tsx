import React, { useState, useEffect } from "react";
import { Loader } from "./Loader";

const LoadedComponent = ({ component, url, toDefine, initial, additional }: any) => {
  const [data, setData] = useState(initial)
  const [load, setLoad] = useState(true)

  useEffect(() => {
    fetch(
      url
    )
      .then((res) => res.json())
      .then((res) => {
        let data:any = {}
        toDefine.forEach((item:any) => data[item] = res[item])
        setLoad(false)
        setData(Object.assign({}, data, additional ? additional(res) : {}))
        // setRates(res.rates);
        // setDate(res.date);
        // setBase(10000 / (res.rates!["KZT"] / res.rates!["EUR"]));
      });
  }, []);
  if (load) return <Loader />;
  return React.createElement(component, data);
};

export default LoadedComponent;
