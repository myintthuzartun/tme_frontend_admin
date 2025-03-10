import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "../components/header_page";
import Sider from "../components/sider";
import BackToTop from "../components/back_to_top";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const Currency = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "en"; // Get the language from the URL
  const [selectedLanguage, setSelectedLanguage] = useState(lang);
  const [currencies, setCurrencies] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("mmk");
  const [convertedValue, setConvertedValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newCurrencyName, setNewCurrencyName] = useState("");
  const [message, setMessage] = useState("");

  // Language options
  const languages = [
    { value: "en", label: "English" },
    { value: "myan", label: "မြန်မာ" },
    { value: "thai", label: "ไทย" },
  ];

  // Currency options
  const currencyOptions = [
    { value: "usd", label: "USD" },
    { value: "mmk", label: "MMK" },
    { value: "thb", label: "THB" },
  ];

  // Update i18n language when the component mounts
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  // Handle language change
  const handleLanguageChange = (lng) => {
    console.log("Selected Language:", lng); // Debugging
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng);

    // Open a new tab with the selected language as a query parameter
    const newTabUrl = `${window.location.pathname}?lang=${lng}`;
    window.open(newTabUrl, "_blank");
    window.location.reload(); // Reload the current page to apply the new language
  };

  // Fetch currency data
  const fetchCurrencyData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/currency");
      if (response.data.length > 0) {
        setCurrencies(response.data);
        updateConvertedValue(quantity, fromCurrency, toCurrency, response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
      setMessage(t("error_fetching_data"));
    }
  };

  // Update converted value
  const updateConvertedValue = (quantity, fromCurrency, toCurrency, latestRate) => {
    const rates = {
      usd: 1,
      mmk: latestRate.myan_currency,
      thb: latestRate.thai_exchange_rate,
    };

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    setConvertedValue((quantity * toRate) / fromRate);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setQuantity(value);
    if (currencies.length > 0) {
      updateConvertedValue(value, fromCurrency, toCurrency, currencies[0]);
    }
  };

  // Handle "from" currency change
  const handleFromCurrencyChange = (e) => {
    const value = e.target.value;
    setFromCurrency(value);
    if (currencies.length > 0) {
      updateConvertedValue(quantity, value, toCurrency, currencies[0]);
    }
  };

  // Handle "to" currency change
  const handleToCurrencyChange = (e) => {
    const value = e.target.value;
    setToCurrency(value);
    if (currencies.length > 0) {
      updateConvertedValue(quantity, fromCurrency, value, currencies[0]);
    }
  };

  // Handle adding a new currency
  const handleAddCurrency = async () => {
    if (!newCurrencyName.trim()) {
      setMessage(t("currency_name_required"));
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/currency", { name: newCurrencyName });
      setMessage(t("currency_added_successfully"));
      setShowModal(false);
      setNewCurrencyName("");
      // Refresh currency data
      await fetchCurrencyData();
    } catch (error) {
      console.error("Error adding currency:", error);
      setMessage(t("error_adding_currency"));
    }
  };

  // Fetch data on component mount and when quantity changes
  useEffect(() => {
    fetchCurrencyData();
  }, [quantity, fromCurrency, toCurrency]);

  return (
    <>
      <Header />
      <Sider />
      <motion.main
        id="main"
        className="main"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pagetitle">
          <h1>{t("currency_exchange")}</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">{t("home")}</a>
              </li>
              <li className="breadcrumb-item active">{t("currency_exchange")}</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row w-100 justify-content-center">
            <div className="col-lg-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  {/* Language Selection */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="language-options d-flex align-items-center gap-2 mt-4">
                      <FaGlobe />
                      <h6 className="mt-2 fw-bold">{t("choose_language")}</h6>
                      {languages.map((language) => (
                        <button
                          key={language.value}
                          className={`btn btn-sm ${selectedLanguage === language.value ? "btn-primary" : "btn-outline-primary"
                            }`}
                          onClick={() => handleLanguageChange(language.value)}
                          style={{
                            backgroundColor: selectedLanguage === language.value ? "#e3d2b9" : "transparent",
                            borderColor: selectedLanguage === language.value ? "#e3d2b9" : "#007bff",
                            color: selectedLanguage === language.value ? "#000" : "#007bff",
                          }}
                        >
                          {language.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Field and Currency Selection */}
                  <div className="row">
                    <div className="col-md-4">
                      <label>
                       {t("Enter_amount")}:
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="form-control border border-primary mt-4"
                      />
                    </div>
                    <div className="col-md-4">
                      <label>{t("from")}:</label>
                      <select
                        className="form-control border border-primary mt-4"
                        value={fromCurrency}
                        onChange={handleFromCurrencyChange}
                      >
                        {currencyOptions.map((currency) => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label>{t("to")}:</label>
                      <select
                        className="form-control border border-primary mt-4"
                        value={toCurrency}
                        onChange={handleToCurrencyChange}
                      >
                        {currencyOptions.map((currency) => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Converted Value */}
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <h3>{t("converted_value")}</h3>
                      <p>
                        {quantity} {t(fromCurrency)} = {convertedValue.toFixed(2)} {t(toCurrency)}
                      </p>
                    </div>
                  </div>

                  {/* Exchange Rates Table */}
                  <h3 className="mt-4">{t("current_exchange_rates")}</h3>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>{t("usd")}</th>
                        <th>{t("myanmar_kyat")}</th>
                        <th>{t("thai_baht")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currencies.map((currency, index) => (
                        <tr key={index}>
                          <td>1 {t("usd")}</td>
                          <td>{currency.myan_currency} {t("myanmar_kyat")}</td>
                          <td>{currency.thai_exchange_rate} {t("thai_baht")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Add Currency Button */}
                  <button
                    className="btn d-flex align-items-center shadow-sm mt-4"
                    onClick={() => setShowModal(true)}
                    style={{
                      backgroundColor: "#e3d2b9",
                      borderColor: "#c2a98d",
                      color: "#2e2e2e",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      padding: "10px 15px",
                    }}
                  >
                    <i className="fa fa-plus me-2"></i> {t("add_currency")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      {/* Add Currency Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#e3d2b9" }}>
                <h5 className="modal-title" style={{ color: "#5a4633" }}>{t("add_currency")}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control" placeholder={t("currency_name")} value={newCurrencyName} onChange={(e) => setNewCurrencyName(e.target.value)} />
                <button className="btn btn-primary mt-3" onClick={handleAddCurrency}>{t("submit")}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BackToTop />
    </>
  );
};

export default Currency;