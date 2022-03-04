import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { fetchTablesRequest } from './redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Header from './components/views/Header';
import Home from './components/pages/Home';
import SingleTable from './components/pages/SingleTable';
import NotFound from './components/pages/NotFound';
import Footer from './components/views/Footer';
import AddTable from './components/pages/AddTable';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTablesRequest()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<SingleTable />} />
        <Route path="/table/add" element={<AddTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
