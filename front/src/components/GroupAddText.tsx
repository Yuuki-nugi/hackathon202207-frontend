import { stringify } from "querystring";
import React, { Component, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createParticipants, createWork, updateWork } from "../api/auth";
import GroupAdd from './group_add_FILL1_wght400_GRAD0_opsz48.png'

interface Props {
    id: number;
    setParticipants: (number: number) => void;
  }

export const GroupAddText = (props: Props) => {
    const [editing, setEditing] = useState(false)
    const [input, setInput] = useState("")

    const handleSave = () => {
        const params = {
            email: input,
            workId: props.id
        }
        createParticipants(params).then((res) => {
            if(res.data.status == 422){
                alert(res.data.message);
            }else if(res.status == 200){
                props.setParticipants(res.data.numberOfParticipants)
            }
        }).catch(err => {
            console.log("alart")
        });
        setEditing(false)
        setInput("")
    }

    return (
        <div>
            <form>
                {editing ?
                    <div>
                        <input onChange={(e) => {
                            setInput(e.target.value)
                        }} type="text" value={input}>
                        </input>
                        <button onClick={() => handleSave()}>招待</button>
                    </div>:
                    <div>
                        <span>{input}</span>
                        <img src={GroupAdd} onClick={() => setEditing(true)}  height="24px" style={{marginLeft: "8px"}}/>
                    </div>
                }
            </form>
        </div>
    );
}