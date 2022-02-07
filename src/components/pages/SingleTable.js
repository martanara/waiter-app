import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getTableId, updateSingleTable } from '../../redux/tablesRedux';
import { useState } from 'react';
import shortid from 'shortid';
import { useNavigate } from 'react-router-dom';

const SingleTable = () => {

  const { id } = useParams();
  const table = useSelector(state => getTableId(state, parseInt(id)))

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState(table.status)
  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount)
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount)
  const [bill, setBill] = useState(table.bill)

  const statusNames = ["Busy", "Cleaning", "Free", "Reserved"]
  const otherStatuses = statusNames.filter(statusName => statusName !== status)

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateSingleTable({status, peopleAmount, maxPeopleAmount, bill, id }))
    navigate("/")
  }

  return (
    <>
      <h1>Table {table.id}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" onChange={e => setStatus(e.target.value)} >
            <option value={status}>
              {status}
            </option>
            {
              otherStatuses.map(statusName => (
                <option key={shortid()} value={statusName}>
                  {statusName}
                </option>
              ))
            }
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>People</Form.Label>
          <Form.Control
            type="text"
            value={peopleAmount} 
            onChange={e => setPeopleAmount(e.target.value)}  
          />
          <Form.Control
            type="text"
            value={maxPeopleAmount} 
            onChange={e => setMaxPeopleAmount(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Bill</Form.Label>
          <Form.Control
            type="text"
            value={bill} 
            onChange={e => setBill(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Update</Button>
      </Form>
    </>
  )
}

export default SingleTable;