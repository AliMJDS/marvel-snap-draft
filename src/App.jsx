import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SharedPoolDraft from './pages/SharedPoolDraft';
import IndividualDraft from './pages/IndividualDraft';
import Results from './pages/Results';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/draft/shared-pool" element={<SharedPoolDraft />} />
          <Route path="/draft/individual" element={<IndividualDraft />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
