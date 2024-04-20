import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { publicRoute } from '~/routes';
import ProtectedRoute from './routes/ProtectedRoute';
import { useEffect, useState } from 'react';
import axiosInstance from '~/service/axiosInterceptor';
import { useSelector } from 'react-redux';

function App() {
    const [stripeApi, setStripeApi] = useState('');
    const { isAuthenticated } = useSelector((state) => state.user);
    async function getStripeApi() {
        const { data } = await axiosInstance.get('payment/stripeapikey', { withCredentials: true });
        setStripeApi(data.stripeApiKey);
    }
    useEffect(() => {
        if (isAuthenticated) {
            getStripeApi();
        }
    }, [isAuthenticated]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoute &&
                        publicRoute?.map((route, index) => {
                            const Component = route.component;
                            if (route?.isAuthenticated) {
                                return route?.isAdmin
                                    ? isAuthenticated && stripeApi && (
                                          <Route
                                              key={index}
                                              path={route.path}
                                              element={
                                                  <Elements stripe={loadStripe(stripeApi)}>
                                                      <ProtectedRoute isAdmin={true}>
                                                          <Component />
                                                      </ProtectedRoute>
                                                  </Elements>
                                              }
                                          />
                                      )
                                    : stripeApi && (
                                          <Route
                                              key={index}
                                              path={route.path}
                                              element={
                                                  <Elements stripe={loadStripe(stripeApi)}>
                                                      <ProtectedRoute isAdmin={false}>
                                                          <Component />
                                                      </ProtectedRoute>
                                                  </Elements>
                                              }
                                          />
                                      );
                            }

                            return <Route key={index} path={route.path} element={<Component />} />;
                        })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
