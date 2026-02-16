import { BrowserRouter, Routes, Route } from 'react-router'
import '../style/App.css'
import Profile from './Profile'
import List from './List'
import Login from './Login'
import Navbar from './Navbar'
import { ErrorBoundary } from 'react-error-boundary'
import LoginErrorFallback from './LoginErrorFallback'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={
            <ErrorBoundary fallback={<LoginErrorFallback/>}>
              <Login/>
            </ErrorBoundary>
          }/>
          <Route path="ui" element={<Navbar/>}>
            <Route path="profile" element={<Profile/>}/>
            <Route path="list" element={<List/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
