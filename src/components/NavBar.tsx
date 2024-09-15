import { Component } from 'react';
import { Link } from 'react-router-dom';

interface NavBarProps {
  categories: string[];
}

class NavBar extends Component<NavBarProps> {
  render() {
    const { categories } = this.props;

    return (
      <div>
        <nav className='navbar fixed-top navbar-expand-lg navbar-dark bg-dark'>
          <div className='container-fluid'>
            <Link className='navbar-brand' to='/'>
              NewsMonkey
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                {categories.map((category) => (
                  <li className='nav-item' key={category}>
                    <Link
                      to={category === 'general' ? '/' : `/${category}`}
                      className='nav-link'
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}{' '}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
