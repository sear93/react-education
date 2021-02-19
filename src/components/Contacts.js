import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import {addNameToContact, addPhoneToContact, getInputsValue} from "../store/appReducer";

const Contacts = () => {

    let contacts = useSelector(state => state.app.contacts)
    let name = useSelector(state => state.app.name)
    let phone = useSelector(state => state.app.phone)
    let dispatch = useDispatch()

    let nameValue = useRef();
    let phoneValue = useRef();

    return (
        <>
            <StyledInput onChange={() => dispatch(addNameToContact(nameValue.current.value))}
                         ref={nameValue}
                         value={name}
                         placeholder="Name"
                         type="text"/>
            <StyledInput onChange={() => dispatch(addPhoneToContact(phoneValue.current.value))}
                         value={phone}
                         ref={phoneValue} type="email"
                         placeholder="Phone"
                         pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
            <input
                onClick={() => dispatch(getInputsValue(nameValue.current.value, phoneValue.current.value))}
                type="submit"
                disabled={!name || !phone}
                value={"ADD CONTACT"}/>
            <h1>Form</h1>
            <div>
                {contacts.map(c => <div key={c.id}>{c.name}: {c.phone}</div>)}
            </div>
        </>
    )
}

export default Contacts;

const StyledInput = styled.input`
  outline: none;
`