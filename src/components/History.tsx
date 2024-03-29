import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";
import { translate } from "../filters/translate";
import firebase from "firebase";
import { setInfo } from "../actions";

const History = ({ records, setInfo, categories, user }: any) => {
  console.log(categories, 'CATEGORIES');
  const uid = firebase.auth().currentUser!.uid;
  
  const dateOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  useEffect(() => {
    (async function() {
      const request = await firebase.database().ref(`users/${uid}/records`).get();

      if(request.exists()) {
        setInfo({key: 'records', value: Object.keys(request.val()).map((key: any) => ({id: key, ...request.val()[key]}))});
      }
    })();
  }, []);

  const data = {
    labels: categories.map((cat: any) => cat.title),
    datasets: [
      {
        label: "Расходы по категориям",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        data: categories.map(async (cat: any) => {
          const request = await firebase.database().ref(`users/${uid}/records`).get();
          if(request.exists()) {
            const records = Object.values(request.val()).filter((rec: any) => rec.categoryId == cat.id);
          
            const amount: any = records.reduce((p: any, i: any) => {
              if (i.type === "outcome") return (p += parseInt(i.amount));
              return (p -= parseInt(i.amount));
            }, 0);
            return amount > 0 ? amount : `+${Math.abs(amount)}`;
          }
        }),
      },
    ],
  };
  return (
    <>
      <div className="page-title">
        <h3>{translate(user.language, "History_Title")}</h3>
      </div>

      <div className="history-chart">
        <Pie data={data} />
      </div>

      {records && !records.length && (
        <p className="center">
          {translate(user.language, "NoRecords")}
          .&nbsp;
          <NavLink to="/new-record">
            {translate(user.language, "AddFirst")}
          </NavLink>
        </p>
      )}

      <section>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>{translate(user.language, "Amount")}</th>
              <th>{translate(user.language, "Date")}</th>
              <th>{translate(user.language, "Category")}</th>
              <th>{translate(user.language, "Type")}</th>
              <th>{translate(user.language, "Open")}</th>
            </tr>
          </thead>

          <tbody>
            {records.map((rec: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{rec.amount}</td>
                <td>
                  {/* {rec.created_at
                    .replace(rec.created_at.slice(-8), "")
                    .replace(/T/, " ")} */}
                </td>
                <td>{rec.categoryTitle}</td>
                <td>
                  <span
                    className={`white-text badge ${
                      rec.type === "income" ? "green" : "red"
                    }`}
                  >
                    {translate(
                      user.language,
                      rec.type === "income" ? "Income" : "Outcome"
                    )}
                  </span>
                </td>
                <td>
                  <NavLink to={`/record/${rec.id}`} className="btn-small btn">
                    <i className="material-icons">open_in_new</i>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default connect((state: any) => ({ ...state }), { setInfo })(History);
