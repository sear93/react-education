import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNameToContact, addPhoneToContact, getInputsValue} from "../store/appReducer";
import {Input, Button, Divider} from 'antd';

const Contacts = () => {

    let contacts = useSelector(state => state.app.contacts)
    let name = useSelector(state => state.app.name)
    let phone = useSelector(state => state.app.phone)
    let dispatch = useDispatch()

    return (
        <>
            <Divider>Form</Divider>
            <Input onChange={(e) => dispatch(addNameToContact(e.target.value))}
                   value={name}
                   style={{margin: "10px 0"}}
                   placeholder="Name"
                   type="text"/>
            <Input onChange={(e) => dispatch(addPhoneToContact(e.target.value))}
                   value={phone}
                   placeholder="Phone"
            />
            <Button onClick={() => dispatch(getInputsValue(name, phone))}
                    style={{margin: "20px 0"}}
                    type="primary"
                    disabled={!name || !phone}>ADD CONTACT</Button>
            <div>
                {contacts.map(c => <div key={c.id}>{c.name}: {c.phone}</div>)}
            </div>
        </>
    )
}

export default Contacts;