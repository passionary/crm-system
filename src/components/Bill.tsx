import React from "react";

export const Bill = (props: any) => {
  return (
    <div className="app-page">
      <div>
        <div className="page-title">
          <h3>Счет</h3>

          <button className="btn waves-effect waves-light btn-small">
            <i className="material-icons">refresh</i>
          </button>
        </div>

        <div className="row">
          <div className="col s12 m6 l4">
            <div className="card light-blue bill-card">
              <div className="card-content white-text">
                <span className="card-title">Счет в валюте</span>

                <p className="currency-line">
                  <span>12.0 Р</span>
                </p>
              </div>
            </div>
          </div>

          <div className="col s12 m6 l8">
            <div className="card orange darken-3 bill-card">
              <div className="card-content white-text">
                <div className="card-header">
                  <span className="card-title">Курс валют</span>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Валюта</th>
                      <th>Курс</th>
                      <th>Дата</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>руб</td>
                      <td>12121</td>
                      <td>12.12.12</td>
                    </tr>
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
