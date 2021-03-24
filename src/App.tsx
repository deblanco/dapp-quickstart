import React from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import { ThemeProvider } from 'styled-components'
import { Theme } from './Styles/Theme'
import { AppWrapper, BodyWrapper } from './Styles/App'
import { Header } from './Components/Header'
import { Swap } from './Views/Swap'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <RecoilRoot>
        <ToastProvider autoDismissTimeout={3000} autoDismiss={true}>
          <AppWrapper>
            <Header />
            <BodyWrapper>
              <Router>
                <Switch>
                  <Route path="/">
                    <Swap />
                  </Route>
                </Switch>
              </Router>
            </BodyWrapper>
          </AppWrapper>
        </ToastProvider>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default App
