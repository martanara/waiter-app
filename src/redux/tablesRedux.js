import { API_URL } from '../config';

//selectors
export const getAllTables = state => state.tables;
export const getTableId = ({ tables }, tableId) => tables.find(table => table.id === tableId);
export const getAllTablesId = state => {
  const allIds = [];
  for (let table of state.tables) {
    allIds.push(table.id)
  }
  return allIds;
}

// action names
const createActionName = name => `app/tables/${name}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload })
export const addTable = payload => ({ type: ADD_TABLE, payload })
export const removeTable = payload => ({ type: REMOVE_TABLE, payload })

// API requests

export const fetchTablesRequest = () => {
  return (dispatch) => {
    fetch(`${API_URL}/tables`)
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)))
    };
};

export const editTableRequest = tableData => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    
      body: JSON.stringify({
        status: tableData.status,
        peopleAmount: tableData.peopleAmount,
        maxPeopleAmount: tableData.maxPeopleAmount,
        bill: tableData.bill
      }),
    };
    
    fetch(`${API_URL}/tables/${tableData.id}`, options)
      .then(() => dispatch(editTable(tableData)))
  };
};

export const addTableRequest = tableData => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tableData),
    };
    fetch(`${API_URL}/tables`, options)
      .then(() => dispatch(addTable(tableData)));
  };
};

export const removeTableRequest = tableId => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch(`${API_URL}/tables/${tableId}`, options)
      .then(() => dispatch(removeTable(tableId)));
  };
};

const tablesReducer = (statePart = [], action) => {
  switch(action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case EDIT_TABLE:
      return statePart.map(table => table.id === action.payload.id ? { ...table, ...action.payload } : table);
    case ADD_TABLE:
      return [...statePart, action.payload];
    case REMOVE_TABLE:
      return statePart.filter(table => table.id !== action.payload);
    default:
      return statePart;
  };
};

export default tablesReducer;