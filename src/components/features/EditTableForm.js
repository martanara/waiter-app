import TableForm from './TableForm';
import { useDispatch } from 'react-redux';
import { editTableRequest } from '../../redux/tablesRedux';
import { useNavigate } from 'react-router-dom';

const EditTableForm = ({ table }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSubmit = tableData => {
    dispatch(editTableRequest(tableData));
    navigate("/");
  }

  return (
    <TableForm action={handleSubmit} table={table} actionText='Update' />
  )
};

export default EditTableForm;