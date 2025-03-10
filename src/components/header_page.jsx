import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Import useTranslation

export const Header = () => {
  const { t, i18n } = useTranslation(); // Initialize translation hook
  const [userEmail, setUserEmail] = useState('');
  const [editImage, setEditImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state for image
  const navigate = useNavigate();
  const [isTranslated, setIsTranslated] = useState(false);



  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/admin-image", { cache: "no-store" }) // Prevents cached responses
      .then((response) => {
        setEditImage(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      })
      .finally(() => {
        setIsLoading(false); // Ensure loading is set to false in all cases
      });
  }, []);
  

  // Retrieve user info from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user-info');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser.id; // Ensure the user object contains an 'id'
      if (userId) {
        fetch(`http://localhost:8000/api/user/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.email) {
              setUserEmail(data.email);
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }
    }
  }, []);

  // Handle sidebar toggle
  const handleToggleSidebar = () => {
    document.body.classList.toggle('toggle-sidebar');
  };

  // Handle language change
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode); // Change language using i18n
    const selectElement = document.querySelector("#google_translate_element select");
    if (selectElement) {
      selectElement.value = langCode;
      selectElement.dispatchEvent(new Event("change"));
    }
  };

  // Handle logout
  const logout = (event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    localStorage.removeItem('user-info'); // Remove user info
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="header fixed-top d-flex align-items-center" id="header">
      <div className="d-flex align-items-center justify-content-between ">
        <a className="logo d-flex align-items-center" href="/dashboard">
          {/* <img alt="image" src="assets/img/icon1.png" className="ms-3" /> */}
          <span className="d-none d-lg-block ms-5">{t('admin')}</span> {/* Translated text */}
        </a>
      </div>

      <i className="bi bi-list toggle-sidebar-btn mr-2" onClick={handleToggleSidebar} />
      <div className="search-bar">
        <form action="#" className="search-form d-flex align-items-center" method="POST">
          <input name="query" placeholder={t('search_placeholder')} title={t('search_title')} type="text" />
          <button title={t('search')} type="submit">
            <i className="bi bi-search" />
          </button>
        </form>
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">

          <div id="google_translate_element" style={{ display: 'none' }}></div>

        
          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" 
               data-bs-toggle="dropdown" 
               href="#" 
               role="button" 
               aria-expanded="false">
              <i className="bi bi-globe" style={{color:"#a37f67"}} />
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li>
                <button className="dropdown-item" onClick={() => changeLanguage('en')}>
                  {t('english')} 
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => changeLanguage('th')}>
                  {t('thai')} 
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => changeLanguage('my')}>
                  {t('myanmar')}
                </button>
              </li>
            </ul>
          </li>

        
          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" data-bs-toggle="dropdown" href="#">
              <i className="bi bi-bell" style={{color:"#a37f67"}}/>
              <span className="badge bg-primary badge-number">4</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                {t('notifications_header', { count: 4 })}{' '} 
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">{t('view_all')}</span> 
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning" />
                <div>
                  <h4>{t('notification_title')}</h4>
                  <p>{t('notification_message')}</p> 
                  <p>{t('time_ago', { time: 30 })}</p> 
                </div>
              </li>
            </ul>
          </li>

          {/* Profile Dropdown */}
          <li className="nav-item dropdown pe-3">
            <a className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown" href="#">
              {isLoading ? (
                <span>{t('loading')}</span> 
              ) : (
                editImage.length > 0 ? (
                  <div className="image-item">
                    {editImage.map((image) => (
                      <img
                        key={image.id}
                        src={`http://127.0.0.1:8000/${image.image_path}`}
                        alt="Profile"
                        
                        style={{ borderRadius: "50%",
                         
                        width:"35px",
                        height:"35px",
                        objectFit: "cover"}}
                      />
                    ))}
                  </div>
                ) : (
                  <i className='fa fa-user'></i>
                )
              )}
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6 className="mb-2">{userEmail}</h6>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="/profile">
                  <i className="bi bi-person" />
                  <span>{t('my_profile')}</span> {/* Translated text */}
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="faq">
                  <i className="bi bi-question-circle" />
                  <span>{t('need_help')}</span> {/* Translated text */}
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#" onClick={logout}>
                  <i className="bi bi-box-arrow-right" />
                  <span>{t('log_out')}</span> {/* Translated text */}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;