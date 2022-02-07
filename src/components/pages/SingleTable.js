import styles from './SingleTable.module.scss';
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
        <div className="d-flex justify-content-start align-items-center mt-3">
          <div className={styles.label}>
            <Form.Label>Status:</Form.Label>
          </div>
          <div className={styles.select}>
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
          </div>
        </div>
        </Form.Group>
        <Form.Group>
        <div className="d-flex justify-content-start align-items-center mt-3">
          <div className={styles.label}>
            <Form.Label>People:</Form.Label>
          </div>
          <div className={styles.numberInput}>
            <Form.Control
              type="text"
              value={peopleAmount} 
              onChange={e => setPeopleAmount(e.target.value)}  
            />
          </div>
          <p className="mx-2 mt-3">/</p>
          <div className={styles.numberInput}>
            <Form.Control
              type="text"
              value={maxPeopleAmount} 
              onChange={e => setMaxPeopleAmount(e.target.value)}
            />
          </div>
        </div>
        </Form.Group>
        <Form.Group>
        <div className="d-flex justify-content-start align-items-center mt-2">
          <div className={styles.label}>
            <Form.Label>Bill:</Form.Label>
          </div>
          <p className="mx-2 mt-3">$</p>
          <div className={styles.numberInput}>
            <Form.Control
              type="text"
              value={bill} 
              onChange={e => setBill(e.target.value)}
            />
          </div>
        </div>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">Update</Button>
      </Form>
    </>
  )
}

export default SingleTable;