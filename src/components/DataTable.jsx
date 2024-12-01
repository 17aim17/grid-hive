import React from 'react';
import styles from './DataTable.module.css';
export const DataTable = ({ data }) => {
  return (
    <table aria-describedby="Funded Projects Overview" className={styles.table}>
      <thead>
        <tr>
          <th tabIndex={0} scope="col">
            S.No.
          </th>
          <th tabIndex={0} scope="col">
            Percentage funded
          </th>
          <th tabIndex={0} scope="col">
            Amount pledged
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={`${item['s.no']}${item['percentage.funded']}`}>
            <td tabIndex={0}>{item['s.no']}</td>
            <td tabIndex={0}>{item['percentage.funded']}</td>
            <td tabIndex={0}>{item['amt.pledged']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
