import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTables } from '../../redux/tablesRedux';
import { Link } from 'react-router-dom';
import SpinnerAnimation from '../common/SpinnerAnimation';
import { removeTableRequest } from '../../redux/tablesRedux';

const Tables = () => {

  const dispatch = useDispatch()

  const tables = useSelector(state => getAllTables(state))

  const sortedTables = tables.sort(function(a, b) { 
    return a.id - b.id
  });

  const remove = tableId => {
    dispatch(removeTableRequest(tableId))
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1>All tables</h1>
        <Link className="ms-auto p-2" to={`/table/add`}>
          <Button variant="primary">Add table</Button>
        </Link>
      </div>
      {tables.length === 0 && <SpinnerAnimation />}
      {
        sortedTables.map(table => (
          <div key={table.id} className="d-flex border-bottom align-items-center">
            <h3 className="m-0">Table {table.id}</h3>
            <p className="ps-4 m-0"><span className="fw-bold">Status: </span>{table.status}</p>
            <Link className="ms-auto p-2" to={`/table/${table.id}`}>
              <Button variant="primary">Show more</Button>
            </Link>
            <Button variant="primary" onClick={() => remove(table.id)}>Delete</Button>
          </div>
        ))
      }
    </>
  );
}

export default Tables;