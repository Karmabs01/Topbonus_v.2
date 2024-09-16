"use client";
import React, { useState } from "react";
import Loader from "@/components/Loader";

const Index = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [formVisible, setFormVisible] = useState(false); // Состояние видимости формы

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Показать Loader

    const formData = {
      email: email,
      message: message,
    };

    try {
      const response = await fetch(
        "https://bonusnumber1.com/api/sent_email_support.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setTimeout(() => {
        setLoading(false); // Скрыть Loader через 1 секунду
      }, 1000);

      if (response.ok) {
        setStatus("Сообщение успешно отправлено!");
        setTimeout(() => {
          setFormVisible(false); // Закрываем форму через 1 секунду после отправки
        }, 1000);
      } else {
        setStatus("Ошибка при отправке сообщения.");
      }
    } catch (error) {
      setStatus("Ошибка: " + error.message);
      setLoading(false); // Скрыть Loader в случае ошибки
    }
  };

  const toggleForm = () => {
    setFormVisible(!formVisible); // Переключить видимость формы
  };

  return (
    <div>
      <button onClick={toggleForm} className="btn btn-support">
        Support
      </button>

      {formVisible && (
        <div className="form-support">
          {loading && (
            <div className="loader-overlay">
              <Loader /> {/* Лоадер поверх формы */}
            </div>
          )}
          <div className={`formS ${loading ? "blurred" : ""}`}>
            <button onClick={toggleForm} className="close-btn">X</button> {/* Кнопка для закрытия формы */}
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Message:</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-orange mt-4" type="submit">
                Send
              </button>
            </form>
            {status && <p>{status}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
