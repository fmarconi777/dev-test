import { Router , Switch, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import { history } from './history';
import App from './main/App';

function Routes() {
    return (
        <Router history={history} >
            <Switch>
                <Route path="/" component={App} />
                <PrivateRoute component={NotFound} />
            </Switch>
        </Router>
    )
}

export default Routes;