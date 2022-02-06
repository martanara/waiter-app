import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { fetchTables } from './redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Header from './components/views/Header';
import Home from './components/pages/Home';
import SingleTable from './components/pages/SingleTable';
import NotFound from './components/pages/NotFound';
import Footer from './components/views/Footer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<SingleTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
