import React from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import { ThemeProvider } from 'styled-components'
import { Theme } from './Styles/Theme'
import { AppWrapper } from './Styles/App'
import { Header } from './Components/Header'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <RecoilRoot>
        <ToastProvider autoDismissTimeout={3000} autoDismiss={true}>
          <AppWrapper>
            <Header />
            <Router>
              <Switch>
                <Route path="/">
                  <p>test</p>
                </Route>
              </Switch>
            </Router>
          </AppWrapper>
        </ToastProvider>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default App
