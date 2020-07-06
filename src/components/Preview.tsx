import React from 'react'
import { NavLink } from 'react-router-dom'

export const Preview = () => {
    return (
        <div>
            <h1 className="center-align">CRM-system</h1>
            <hr/>
            <NavLink to="/login">Login</NavLink>
            <br/>
            <NavLink to="/register">Register</NavLink>
        </div>
    )    
}