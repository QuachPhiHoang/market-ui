import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { publicRoute } from '~/routes';
import ProtectedRoute from './routes/ProtectedRoute';
import { useEffect, useState } from 'react';
import { loadUser } from './redux/user/userSlice';
import { store } from '~/redux/store';
import WebFont from 'webfontloader';
import axiosInstance from '~/service/axiosInterceptor';

function App() {
    const [stripeApi, setStripeApi] = useState('');
    const state = store.getState();
    console.log(state.user.isAuthenticated);
    async function getStripeApi() {
        const { data } = await axiosInstance.get('payment/stripeapikey', { withCredentials: true });
        setStripeApi(data.stripeApiKey);
    }
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka'],
            },
        });
        if (state.user.isAuthenticated) {
            store.dispatch(loadUser());
            getStripeApi();
        }
    }, [state.user.isAuthenticated]);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoute?.map((route, index) => {
                        const Component = route.component;
                        if (route.isAuthenticated) {
                            return route?.isAdmin
                                ? stripeApi && (
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

// return route.isStripe ? (
//     stripeApi && (
//         <Route
//             key={index}
//             path={route.path}
//             element={
//                 <Elements stripe={loadStripe(stripeApi)}>
//                     <ProtectedRoute>
//                         <Component />
//                     </ProtectedRoute>
//                 </Elements>
//             }
//         />
//     )
// ) : (
//     <Route
//         key={index}
//         path={route.path}
//         element={
//             <ProtectedRoute>
//                 <Component />
//             </ProtectedRoute>
//         }
//     />
// );
