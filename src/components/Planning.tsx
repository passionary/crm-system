import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCurrencySymbol } from "../utils/getCurrencySymbol";
import { translate } from "../filters/translate";
import { NavLink } from "react-router-dom";
import firebase from "firebase";

const Planning = ({ categories, records, bill, user }: any) => {
  console.log(records, 'RECORDS PLANNING');
  
  const uid = firebase.auth().currentUser!.uid;

  useEffect(() => {
    let elems: any;
    setTimeout(() => {
      elems = document.querySelectorAll(".tooltipped");
      for (const el in elems) {
        if (elems[el].getAttribute) {
          const tooltipp = elems[el].getAttribute("data-tooltipp") as any;

          M.Tooltip.init(elems[el], { html: tooltipp });
        }
      }
    }, 0);
    return () => {
      for (const el in elems) {
        const tooltipp = M.Tooltip.getInstance(elems[el]);

        if (tooltipp && tooltipp.destroy) {
          tooltipp.destroy();
        }
      }
    };
  }, []);
  const total = (array: any) => {
    let sum = 0;

    array.forEach((i: any) =>
      i.type === "outcome"
        ? (sum += parseInt(i.amount))
        : (sum -= parseInt(i.amount))
    );
    return sum;
  };

  return (
    <>
      <div className="page-title">
        <h3>{translate(user.language, "Menu_Planning")}</h3>
        <h4>{bill && getCurrencySymbol(bill, "KZT")}</h4>
      </div>

      <section>
        {categories && categories.length ? (
          categories.map((cat: any) => {
            const amount = total(records);
            const percent = (100 * amount) / cat.limit;
            const progress = percent > 100 ? 100 : percent;
            const progressColor =
              percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
            const tooltippValue = cat.limit - amount;
            const tooltipp = `${
              tooltippValue < 0 ? "Превышение на" : "Осталось"
            } ${Math.abs(tooltippValue)}`;
            return (
              <div key={cat.id}>
                <p>
                  <strong>{cat.title}:</strong>
                  {amount > 0
                    ? getCurrencySymbol(amount, "KZT")
                    : `+${getCurrencySymbol(Math.abs(amount), "KZT")}`}{" "}
                  {translate(user.language, "Of")}{" "}
                  {getCurrencySymbol(cat.limit, "KZT")}
                </p>
                <div className="progress tooltipped" data-tooltipp={tooltipp}>
                  <div
                    className={`determinate ${progressColor}`}
                    style={{ width: progress + "%" }}
                  ></div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="center">
            {translate(user.language, "NoCategories")}
            .&nbsp;
            <NavLink to="/categories">
              {translate(user.language, "AddFirst")}
            </NavLink>
          </p>
        )}
      </section>
    </>
  );
};

export default connect(
  (state: any) => ({ ...state }),
  null
)(Planning);
