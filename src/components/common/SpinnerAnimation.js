import { Spinner } from 'react-bootstrap';

const SpinnerAnimation = () => {
  return (
    <div className="my-5 d-flex justify-content-center">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerAnimation;