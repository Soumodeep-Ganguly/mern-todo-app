import React from 'react'
import './index.scss'

export default function SubNav(props) {
    return (
        <div className={`subnavContainer ${props.type}`}>
            {props.menuItems?.map((item, _i) => (
                <div 
                    key={_i}
                    onClick={() => props.onChange(item)}
                    className={`subnavItem ${item.title === props.selected && "active"}`}
                >
                    {item?.icon && <div className='icon'>
                        {item?.icon}
                    </div>}
                    <div className='title'>
                        {item?.title}
                    </div>
                </div>
            ))}
        </div>
    )
}
