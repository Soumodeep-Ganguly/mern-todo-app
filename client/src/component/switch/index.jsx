import React, { useState } from 'react';
import './index.scss';

export default function Switch(props) {
    return (
        <label className={`switch ${props.variant} ${props.checked ? 'checked' : ''}`} style={props.style}> {/* variant [dark | primary] */}
            <input type="checkbox" checked={props.checked} onChange={() => props.onChange(!props.checked)} />
            <span className="slider"></span>
        </label>
    );
}