import React from 'react'
import { PulseLoader } from 'react-spinners'
import logo from '../../assets/udacity.svg'

const Loader = () => {
    return (
        <div className="loader">
            <div className="d-flex h-100">
                <div className="align-self-center mx-auto text-center">
                    <div className="col-12">
                        <img src={ logo }
                             alt="Udacity logo"
                             className="logo"
                             height="42" width="42"/>
                    </div>

                    <div className="row text-uppercase mt-2">
                        <span className="col-12 title">My Reads</span>
                        <span className="col sub-title">@Alan Mortoni</span>
                    </div>

                    <PulseLoader color={'#f95c3c'} />
                </div>
            </div>
        </div>
    )
}

export default Loader
