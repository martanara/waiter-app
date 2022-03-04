import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getTableId } from '../../redux/tablesRedux';
import { Navigate } from 'react-router-dom';
import EditTableForm from '../features/EditTableForm'

const SingleTable = () => {

  const { id } = useParams();
  const table = useSelector(state => getTableId(state, parseInt(id)))

  if (!table) return <Navigate to="/" />
  return (
    <EditTableForm table={table}/>
  )
}

export default SingleTable;