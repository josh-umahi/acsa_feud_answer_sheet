import React, { useState } from 'react'

import './App.css';
import database from "./database.js"

const App = () => {
  const [number_displayed, set_number_displayed] = useState(null)
  const [number_input_entered, set_number_input_entered] = useState(null)
  const [question, set_question] = useState(null)

  const changeQuestion = (question_number_parameter) => {
    const question_number = parseInt(question_number_parameter.trim())
    if (isNaN(question_number) || !Number.isInteger(question_number) || question_number < 1 || question_number > 200) {
      return
    }

    const question_index = question_number - 1
    set_question(database[question_index])
    set_number_displayed(question_number)
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Answer Sheet</h1>
        <form className='input_div' onSubmit={(e) => {
          e.preventDefault()
          changeQuestion(number_input_entered)
        }}>
          <input onChange={e => set_number_input_entered(e.target.value)} type="text" placeholder='Enter a number between 1 and 200' id="" />
          <button type="submit">submit</button>
        </form>

        {question &&
          <div className='question_details_div'>
            <h2 className='question_number'>Question {number_displayed}</h2>
            <h2 className='question_title'>{question.Question_Title}</h2>
            <div className='answers'>
              <h2>A)&nbsp;&nbsp;&nbsp; {question.Answer_1} --- {question.Answer_1_Points}</h2>
              <h2>B)&nbsp;&nbsp;&nbsp; {question.Answer_2} --- {question.Answer_2_Points}</h2>
              <h2>C)&nbsp;&nbsp;&nbsp; {question.Answer_3} --- {question.Answer_3_Points}</h2>
              <h2>D)&nbsp;&nbsp;&nbsp; {question.Answer_4} --- {question.Answer_4_Points}</h2>
              <h2>E)&nbsp;&nbsp;&nbsp; {question.Answer_5} --- {question.Answer_5_Points}</h2>
              <h2>F)&nbsp;&nbsp;&nbsp; {question.Answer_6} --- {question.Answer_6_Points}</h2>
            </div>
          </div>
        }
      </header>
      <footer>
        <h4>Created by Yours Truly.</h4>
        <h4>Yours Truly is me, Joshua Umahi.</h4>
      </footer>
    </div>)
}

export default App
