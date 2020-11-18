import React, { useState } from 'react';
import styled from "styled-components";

const Input = styled.input``

const Dimensions = ({ data, onChange }) => {



    const inputChange = (attr) => {
        const obj = {};
        return e => {
            obj[attr] = parseInt(e.target.value);
            const out = { ...data, ...obj };
            console.log(out);
            onChange(out)
        }
    }

    return (
        <>
            <Input value={data.width} onChange={inputChange('width')} />
            <button >{data.ratioLocked ? "locked" : "unlocked"}</button>
            <Input value={data.height} onChange={inputChange('height')} />
        </>
    );
}

const Settings = ({ settings, onChange }) => {
    // console.log(settings);
    const { ratioLocked, width, height } = settings;
    return (
        <div>
            <Dimensions data={{ width, height, ratioLocked }} onChange={(d) => console.log(d)} />
        </div>);
}

export default Settings;