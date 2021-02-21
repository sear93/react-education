import React, {useEffect, useState} from 'react'
import './index.css'
import styled from 'styled-components';
import {Link, NavLink, Redirect, Route, Switch} from 'react-router-dom'
import Contacts from "./components/Contacts";
import CurrentPoke from "./components/CurrentPoke";
import {useSelector, useDispatch} from "react-redux";
import {initializedSuccess, logout, setDarkMode} from "./store/appReducer";
import Login from "./components/Login";
import Loader from "./utils/Loader";

import {Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LoginOutlined,
    UnorderedListOutlined,
    ContactsOutlined,
    HomeOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import Pokemons from "./components/Pokemons";

const {Header, Sider, Content} = Layout;

const App = () => {

    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {
        setCollapsed(!collapsed)
    };

    let dispatch = useDispatch();
    let darkMode = useSelector(state => state.app.isDarkMode)
    let auth = useSelector(state => state.app.auth.isAuth)
    let initializedApp = useSelector(state => state.app.initialized)

    useEffect(() => {
        dispatch(initializedSuccess())
    }, [])

    if (!initializedApp) return <Loader/>

    return (

        <Layout style={{minHeight: "100vh"}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Logo>
                    <Link to={"/"}>
                        {!collapsed ? "Big logo" : "Logo"}
                    </Link>
                </Logo>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<HomeOutlined/>}>
                        <StyledLink to={'/'}>Home</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ContactsOutlined/>}>
                        <StyledLink to={'/form'}>Contacts</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UnorderedListOutlined/>}>
                        <StyledLink to={'/pokemons'}>Pokemon API</StyledLink>
                    </Menu.Item>
                    {!auth
                        ? (
                            <Menu.Item key="4" icon={<LoginOutlined/>}>
                                <StyledLink to={'/login'}>Login</StyledLink>
                            </Menu.Item>
                        )
                        : (
                            <Menu.Item key="4" icon={<LogoutOutlined/>}>
                                <Link to='/' onClick={() => dispatch(logout())}>
                                    Logout
                                </Link>
                            </Menu.Item>
                        )
                    }
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background header" style={{padding: 0, background: "inherit"}}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {className: 'trigger', onClick: toggle, style: {color: "#031529"}
                    })}

                    <div style={{display: "flex", margin: "0 10px 0 0"}}>

                        {/*<DarkModeWrapper darkmode={darkMode}>*/}
                        {/*    {!darkMode*/}
                        {/*        ? (*/}
                        {/*            <button onClick={() => dispatch(setDarkMode(true))}>Dark Mode</button>*/}
                        {/*        )*/}
                        {/*        : (*/}
                        {/*            <button onClick={() => dispatch(setDarkMode(false))}>Light Mode</button>*/}
                        {/*        )}*/}
                        {/*</DarkModeWrapper>*/}

                    </div>
                </Header>
                <ContentContainer className="site-layout-background"
                                  darkMode={darkMode}
                                  style={{padding: 24}}>
                    <Switch>
                        <Route exact path={'/'} render={() => <Redirect to={'/login'}/>}/>
                        <Route path={'/form'} render={() => <Contacts/>}/>
                        <Route path={'/pokemons'} render={() => <Pokemons/>}/>
                        <Route path={'/poke/:id'} render={() => <CurrentPoke/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                    </Switch>
                </ContentContainer>
            </Layout>
        </Layout>

    );
}

export default App;


const ContentContainer = styled(Content)`
  transition: all 0.5s ease;
  background: ${props => props.darkMode ? 'black' : 'white'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: ${props => props.darkMode ? 'white' : 'black'};
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
`

const StyledLink = styled(NavLink)`
  margin: 0 10px;
  padding: 0 5px;
  color: inherit;
  text-decoration: none;
`

const DarkModeWrapper = styled.div`
  cursor: pointer;
`

const LoginBtn = styled.div`
  color: ${props => props.darkMode ? 'white' : 'black'};
  text-transform: uppercase;
`