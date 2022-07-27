import { stringify } from "querystring";
import React, { Component, useState } from "react"
import { updateTheme } from "../api/auth";
import Edit from './edit_FILL1_wght400_GRAD0_opsz48.png';

interface Props {
    id: number;
    text: string;
    type: string;
  }

export const ThemeEditableText = (props: Props) => {
    const [editing, setEditing] = useState(false)
    const [input, setInput] = useState('')
    console.log(props.text)

    const handleSave = () => {
        const params = {
            theme: {
                [props.type] : input,
                id: props.id
            }
        }
        updateTheme(props.id, params)
        setEditing(false)
    }

    const handleEdit = () => {
        setEditing(true)
        setInput(props.text)
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
                        <span>{props.text}</span>
                        <img src={Edit} onClick={() => handleEdit()}  height="12px" style={{marginLeft: "8px"}}/>
                    </div>
                }
            </form>
        </div>
    );
}