#  React Geo Quizzr

A simple quiz app in response to a challenge.
This was created with React, using JSX and [create-react-app](https://github.com/facebookincubator/create-react-app). The quiz opens with a welcome screen, prompting the user to continue.  Each question is displayed in order, awaiting a response.  When all questions have been answered, a summary displays the users answers and overall grade.

## Data

Quiz data is stored in JSON in the form
```
{
  questions[
    ...
  ],
  grades[
    ...
  ]
}
```
`questions` contains a list of questions and their corresponding options. `grades` contains a simple grading table.
See [src/quiz-data.json](src/quiz-data.json)


## Installation

You can use the following commands to download and run the sample code.
```bash
$ mkdir quizzr && cd quizzr
$ git clone http://github.com/jayfid/quizzr.git .
$ npm install
$ npm start
```
## Structure
**[App.js](src/App.js)** - Wrapper class that either displays an intro or the quiz.

**[Quiz.js](src/Quiz.js)** - Contains classes related to the quiz.

**Styling** - Very simple CSS was used in order to speed up development.  A simple wireframe was created and my personal CSS framework [Vinyl](https://github.com/jayfid/vinyl) was added.

## Notes
My goal in this was to create a straightforward app in order to demonstrate my coding as well as to open up topics for discussion.  I purposefully kept the features and design very simple in order to produce something usable in a short amount of time. A larger app might allow for different question formats, translations, persistence, sharing, or any other of a multitude of possibilities.  I organized the state under the Quiz object, and the display under the App object to hopefully ease refactoring into anything more complex.
