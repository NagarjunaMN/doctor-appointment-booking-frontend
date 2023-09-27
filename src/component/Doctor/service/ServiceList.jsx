import React, { useState, useContext, useCallback, useEffect } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'


function ServiceList() {
  const [services,setServices] = useState([])
  const context = useContext(AuthContext)
  const token = context.token
  const currentUser = context.currentUser

  const initValue = useCallback(() => {
    const readValue = async () => {
      await axios.get(`/api/service/all`,{
        headers: {
          Authorization: `${token}`
        }
      }).then(res => {
          let data = res.data.services.filter((item) => item.doc_id === currentUser._id)
          setServices(data)
      }).catch(err => toast.error(err.response.data.msg))
    }
    readValue()
  },[])

  useEffect(() => {
    initValue()
  },[])
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 mt-5">
            <NavLink to={'/doctor/service/add'} className="btn btn-outline-success float-end">Add Service</NavLink>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
            <h3 className="display-3 text-success">Service List</h3>
        </div>
      </div>
    </div>
  )
}

export default ServiceList
