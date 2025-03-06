import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {

  /* Handle ToggleSidebar */
  const handleToggleSidebar = () => {
    document.body.classList.toggle('toggle-sidebar');
  };


  const navigate = useNavigate();  // Initialize navigate for redirecting

  const logout = (event) => {
    event.preventDefault();  // Prevent the default anchor behavior

    // Remove user info from localStorage to log out
    localStorage.removeItem('user-info');

    // Redirect to the login page
    navigate('/admin_login');
  };
  return (
    <header className="header fixed-top d-flex align-items-center" id="header">
      <div className="d-flex align-items-center justify-content-between ">
        <a className="logo d-flex align-items-center" href="/dashboard">
          <img alt="" src="assets/img/icon1.png" className='ms-3' />
          <span className="d-none d-lg-block ms-3">Admin</span>
        </a>

      </div>
      <i className="bi bi-list toggle-sidebar-btn mr-2" onClick={handleToggleSidebar} />
      <div className="search-bar">
        <form action="#" className="search-form d-flex align-items-center" method="POST">
          <input name="query" placeholder="Search" title="Enter search keyword" type="text" />
          <button title="Search" type="submit">
            <i className="bi bi-search" />
          </button>
        </form>
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search" />
            </a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" data-bs-toggle="dropdown" href="#">
              <i className="bi bi-bell" />
              <span className="badge bg-primary badge-number">4</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning" />
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-x-circle text-danger" />
                <div>
                  <h4>Atque rerum nesciunt</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>1 hr. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-check-circle text-success" />
                <div>
                  <h4>Sit rerum fuga</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>2 hrs. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-info-circle text-primary" />
                <div>
                  <h4>Dicta reprehenderit</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>4 hrs. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" data-bs-toggle="dropdown" href="#">
              <i className="bi bi-chat-left-text" />
              <span className="badge bg-success badge-number">3</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              <li className="dropdown-header">
                You have 3 new messages
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="message-item">
                <a href="#">
                  <img
                    alt=""
                    className="rounded-circle"
                    src="assets/img/messages-1.jpg"
                  />
                  <div>
                    <h4>Maria Hudson</h4>
                    <p>
                      Velit asperiores et ducimus soluta repudiandae labore officia
                      est ut...
                    </p>
                    <p>4 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="message-item">
                <a href="#">
                  <img
                    alt=""
                    className="rounded-circle"
                    src="assets/img/messages-2.jpg"
                  />
                  <div>
                    <h4>Anna Nelson</h4>
                    <p>
                      Velit asperiores et ducimus soluta repudiandae labore officia
                      est ut...
                    </p>
                    <p>6 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="message-item">
                <a href="">
                  <img
                    alt=""
                    className="rounded-circle"
                    src="assets/img/messages-3.jpg"
                  />
                  <div>
                    <h4>David Muldon</h4>
                    <p>
                      Velit asperiores et ducimus soluta repudiandae labore officia
                      est ut...
                    </p>
                    <p>8 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-footer">
                <a href="#">Show all messages</a>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              data-bs-toggle="dropdown"
              href="#">
              <img
                alt="Profile"
                className="rounded-circle"
                src="assets/img/profile-img.jpg"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                K. Anderson
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>Kevin Anderson</h6>
                <span>Web Designer</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html">
                  <i className="bi bi-person" />
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html">
                  <i className="bi bi-gear" />
                  <span>Account Settings</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="pages-faq.html">
                  <i className="bi bi-question-circle" />
                  <span>Need Help?</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#" onClick={logout}>
                  <i className="bi bi-box-arrow-right" />
                  <span>Log Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>

  )
};

export default Header;