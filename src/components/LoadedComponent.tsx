import React, { useState, useEffect } from "react";
import { Loader } from "./Loader";
import { connect } from "react-redux";

const LoadedComponent = ({
  component,
  url,
  toDefine,
  initial,
  additional,
}: any) => {
  const [data, setData] = useState(initial);
  const [load, setLoad] = useState(true);
  let [render, setRender] = useState(0);
  const createCategory = (cat: any) => {
    setData({ categories: data.categories.concat(cat) });
  };
  const editCategory = (cat: any) => {
    const categories = data.categories.slice(0);
    categories.splice(
      categories.findIndex((c: any) => c.id == cat.id),
      1,
      cat
    );

    setData({ categories });
    setRender(++render);
  };
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        let data: any = {};
        toDefine.forEach(
          (item: any) => (data[item[0]] = item[1] ? res[item[1]] : res)
        );

        setLoad(false);
        setData(Object.assign({}, data, additional ? additional(res) : {}));
      });
  }, []);
  if (load) return <Loader />;
  return React.createElement(component, {
    ...data,
    createCategory,
    editCategory,
  });
};

// const mapDispatchToProps = {
//   fetchServerData: (data: any) => {
//     return {
//       type: 'fetchServerData',
//       payload: data
//     }
//   }
// }

export default connect((state: any) => ({ ...state }), null)(LoadedComponent);
