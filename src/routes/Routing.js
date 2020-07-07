    import React from "react";
    import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
    import {map} from "lodash";
    import configRouting from "./configRouting";

export default function Routing(props){

    const {setRefreshLogin} = props;

    return (
        <Router>
            <Switch>
             {map(configRouting, (route, index) => (
             <Route key={index} path={route.path} exact={route.exact} >
                <route.page setRefreshLogin={setRefreshLogin} active={route.active}/> 
             </Route>    
             ))}
            </Switch>
        </Router>
    )

}