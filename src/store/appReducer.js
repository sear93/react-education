// Action Types

import axios from "axios";

let GET_INPUT_VALUE = "GET_INPUT_VALUE";
let ADD_NAME_TO_CONTACT = "ADD_NAME_TO_CONTACT";
let ADD_PHONE_TO_CONTACT = "ADD_PHONE_TO_CONTACT";
let SET_FILMS = "SET_FILMS";
let SET_FETCHING = "SET_FETCHING";
let SET_POKES = "SET_POKES";
let SET_CURRENT_POKE = "SET_CURRENT_POKE";
let SET_DARKMODE = "SET_DARKMODE";
let SET_USER_DATA = "SET_USER_DATA";
let GET_CAPTCHA_URL = "GET_CAPTCHA_URL";
let INITIALIZED = "INITIALIZED";

// State

let initialState = {
    isLoading: true,
    initialized: false,
    name: '',
    phone: '',
    isDarkMode: false,
    contacts: [],
    pokes: null,
    films: null,
    currentPoke: null,
    auth: {
        id: null,
        login: null,
        email: null,
        isAuth: false,
        message: null
    },
    captcha: null
}

// Reducer

export let appReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INPUT_VALUE:
            return {
                ...state,
                contacts: [...state.contacts,
                    {name: action.fullName, phone: action.phoneNumber, id: state.contacts.length + 1},
                ],
                name: '',
                phone: ''
            }
        case ADD_NAME_TO_CONTACT:
            return {
                ...state,
                name: action.value,
            }
        case ADD_PHONE_TO_CONTACT:
            return {
                ...state,
                phone: action.value
            }
        case SET_FILMS:
            return {
                ...state,
                films: action.films
            }
        case SET_POKES:
            return {
                ...state,
                pokes: action.pokes
            }
        case SET_FETCHING:
            return {
                ...state,
                isLoading: action.isFetching
            }
        case SET_CURRENT_POKE:
            return {
                ...state,
                currentPoke: action.current
            }
        case SET_DARKMODE:
            return {
                ...state,
                isDarkMode: action.isDark
            }
        case SET_USER_DATA:
            return {
                ...state,
                auth: {...action.payload}
            }
        case GET_CAPTCHA_URL:
            return {
                ...state,
                captcha: action.captchaUrl
            }
        case INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

// Action Creators

export const getInputsValue = (fullName, phoneNumber) => {
    return ({
        type: GET_INPUT_VALUE,
        fullName,
        phoneNumber
    })
}

export const addNameToContact = (value) => {
    return ({
        type: ADD_NAME_TO_CONTACT,
        value
    })
}

export const addPhoneToContact = (value) => {
    return ({
        type: ADD_PHONE_TO_CONTACT,
        value
    })
}

export const setPokes = (pokes) => {
    return ({
        type: SET_POKES,
        pokes
    })
}

export const setFilms = (films) => {
    return ({
        type: SET_FILMS,
        films
    })
}

export const setFetching = (isFetching) => {
    return ({
        type: SET_FETCHING,
        isFetching
    })
}

export const setCurrentPoke = (current) => {
    return ({
        type: SET_CURRENT_POKE,
        current
    })
}

export const setDarkMode = (isDark) => {
    return ({
        type: SET_DARKMODE,
        isDark
    })
}
export const setUserData = (id, login, email, isAuth, message) => {
    return ({
        type: SET_USER_DATA,
        payload: {id, login, email, isAuth, message}
    })
}

export const getCaptchaUrl = (captchaUrl) => {
    return ({
        type: GET_CAPTCHA_URL,
        captchaUrl
    })
}

export const initialized = () => {
    return ({
        type: INITIALIZED,
    })
}

// Thunk Creators

export const getUserData = () => async (dispatch) => {
    const response = await axios.get('https://social-network.samuraijs.com/api/1.0/auth/me',
        {
            withCredentials: true,
            headers: {
                'API-KEY': '061b4bd5-ac47-4096-a48a-4b53dc2f1cfc'
            }
        })

    if (response.data.resultCode === 0) {
        const {id, email, login} = response.data.data;
        dispatch(setUserData(id, login, email, true, null))
    }
}

export const login = (email, password, rememberMe, message, captcha) => async (dispatch) => {
    try {
        const response = await axios.post('https://social-network.samuraijs.com/api/1.0/auth/login',
            {email, password, rememberMe, message, captcha},
            {
                withCredentials: true, headers: {'API-KEY': '061b4bd5-ac47-4096-a48a-4b53dc2f1cfc'}
            })

        if (response.data.resultCode === 0) {
            dispatch(getUserData())
            dispatch(getCaptchaUrl(null))
        } else if (response.data.resultCode === 10) {
            dispatch(getCaptchaThunk())
            const message = response.data.messages[0]
            dispatch(setUserData(null, null, null, false, message))
        } else {
            const message = response.data.messages[0]
            dispatch(setUserData(null, null, null, false, message))
        }
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => async (dispatch) => {
    try {
        const response = await axios.delete('https://social-network.samuraijs.com/api/1.0/auth/login', {withCredentials: true})
        if (response.data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false, null))
        }
    } catch (error) {
        console.log(error)
    }
}

export const getCaptchaThunk = () => async (dispatch) => {
    try {
        const response = await axios.get('https://social-network.samuraijs.com/api/1.0/security/get-captcha-url', {withCredentials: true})
        dispatch(getCaptchaUrl(response.data.url))
    } catch (error) {
        console.log(error)
    }
}

export const initializedSuccess = () => async (dispatch) => {
    try {
        await dispatch(getUserData())
        await dispatch(initialized())
    } catch (error) {
        console.log(error)
    }
}