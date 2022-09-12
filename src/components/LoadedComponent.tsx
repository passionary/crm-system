import React, { useState, useEffect } from "react";
import { Loader } from "./Loader";
import { connect } from "react-redux";
import { setToast, setInfo } from "../actions";
import { translate } from "../filters/translate";
import firebase from 'firebase';

const LoadedComponent = ({
  component,
  url,
  toDefine,
  initial,
  additional,
  isHttpSource,
  user,
  setToast,
  categories,
  setInfo,
  bill,
}: any) => {
  const [load, setLoad] = useState(true);
  let [render, setRender] = useState(0);
  const createCategory = (cat: any) => {
    setInfo({ key: 'categories', value: categories.concat(cat) });
  };
  const editCategory = (cat: any) => {
    const cats = categories.slice(0);

    cats.splice(
      cats.findIndex((c: any) => c.id == cat.id),
      1,
      cat
    );

    setRender(++render);
  };
  useEffect(() => {
    const uid = firebase.auth().currentUser!.uid;

    if(isHttpSource) {
      fetch(url, {
        headers: {
          apikey: process.env.REACT_APP_FIXER
        } as any
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, 'RES LOADED COMPONENT');
        
        setLoad(false);
        setInfo({ key: 'rates', value: res.rates});
        setInfo({ key: 'date', value: res.date});
        setInfo({ key: 'timestamp', value: res.timestamp});
        setInfo({ key: 'base', value: res.base});
        // setData(Object.assign({}, data, additional ? additional(res) : {}));
      })
      .catch((e) => {
        setToast(translate(user.language, "CatchError"));
        setLoad(false);
      });
    }
    else {
      try {
        const path = `users/${uid}/${url}`;
        if(!url) throw new Error('no data');
        firebase.database().ref(path).get().then((snapshot: any) => {
          if(snapshot.exists()) {
            const data = snapshot.val();
  
            if(url) {
              setInfo({
                key: url, value: Object.keys(data).map(key => ({id: key, ...data[key]}))
              });
            }
            
            setLoad(false);
          }
          else {
            setInfo({
              key: url, value: []
            });
            setLoad(false);
          }
        })
        .catch(error => {
          setLoad(false);
        })
      } catch(error) {
        setLoad(false);
      }
    }
  }, []);
  if (load) return <Loader />;
  return React.createElement(component, {
    bill,
    createCategory,
    editCategory,
  });
};

const mapDispatchToProps = {
  setToast,
  setInfo
};

export default connect(
  (state: any) => ({ ...state }),
  mapDispatchToProps
)(LoadedComponent);
