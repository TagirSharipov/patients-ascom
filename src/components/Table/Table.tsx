import style from './Table.module.css';

const Table = ({ rows, columns }: { rows: any[]; columns: any[] }) => {
  return (
    <table className={style.table}>
      <thead>
        <tr>
          {columns.map((h, i) => (
            <th 
              className={style.headerCell}
              key={`table-header-${i}`}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((line, i) => (
          <tr key={`table-line-${i}`}>
            {line.map((l: any, j: number) => (
              <td key={`cell-${j}`} className={style.headerCell}>
                {l}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table> 
  );
};

export default Table;
