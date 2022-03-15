import TableForm from './TableForm';
import { useDispatch } from 'react-redux';
import { addTableRequest } from '../../redux/tablesRedux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllTablesId } from '../../redux/tablesRedux';

const AddTableForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allTableIds = useSelector(state => getAllTablesId(state));

  const generateTableId = () => {
    const isUnavailable = n => {
      return allTableIds.find(tableId => tableId === n)
    } 

    let newId = 1;

    for (let counter = 1; counter <= 50; counter++){
      if (!isUnavailable(counter)) {
        newId = counter;
        break;
      }
    }
    return newId;
  }

  const table = {
    id: generateTableId(),
    status: 'Free',
    peopleAmount: 0,
    maxPeopleAmount: 4,
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