import React from 'react'
import logo from '../../assets/udacity.svg'

const Header = () => {
    return(
        <div className="header">
            <div className="col-12 text-center">
                <img src={ logo }
                     alt="Udacity logo"
                     className="logo"
                     height="42" width="42"/>
            </div>
        </div>
    )
}

export default Header
