import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import Clients from './components/Clients';
// import Project from './components/Projects';
// import AddClientModal from './components/AddClientModal';

import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
// const client = new ApolloClient({
//   uri: 'http://localhost:2000/graphql', // ✅ replace 4000 with your backend port
//   cache,
// });
// 
const API_URL =
  process.env.NODE_ENV === "production"
    ? "/graphql"
    : "http://localhost:2000/graphql";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});


function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/clients" element={<Clients />} />
            
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
    </>
  );
}

export default App;
