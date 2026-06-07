# My GPA Calculator

A responsive React + Vite GPA calculator that makes it easy to track course credits, grades, and semester GPA.

## Features

- Add subjects with name, code, and credit hours
- Choose grades for each subject from a customizable grade-point scale
- Calculate GPA instantly with one click
- Save subjects, grades, and grading scale automatically using localStorage
- Reset all data or restore default grade settings

## How to Use

1. Add your course:
   - Enter the subject name
   - Enter the subject code
   - Enter the credit hours
   - Click `ADD SUBJECT`

2. Assign a grade:
   - Select a grade for each added subject
   - Use the grade dropdown next to each course

3. Calculate your GPA:
   - Click `CALCULATE GPA`
   - Your GPA appears immediately in the results panel

4. Customize your grading scale:
   - Edit grade letters and point values in the `GPA Grade Management` panel
   - Add or remove grade entries as needed
   - Click `Reset Defaults` to restore the default scale

5. Reset everything:
   - Click `Reset All` to clear subjects, grades, and GPA

## Built With

- React 19
- Vite
- Material UI
- LocalStorage persistence
