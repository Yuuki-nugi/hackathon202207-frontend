import { stringify } from "querystring";
import React, { Component, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createParticipants, createWork, updateWork } from "../api/auth";
import GroupAdd from './group_add_FILL1_wght400_GRAD0_opsz48.png'
import styled from "@emotion/styled";

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
            {editing ?
                <FormWrapper>
                    <FormInput onChange={(e) => {
                        setInput(e.target.value)
                    }} type="text" value={input}>
                    </FormInput>
                    <FormBt onClick={() => handleSave()}>
                        <img src={GroupAdd} height="60%"/>
                    </FormBt>
                </FormWrapper>:
                <div>
                    <span>{input}</span>
                    <img src={GroupAdd} onClick={() => setEditing(true)}  height="24px" style={{marginLeft: "8px"}}/>
                </div>
            }
        </div>
    );
}

const FormWrapper = styled.div`
  position: sticky;
  bottom: 0;
  margin-top: auto;
  box-sizing: border-box;
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
  width: 100%;
`

const FormInput = styled.input`
  background: #d2ebf5;
  border: none;
  height: 2.0em;
  width: 80%;
  border-radius: 10px; 
  :focus{
    outline: 0;
  }
`

const FormBt = styled.button`
  cursor: pointer;
  border: none;
  background: #87ceeb;
  color: #fff;
  outline : none;
  height: 2.2em;
  width: 15%;
  border-radius: 10px; 
  right: 0;
  ::-webkit-input-placeholder {
    color: #3879D9;
  }
`