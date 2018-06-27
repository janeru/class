import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import App from '../components/App'
import ClassAdmin from '../components/ClassAdmin'
const AppRouter = () => (
    <BrowserRouter>
        <div>

            <Switch>
                <Route path="/" component={App} exact={true} />
                <Route path="/create" component={ClassAdmin} />
                {/* <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} /> */}
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;

