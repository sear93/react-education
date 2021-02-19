import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setFetching, setPokes} from "../store/appReducer";
import Loader from "../utils/Loader";
import {NavLink} from "react-router-dom";

const Pokemons = () => {

    useEffect(() => {
        dispatch(setFetching(true))
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=150').then(response => {
            dispatch(setPokes(response.data.results))
            dispatch(setFetching(false))
        })
    }, [])

    let pokes = useSelector(state => state.app.pokes)
    let dispatch = useDispatch();

    if (!pokes) return <Loader/>

    return (
        <>
            <h3>Pokemons</h3>
            {pokes.map((poke, i) => {
                return (
                    <div key={i}>
                        <NavLink style={{color: "inherit", textTransform: "uppercase"}} to={`/poke/${i + 1}/`}>
                            <h4>{poke.name}</h4>
                        </NavLink>
                    </div>
                )
            })}
        </>
    )
};

export default Pokemons