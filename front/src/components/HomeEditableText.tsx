import { stringify } from "querystring";
import React, { Component, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createWork, updateWork } from "../api/auth";
import Edit from './edit_FILL1_wght400_GRAD0_opsz48.png';

interface Props {
    id: number;
    text: string | null;
  }

export const HomeEditableText = (props: Props) => {
    const [editing, setEditing] = useState(false)
    const [input, setInput] = useState(props.text || "")

    const navigate = useNavigate()

    const handleSave = () => {
        const params = {
            name: input
        }
        updateWork(props.id, params)
        setEditing(false)
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
                        <button onClick={() => handleSave()}>保存</button>
                    </div>:
                    <div>
                        <span onClick={() => navigate("/work", { state: { id: props.id}})}>{input}</span>
                        <img src={Edit} onClick={() => setEditing(true)}  height="12px" style={{marginLeft: "8px"}}/>
                    </div>
                }
            </form>
        </div>
    );
}