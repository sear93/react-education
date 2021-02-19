import React, {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {login} from "../store/appReducer";
// import styled from 'styled-components';
import {Redirect} from 'react-router-dom'

const Swapi = () => {

    // useEffect(() => {
    //     axios.get(`https://swapi.dev/api/films/`).then(response => {
    //         console.log(response.data.results)
    //     })
    // }, [])

    let dispatch = useDispatch();
    let auth = useSelector(state => state.app.auth)

    const {register, handleSubmit, watch, errors} = useForm();
    const onSubmit = data => {
        let {email, password} = data
        dispatch(login(email, password))
    }

    // console.log(watch("email")); // watch input value by passing the name of it

    return (
        <>{!auth.isAuth
            ? (
                <>
                    <h1>Its Login Page</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <input type={"email"} name="email" ref={register}/>
                        </div>
                        <div>
                            <input type={"password"} name="password" ref={register({required: true})}/>
                        </div>
                        <div>
                            {errors.password && <span>This field is required</span>}
                        </div>

                        <input type="submit"/>
                    </form>
                </>
            )
            : (
                // <h1>You are already authorized</h1>
                <Redirect to="/pokemons" />
            )
        }

        </>
    )
};

export default Swapi;

