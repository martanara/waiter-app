import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getTableId } from '../../redux/tablesRedux';

const SingleTable = () => {

  const { id } = useParams();
  const table = useSelector(state => getTableId(state, parseInt(id)))
  console.log(table);

  return (
    <h1>{table.id}</h1>
    
  )
}

export default SingleTable;