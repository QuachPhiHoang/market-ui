import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoute } from '~/routes';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoute.map((route, index) => {
                        const Component = route.component;
                        return <Route key={index} path={route.path} element={<Component />} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
