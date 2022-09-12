import React from "react";
import { connect } from "react-redux";
import { getCurrencySymbol } from "../utils/getCurrencySymbol";
import { translate } from "../filters/translate";

const Bill = ({ rates, date, bill, user }: any) => {
  const base = (bill: any) => {
    return bill / (rates!["KZT"] / rates!["EUR"]);
  };
  const getCurrency = (base: any, currency: string) => {
    return base * rates[currency];
  };

  return (
    <div className="app-page">
      <div>
        <div className="page-title">
          <h3>{translate(user.language, "Bill")}</h3>
          
        </div>

        <div className="row">
          <div className="col s12 m6 l4">
            <div className="card light-blue bill-card">
              <div className="card-content white-text">
                <span className="card-title">
                  {translate(user.language, "BillInCurrency")}
                </span>

                {rates &&
                  date &&
                  bill &&
                  Object.keys(rates).map((rate: any, index: number) => (
                    <p className="currency-line" key={index}>
                      <span>
                        {getCurrencySymbol(
                          getCurrency(base(bill), rate),
                          rate
                        )}
                      </span>
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <div className="col s12 m6 l8">
            <div className="card orange darken-3 bill-card">
              <div className="card-content white-text">
                <div className="card-header">
                  <span className="card-title">
                    {translate(user.language, "CurrencyAmountTitle")}
                  </span>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>{translate(user.language, "Currency")}</th>
                      <th>{translate(user.language, "CurrencyType")}</th>
                      <th>{translate(user.language, "Date")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rates && Object.keys(rates).map((rate: any, index: number) => (
                      <tr key={index}>
                        <td>{rate}</td>
                        <td>{rates[rate]}</td>
                        <td>{date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: any) => ({ ...state }),
  null
)(Bill);
