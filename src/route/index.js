import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import AppLayout from "./AppLayout";

const AppRouter = () => (
  <HashRouter>
    <Switch>
      <Route path="/">
        <AppLayout>
        </AppLayout>
      </Route>
    </Switch>

  </HashRouter>
)

export default AppRouter

