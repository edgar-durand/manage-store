import React from 'react';

export default (props) => {
    const { profile_small, name } = props;
    // const ul = React.createRef();

    // const actionDropDown = (e) => {
    //     e.preventDefault();
    //     ul.current.classList.toggle('show');
    // };
    // const hideDropDown = (e) => {
    //     setTimeout(() => {
    //         ul.current.classList.remove('show');
    //     }, 100);
    // };

    return (
        <li className='nav-header'>
            <div className='dropdown profile-element' style={{ textAlign: 'center' }}>
                <img style={{ width: '60px', height: '60px' }} alt="" className='rounded-circle' src={profile_small} />
                <a style={{ cursor: 'default' }} data-toggle='dropdown' className='dropdown-toggle' href="#!" onClick={(e) => e.preventDefault()}>
                    <span className='block m-t-xs font-bold'>{name}</span>
                    {/* <span className='text-muted text-xs block'>
                        {description} <b className='caret'></b>
                    </span> */}
                </a>
                {/*<ul ref={ul} className='dropdown-menu animated fadeInRight m-t-xs'>
                    <li>
                        <Link className='dropdown-item' to='/profile'>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link className='dropdown-item' to='/contacts'>
                            Contacts
                        </Link>
                    </li>
                    <li>
                        <Link className='dropdown-item' to='/mailbox'>
                            Mailbox
                        </Link>
                    </li>
                    <li className='dropdown-divider'></li>
                    <li>
                        <Link className='dropdown-item' to='/'>
                            Logout
                        </Link>
                    </li>
                </ul> */}
            </div>
            <div className='logo-element'>{name.substring(0, 2)}</div>
        </li>
    );
};