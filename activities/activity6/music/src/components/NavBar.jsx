import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className='navbar navbar-expanded-lg navbar-light bg-light'>
            <span className='navbar-brand' href='#'>
                My Music
            </span>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                <div className='navbar-nav'>
                    <span className='nav-item nav-link' href='#'>
                        <Link to='/'>Main</Link>
                    </span>
                    <span className='nav-item nav-link' href='#'>
                        <Link to='/new'>New</Link>
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
