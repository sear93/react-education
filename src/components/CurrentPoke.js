import React, {useEffect} from "react";
import axios from "axios";
import {setCurrentPoke, setFetching} from "../store/appReducer";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../utils/Loader";
import {useParams} from "react-router";
import {Divider} from "antd";

const CurrentPoke = () => {

    let currentPoke = useSelector(state => state.app.currentPoke)
    // let isLoading = useSelector(state => state.app.isLoading)
    let dispatch = useDispatch();

    let params = useParams();

    useEffect(() => {
        dispatch(setFetching(true))
        axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}/`).then(response => {
            dispatch(setCurrentPoke(response.data))
            dispatch(setFetching(false))
        })
    }, [])

    if (!currentPoke) return <Loader/>

    return (
        <>
            <Divider>Current Poke</Divider>
            <div>
                <h1 style={{textAlign: "center", textTransform: "uppercase"}}>{currentPoke.species.name}</h1>
                <img style={{width: 500}}
                     src={`https://pokeres.bastionbot.org/images/pokemon/${params.id}.png`}
                     alt={params.id}/>
            </div>
        </>
    )
};

export default CurrentPoke;