import React from "react";

export const History = () => {
  return (
    <>
      <div className="page-title">
        <h3>История записей</h3>
      </div>

      <div className="history-chart">
        <canvas></canvas>
      </div>

      <section>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Сумма</th>
              <th>Дата</th>
              <th>Категория</th>
              <th>Тип</th>
              <th>Открыть</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>1212</td>
              <td>12.12.32</td>
              <td>name</td>
              <td>
                <span className="white-text badge red">Расход</span>
              </td>
              <td>
                <button className="btn-small btn">
                  <i className="material-icons">open_in_new</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};
