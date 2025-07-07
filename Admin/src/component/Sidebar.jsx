import add_icon from '../assets/add_icon.png'
import order from '../assets/order_icon.png'
import {NavLink} from 'react-router-dom'
import './Sidebar.css'
export const Sidebar = () => {
  return (
    <div className='sidebar'>
        <NavLink to='/add' className={({ isActive }) => isActive ? 'sidebar-comp active' : 'sidebar-comp'}>
           
            <img src={add_icon} />
            <p>Add Food</p>
          
        </NavLink>
        <NavLink to='/list' className={({ isActive }) => isActive ? 'sidebar-comp active' : 'sidebar-comp'}>
           
            <img src={order} />
            <p>List Food</p>
            
        </NavLink>
        <NavLink to='/order' className={({ isActive }) => isActive ? 'sidebar-comp active' : 'sidebar-comp'}>
            
            <img src={order} />
            <p>Order Food</p>
          
        </NavLink>
   
    </div>
   
  )
}
