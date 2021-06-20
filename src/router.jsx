import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Todo from './components/index'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Todo} exact path="/" />   
            </Switch>
        </BrowserRouter>
    )
}


export default Routes