import styles from './SingleTable.module.scss';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getTableId, updateSingleTable } from '../../redux/tablesRedux';
import { useState } from 'react';
import shortid from 'shortid';
import { useNavigate, Navigate } from 'react-router-dom';
import SpinnerAnimation from '../common/SpinnerAnimation';

const SingleTable = () => {

  const { id } = useParams();
  const table = useSelector(state => getTableId(state, parseInt(id)))

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  
  const [status, setStatus] = useState(table.status)
  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount)
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount)
  const [bill, setBill] = useState(table.bill)

  const statusNames = ["Busy", "Cleaning", "Free", "Reserved"]
  const otherStatuses = statusNames.filter(statusName => statusName !== status)

  const handlePeopleAmount = n => {
    if (n > maxPeopleAmount) {
      setPeopleAmount(maxPeopleAmount);
    } else if (n <= 0){
      setPeopleAmount(0);
    } else {
      setPeopleAmount(n);
    }
  }

  const handleMaxPeopleAmountChange = n => {
    if (peopleAmount >= n) {
      setPeopleAmount(n)
      setMaxPeopleAmount(n)
    } else if (n >= 10) {
      setMaxPeopleAmount(10)
    } else {
      setMaxPeopleAmount(n)
    }
  }

  const handleStatusChange = status => {
    if (status === 'Busy') {
      setBill(0);
      setStatus(status);
    } else if (status === 'Cleaning' || status === 'Free'){
      setPeopleAmount(0);
      setStatus(status);
    } else {
      setStatus(status);
    }
  };

  const handleSubmit = e => {
    setIsLoading(true);
    dispatch(updateSingleTable({status, peopleAmount, maxPeopleAmount, bill, id }))
    navigate("/")
  }

  if (!table) return <Navigate to="/" />
  return (
    <>
      <h1>Table {table.id}</h1>
      {isLoading && <SpinnerAnimation />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="status" className="d-flex justify-content-start align-items-center mt-3">
          <Form.Label className={styles.label}>Status:</Form.Label>
            <Form.Select  
              className={styles.select}
              onChange={e => handleStatusChange(e.target.value)}
            >
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
            </Form.Select>
        </Form.Group>
        <Form.Group controlId="peopleAmount" className="d-flex justify-content-start align-items-center mt-3">
          <Form.Label className={styles.label}>People:</Form.Label>
          <div className={styles.numberInput}>
            <Form.Control
              type="number"
              value={peopleAmount} 
              onChange={e => handlePeopleAmount(e.target.value)}
            />
          </div>
          <p className="mx-2 mt-3">/</p>
          <div className={styles.numberInput}>
            <Form.Control
              type="number"
              value={maxPeopleAmount} 
              onChange={e => handleMaxPeopleAmountChange(e.target.value)}
            />
          </div>
        </Form.Group>
          {
            status === "Busy" &&  
              <Form.Group controlId="bill" className="d-flex justify-content-start align-items-center mt-2">
                <Form.Label className={styles.label}>Bill:</Form.Label>
                <p className="mx-2 mt-3">$</p>
                  <Form.Control
                    className={styles.numberInput}
                    type="number"
                    value={bill} 
                    onChange={e => setBill(e.target.value)}
                  />
              </Form.Group>
          }
        <Button variant="primary" type="submit" className="mt-4">Update</Button>
      </Form>
    </>
  )
}

export default SingleTable;