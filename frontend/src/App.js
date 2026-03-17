import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import SubscriptionScreen from './screens/SubscriptionScreen';
import UserProfile from './screens/UserProfile';
import ApplySeller from './screens/ApplySeller';
import SellerDashboard from './screens/SellerDashboard';
import UserScreen from './screens/UserScreen';
import SubscriptionList from './screens/SubscriptionList';

function App() {
  const { userInfo } = useSelector((state) => state.userLogin);

  const ProtectedRoute = ({ children, isAdmin = false, isSeller = false }) => {
    if (!userInfo) return <Navigate to="/login" />;
    if (isAdmin && !userInfo.is_admin) return <Navigate to="/" />;
    if (isSeller && !userInfo.is_seller) return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/service/:id" element={<DetailScreen />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/subscriptions" element={<SubscriptionScreen />} />

            <Route path="/profile" element={
              <ProtectedRoute> <UserProfile /> </ProtectedRoute>
            } />
            <Route path="/apply-seller" element={
              <ProtectedRoute> <ApplySeller /> </ProtectedRoute>
            } />

            <Route path="/seller/dashboard" element={
              <ProtectedRoute isSeller={true}> <SellerDashboard /> </ProtectedRoute>
            } />

            <Route path="/admin/userlist" element={
              <ProtectedRoute isAdmin={true}> <UserScreen /> </ProtectedRoute>
            } />
            <Route path="/admin/subscriptions" element={
              <ProtectedRoute isAdmin={true}> <SubscriptionList /> </ProtectedRoute>
            } />
            <Route path="/chat" element={<ProtectedRoute><ChatScreen /></ProtectedRoute>} />
          </Routes>
        </Container>
      </main>
      
    </Router>
  );
}

export default App;