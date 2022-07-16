import { stringify } from "querystring";
import React, { Component, useState } from "react"
import { updateTheme } from "../api/auth";
import Edit from './edit_FILL1_wght400_GRAD0_opsz48.png';

interface Props {
    id: number;
    text: string | null;
    type: string;
  }

export const ThemeEditableText = (props: Props) => {
    const [editing, setEditing] = useState(false)
    const [input, setInput] = useState(props.text || "")

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
                        <span>{input}</span>
                        <img src={Edit} onClick={() => setEditing(true)}  height="12px" style={{marginLeft: "8px"}}/>
                    </div>
                }
            </form>
        </div>
    );
}