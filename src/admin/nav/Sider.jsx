import React from 'react'

export const Sider = () => {
  return (
    <aside className="sidebar" id="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link " href="/admindashboard">
            <i className="bi bi-grid" />
            <span>Dashboard</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href='/adminvendorlevel'>
            <i className="bi bi-menu-button-wide" />
            <span>Vendor Level</span>
           
          </a>
          
        </li>



        <li className="nav-item">
          <a className="nav-link" href="/adminbusiness"> 
            <i className="bi bi-menu-button-wide" />
            <span>Business Type</span>
            
          </a>
          
        </li>

        <li className="nav-item">
          <a className="nav-link" href="admincategory">
            <i className="bi bi-tags" /> {/* Bootstrap Icon */}
            <span>Category</span>
          </a>
        </li>


        <li className="nav-item">
          <a className="nav-link" href="vendors">
            <i className="bi bi-person" /> {/* Bootstrap Icon */}
            <span>Vendor</span>
          </a>
        </li>



        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#product-nav"
            data-bs-toggle="collapse"
            href="">
            <i className="bi bi-box-seam" /> {/* Bootstrap icon for product */}
            <span>Product</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul className="nav-content collapse" data-bs-parent="#sidebar-nav" id="product-nav">
            <li>
              <a href="add_product">
                <i className='bi bi-circle' />
                <span>Add Product</span>
              </a>
            </li>
            <li>
              <a href="all_products">
                <i className='bi bi-circle' />
                <span>All Products</span>
              </a>
            </li>
          </ul>
        </li>


        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#brand-nav"
            data-bs-toggle="collapse"
            href="">
            <i className="bi bi-gem" /> {/* Bootstrap icon for product */}
            <span>Brand</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul className="nav-content collapse" data-bs-parent="#sidebar-nav" id="brand-nav">
            <li>
              <a href="add_brand">
                <i className='bi bi-circle' />
                <span>Add Brand</span>
              </a>
            </li>
            <li>
              <a href="all_brands">
                <i className='bi bi-circle' />
                <span>All Brands</span>
              </a>
            </li>
          </ul>
        </li>



        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#store-nav"
            data-bs-toggle="collapse"
            href="">
            <i className="bi bi-shop" /> {/* Bootstrap icon for product */}
            <span>Store</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul className="nav-content collapse" data-bs-parent="#sidebar-nav" id="store-nav">
            <li>
              <a href="add_brand">
                <i className='bi bi-circle' />
                <span>Add Store</span>
              </a>
            </li>
            <li>
              <a href="all_brands">
                <i className='bi bi-circle' />
                <span>All Stores</span>
              </a>
            </li>
          </ul>
        </li>


        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#order-nav"
            data-bs-toggle="collapse"
            href="">
            <i className="bi bi-cart" /> {/* Bootstrap icon for product */}
            <span>Order</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul className="nav-content collapse" data-bs-parent="#sidebar-nav" id="order-nav">
            <li>
              <a href="add_order">
                <i className='bi bi-circle' />
                <span>Add Order</span>
              </a>
            </li>
            <li>
              <a href="all_orders">
                <i className='bi bi-circle' />
                <span>All Orders</span>
              </a>
            </li>
          </ul>
        </li>


        <li className="nav-item">
          <a className="nav-link" href="shipping">
            <i className="bi bi-truck" /> {/* Bootstrap Icon */}
            <span>Shipping</span>
          </a>
        </li>


        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#coupon-nav"
            data-bs-toggle="collapse"
            href="">
            <i className="bi bi-gift" /> {/* Bootstrap icon for product */}
            <span>Coupon</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul className="nav-content collapse" data-bs-parent="#sidebar-nav" id="coupon-nav">
            <li>
              <a href="add_coupon">
                <i className='bi bi-circle' />
                <span>Add Coupon</span>
              </a>
            </li>
            <li>
              <a href="all_coupons">
                <i className='bi bi-circle' />
                <span>All Coupons</span>
              </a>
            </li>
          </ul>
        </li>




        <li className="nav-item">
          <a className="nav-link" href="points">
            <i className="bi bi-pin" /> {/* Bootstrap Icon */}
            <span>Points</span>
          </a>
        </li>



        <li className="nav-item">
          <a href="wallet.html" className="nav-link">
            <i className="bi bi-wallet" /> {/* Wallet icon */}
            <span>Wallet</span>
          </a>
        </li>


        <li className="nav-item">
          <a href="faq.html" className="nav-link">
            <i className="bi bi-question-circle" /> {/* FAQ icon */}
            <span>FAQ</span>
          </a>
        </li>


        <li className="nav-item">
          <a href="reviews.html" className="nav-link">
            <i className="bi bi-star" /> {/* Review icon */}
            <span>Reviews</span>
          </a>
        </li>









      </ul>
    </aside>


  );
}
export default Sider;
