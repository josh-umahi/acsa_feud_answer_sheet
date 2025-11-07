// ...imports stay the same
import React, { useState, useEffect } from 'react';
import './App.css';
import database from "./database.js";

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const [number_displayed, set_number_displayed] = useState(null);
  const [number_input_entered, set_number_input_entered] = useState(null);
  const [question, set_question] = useState(null);

  useEffect(() => {
    const accessData = localStorage.getItem("access_granted");
    if (accessData) {
      const { timestamp } = JSON.parse(accessData);
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;
      if (now - timestamp < oneDay) {
        setAuthorized(true);
      } else {
        localStorage.removeItem("access_granted");
      }
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === "escaladizzy") {
      setAuthorized(true);
      setError("");
      localStorage.setItem(
        "access_granted",
        JSON.stringify({ timestamp: Date.now() })
      );
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  const changeQuestion = (question_number_parameter) => {
    const question_number = parseInt((question_number_parameter || "").trim());
    if (isNaN(question_number) || !Number.isInteger(question_number) || question_number < 1 || question_number > 1000) {
      return;
    }
    const question_index = question_number - 1;
    set_question(database[question_index]);
    set_number_displayed(question_number);
  };

  if (!authorized) {
    return (
      <div className="gate_box">
        <h1>Enter the password to continue</h1>
        <form className="input_div" onSubmit={handlePasswordSubmit}>
          <div>
            <input
              type="text"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              aria-label="Password"
            />
            <button type="submit">Submit</button>
          </div>
        </form>
        {error && <p className="gate_error">{error}</p>}
        <p className="gate_hint">Access will be remembered for 24 hours.</p>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1>Answer Sheet</h1>
        <form
          className="input_div"
          onSubmit={(e) => {
            e.preventDefault();
            changeQuestion(number_input_entered);
          }}
        >
          <div>
            <input
              onChange={(e) => set_number_input_entered(e.target.value)}
              type="text"
              placeholder="Enter a number"
            />
            <button type="submit">submit</button>
          </div>
          <p>Enter a number between 1 and 1,000</p>
        </form>

        {question && (
          <div className="question_details_div">
            <h2 className="question_number">Question {number_displayed}</h2>
            <h2 className="question_title">{question.Question_Title}</h2>
            <div className="answers">
              <h2>A)&nbsp;&nbsp;&nbsp; {question.Answer_1} --- {question.Answer_1_Points}</h2>
              <h2>B)&nbsp;&nbsp;&nbsp; {question.Answer_2} --- {question.Answer_2_Points}</h2>
              <h2>C)&nbsp;&nbsp;&nbsp; {question.Answer_3} --- {question.Answer_3_Points}</h2>
              <h2>D)&nbsp;&nbsp;&nbsp; {question.Answer_4} --- {question.Answer_4_Points}</h2>
              <h2>E)&nbsp;&nbsp;&nbsp; {question.Answer_5} --- {question.Answer_5_Points}</h2>
              <h2>F)&nbsp;&nbsp;&nbsp; {question.Answer_6} --- {question.Answer_6_Points}</h2>
            </div>
          </div>
        )}
      </header>
      <footer>
        <h4>
          Created by{" "}
          <a href="https://joshumahi.vercel.app/" target="_blank" rel="noopener">
            Joshua Umahi
          </a>.
        </h4>
      </footer>
    </div>
  );
};

export default App;