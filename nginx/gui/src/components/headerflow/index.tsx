import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LIFECYCLE } from '../../utils';
import './style.scss';

interface HeaderflowProps {
  check: boolean
}

const Headerflow: React.FC<HeaderflowProps> = ({ check }) => {

  return (
    <div className='header-flow-item'>
      <NavLink activeClassName='link-focused' className={'header-flow-item-list'} to="/home">Home</NavLink>
      <NavLink activeClassName="link-focused" className={'header-flow-item-list'} to='/contact'>Contact Us</NavLink>
      <NavLink activeClassName='link-focused' className={'header-flow-item-list'} to='/howwehelp'>How we help</NavLink>
      <NavLink activeClassName='link-focused' className={'header-flow-item-list'} to='/whywehelp'>Why we help</NavLink>
      <NavLink activeClassName='link-focused' className={'header-flow-item-list'} to='/faq'>FAQ</NavLink>
      {LIFECYCLE !== 'prod' ? (
        <NavLink activeClassName='link-focused' className={'header-flow-item-list'} to='/testimonials'>Testimonials</NavLink>
      ) : null}
    </div >
  )
}

export default Headerflow