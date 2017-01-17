import React, { Component } from 'react';
import config from './quiz-data.json';
import button from './button.svg';

class Quiz extends Component {
  constructor(props) {
    super();
    this.state = config;
    this.onSelect = this.onSelect.bind(this);
    this.initialize = this.initialize.bind(this);
  }
  initialize() {
    const questions = this.state.questions.slice();
    questions.map((question) => {
      return question.user_answer = null;
    });
    this.setState({ questions: questions });
  }
  onSelect(questionIndex, optionIndex) {
    const questions = this.state.questions.slice();
    questions[questionIndex].user_answer = optionIndex;
    this.setState({
      questions: questions
    });
  }
  render() {
    let content, classes;
    for (let i = 0, len = this.state.questions.length; i < len; i++) {
      let question = this.state.questions[i];
      if (typeof question.user_answer === 'undefined' || question.user_answer === null) {
        let questionNumber = i + 1, questionCount = this.state.questions.length;
        content = (
          <div>
            <Question key={i}
              index={i}
              options={question.options}
              label={question.label}
              onSelect={this.onSelect} />
            <div className="top-right">
              {questionNumber} / {questionCount}
            </div>
          </div>);
        classes = "tpush-40 bpush-40 lpad-40 rpad-40 quiz text-left";
        break;
      }
    }
    if (!content) {
      content = <Summary
        questions={this.state.questions}
        reset={this.initialize}
        grades={this.state.grades} />;
      classes = "tpush-40 bpush-40 lpad-40 rpad-40 summary text-center"
    }
    return (
      <div className={classes}>
        {content}
      </div>
    );
  }
}

class Question extends Component {
  constructor(props) {
    super();
    this.state = {
      index: props.index,
      label: props.label,
      options: props.options,
      onSelect: props.onSelect
    };
  }
  handleClick(option) {
    this.state.onSelect(this.state.index, option);
  }
  renderOptions() {
    const optionList = this.state.options.map((option, index) => {
      return (
        <Option
          key={index}
          label={option.label}
          onClick={() => { this.handleClick(index) } } />
      );
    });
    return (
      optionList
    );
  }
  render() {
    return (
      <div>
        <h2>{this.state.label}</h2>
        {this.renderOptions()}
      </div>
    );
  }
}

function Option(props) {
  return (
    <div>
      <span className="option" onClick={props.onClick}>
        <img src={button} className="rpush-10" alt="Radio Button" width="16" height="16" />
        <span>{props.label}</span>
      </span>
    </div>
  );
}

class Summary extends Component {
  constructor(props) {
    super();
    this.state = {
      data: props.questions,
      grades: props.grades,
      reset: props.reset
    };
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.state.reset();
  }
  displayAnswers() {
    return this.state.data.map((question, index) => {
      let validClass = '';
      if (question.options[question.user_answer].validity === 'valid') {
        validClass = 'correct user-answer lpad-20';
      }
      else if (question.options[question.user_answer].validity === 'invalid') {
        validClass = 'wrong user-answer lpad-20';
      }
      let questionNumber = index + 1;
      return (
        <li key={index} className="bpush-20 question-summary">
          <div>
            <span className="question-label font-size-b" ><em>{questionNumber})</em> {question.label}</span>
            <br />
            <span className={validClass}>{question.options[question.user_answer].label}</span>
          </div>
        </li>
      );
    });
  }
  calculateGrade() {
    let total = 0, lastThreshold = -1, gradeLetter = '';
    for (let i = 0, len = this.state.data.length; i < len; i++) {
      let question = this.state.data[i];
      total += question.options[question.user_answer].value;
    }
    for (let i = 0, len = this.state.grades.length; i < len; i++) {
      let grade = this.state.grades[i];
      if (total >= grade.threshold && grade.threshold > lastThreshold) {
        gradeLetter = grade.grade;
        lastThreshold = grade.threshold;
      }
    }
    return gradeLetter;
  }
  render() {
    return (
      <div>
        <h1>Congrats!</h1>
        <div>
          <p>Your Grade: <span className="grade">{this.calculateGrade()}</span></p>
        </div>
        <ul className="text-left bpush-20">{this.displayAnswers()}</ul>
        <button
          className="btn color-bg-white lpad-20 rpad-20 tpad-10 bpad-10"
          onClick={this.reset}>Start Over</button>
      </div>
    );
  }
}

export default Quiz;