import TableForm from './TableForm';
import { useDispatch } from 'react-redux';
import { addTableRequest } from '../../redux/tablesRedux';
import { useNavigate } from 'react-router-dom';
import shortid from 'shortid';

const AddTableForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const table = {
    id: shortid(),
    status: 'Free',
    peopleAmount: 0,
    maxPeopleAmount: 5,
    bill: 0,
  }
  
  const handleSubmit = tableData => {
    dispatch(addTableRequest(tableData));
    navigate("/");
  }

  return (
    <TableForm action={handleSubmit} table={table} actionText={'Add table'} />
  )
}

export default AddTableForm;