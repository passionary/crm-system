import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCurrencySymbol } from "../utils/getCurrencySymbol";

const Planning = ({ categories, bill }: any) => {
  useEffect(() => {
    let elems:any
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
        const tooltipp = M.Tooltip.getInstance(elems[el])

        if(tooltipp && tooltipp.destroy) {
          tooltipp.destroy()
        }
      }
    }
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
        <h3>Планирование</h3>
        <h4>{bill && getCurrencySymbol(bill.bill, "RUB")}</h4>
      </div>

      <section>
        {categories.map((cat: any) => {
          const amount = total(cat.records);
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
                <strong>{cat.name}:</strong>
                {amount > 0
                  ? getCurrencySymbol(amount, "RUB")
                  : `+${getCurrencySymbol(Math.abs(amount), "RUB")}`}{" "}
                из {getCurrencySymbol(cat.limit, "RUB")}
              </p>
              <div className="progress tooltipped" data-tooltipp={tooltipp}>
                <div
                  className={`determinate ${progressColor}`}
                  style={{ width: progress + "%" }}
                ></div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default connect((state: any) => ({ bill: state.bill }), null)(Planning);
