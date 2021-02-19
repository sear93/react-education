import React, {useEffect} from 'react'
import styled from 'styled-components';
import {NavLink, Route, Switch} from 'react-router-dom'
import Contacts from "./components/Contacts";
import About from "./components/About";
import Profile from "./components/Blog";
import Swapi from "./components/Swapi";
import {useSelector, useDispatch} from "react-redux";
import {getUserData, logout, setDarkMode} from "./store/appReducer";

const App = () => {

    let dispatch = useDispatch();
    let darkMode = useSelector(state => state.app.isDarkMode)
    let auth = useSelector(state => state.app.auth)
    console.log(darkMode)

    useEffect(() => {
        dispatch(getUserData())
    }, [])

    return (
        <AppContainer>
            {!darkMode
                ? (
                    <StyledBtn onClick={() => dispatch(setDarkMode(true))}>Dark Mode</StyledBtn>
                )
                : (
                    <StyledBtn onClick={() => dispatch(setDarkMode(false))}>Light Mode</StyledBtn>
                )}
            {auth?.isAuth ? (
                <Login darkMode={darkMode}>
                    {auth.login}
                    <button onClick={() => dispatch(logout())}>Log out</button>
                </Login>
            ) : (
                <Login darkMode={darkMode}>Login</Login>
            )}
            <HeaderContainer darkMode={darkMode}>
                <nav>
                    <StyledLink to={'/'}>Home</StyledLink>
                    <StyledLink to={'/form'}>Contacts</StyledLink>
                    <StyledLink to={'/pokemons'}>Pokemon API</StyledLink>
                    <StyledLink to={'/login'}>Login</StyledLink>
                </nav>
                <Switch>
                    <Route path={'/form'} render={() => <Contacts/>}/>
                    <Route path={'/pokemons'} render={() => <About/>}/>
                    <Route path={'/poke/:id'} render={() => <Profile/>}/>
                    <Route path={'/login'} render={() => <Swapi/>}/>
                </Switch>
            </HeaderContainer>
        </AppContainer>
    );
}

export default App;

const AppContainer = styled.div`
  text-align: center;
`

const HeaderContainer = styled.div`
  transition: all 0.5s ease;
  background-color: ${props => props.darkMode ? 'black' : 'white'};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: ${props => props.darkMode ? 'white' : 'black'};
`

// const Link = styled.a`
//   color: #61dafb;
// `

// const Logo = styled.img`
//   height: 40vmin;
//   pointer-events: none;
//
//   @media (prefers-reduced-motion: no-preference) {
//     animation: App-logo-spin infinite 20s linear;
//   }
//
//   @keyframes App-logo-spin {
//     from {
//       transform: rotate(0deg);
//     }
//     to {
//       transform: rotate(360deg);
//     }
//   }
// `

const StyledLink = styled(NavLink)`
  margin: 0 10px;
  padding: 0 5px;
  color: inherit;
  text-decoration: none;
`

const StyledBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
`

const Login = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  color: ${props => props.darkMode ? 'white' : 'black'};
`