import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Sider = () => {
  const { t, i18n } = useTranslation(); // Initialize the translation hook
  const navigate = useNavigate(); // Create navigate function
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Add state for selected language

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang); // Update selected language in the current tab
    i18n.changeLanguage(lang); // Change the language globally using i18n
    
    // Construct the URL with the language query parameter
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("lang", lang); // Add or update the lang parameter
    
    // Update the current URL without reloading the page
    window.history.pushState({}, "", `${window.location.pathname}?${currentParams.toString()}`);
  };

  return (
    <aside className="sidebar" id="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate('/dashboard')}>
            <i className="bi bi-grid" />
            <span>{t('dashboard')}</span>
          </a>
        </li>


        <li className="nav-item">
          <a
            className="nav-link"
            onClick={() => navigate(`/vendor-levels/?lang=${selectedLanguage}`)} // Use the selected language
          >
            <i className="bi bi-menu-button-wide" />
            <span>{t('vendor_level')}</span>
          </a>
        </li>

        
        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate(`/all_business/?lang=${selectedLanguage}`)}>
            <i className="bi bi-menu-button-wide" />
            <span>{t('business_type')}</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate('/category')}>
            <i className="bi bi-tags" />
            <span>{t('category')}</span>
          </a>
        </li>


        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate('/vendors')}>
            <i className="bi bi-person" />
            <span>{t('vendor')}</span>
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#product-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-box-seam" />
            <span>{t('product')}</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul className="nav-content collapse" data-bs-parent="#sidebar-nav" id="product-nav">
            <li>
              <a onClick={() => navigate('/add_product')}>
                <i className="bi bi-circle" />
                <span>{t('add_product')}</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate('/all_products')}>
                <i className="bi bi-circle" />
                <span>{t('all_products')}</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#brand-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-gem" />
            <span>{t('brand')}</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul className="nav-content collapse" data-bs-parent="#sidebar-nav" id="brand-nav">
            <li>
              <a onClick={() => navigate('/add_brand')}>
                <i className="bi bi-circle" />
                <span>{t('add_brand')}</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate('/all_brands')}>
                <i className="bi bi-circle" />
                <span>{t('all_brands')}</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#store-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-shop" />
            <span>{t('store')}</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul className="nav-content collapse" data-bs-parent="#sidebar-nav" id="store-nav">
            <li>
              <a onClick={() => navigate('/add_store')}>
                <i className="bi bi-circle" />
                <span>{t('add_store')}</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate('/all_stores')}>
                <i className="bi bi-circle" />
                <span>{t('all_stores')}</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#order-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-cart" />
            <span>{t('order')}</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul className="nav-content collapse" data-bs-parent="#sidebar-nav" id="order-nav">
            <li>
              <a onClick={() => navigate('/add_order')}>
                <i className="bi bi-circle" />
                <span>{t('add_order')}</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate('/all_orders')}>
                <i className="bi bi-circle" />
                <span>{t('all_orders')}</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate('/shipping')}>
            <i className="bi bi-truck" />
            <span>{t('shipping')}</span>
          </a>
        </li>



       


        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#coupon-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-gift" />
            <span>{t('coupon')}</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul className="nav-content collapse" data-bs-parent="#sidebar-nav" id="coupon-nav">
            <li>
              <a onClick={() => navigate('/add_coupon')}>
                <i className="bi bi-circle" />
                <span>{t('add_coupon')}</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate('/all_coupons')}>
                <i className="bi bi-circle" />
                <span>{t('all_coupons')}</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate('/points')}>
            <i className="bi bi-pin" />
            <span>{t('points')}</span>
          </a>
        </li>
        
        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate(`/currency/?lang=${selectedLanguage}`)}>
            <i className="bi bi-cash" />
            <span>{t('currency')}</span>
          </a>
        </li>



        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate('/wallet')}>
            <i className="bi bi-wallet" />
            <span>{t('wallet')}</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate('/reviews')}>
            <i className="bi bi-star" />
            <span>{t('reviews')}</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sider;
