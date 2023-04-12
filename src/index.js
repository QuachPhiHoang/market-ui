import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import GlobalStyle from '~/components/GlobalStyle';
import reportWebVitals from './reportWebVitals';
import { store } from '~/redux/store';
import { Provider } from 'react-redux';
import { injectStore } from '~/service/axiosInterceptor';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
const root = ReactDOM.createRoot(document.getElementById('root'));
injectStore(store);
let persistor = persistStore(store);
root.render(
    <React.StrictMode>
        <GlobalStyle>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </GlobalStyle>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
