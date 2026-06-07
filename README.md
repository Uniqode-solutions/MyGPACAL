# My GPA Calculator

[![Buy Me a Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/uniqode_solz)

A responsive React + Vite GPA calculator designed for easy course tracking, grade management, and semester GPA calculation.

## What's New

- Persistent localStorage support for subjects, selected grades, and grade scale settings
- Customizable GPA grade management with add/remove grade entries
- Drag-and-drop GPA panel for quick access across the app
- Real-time validation and error snackbar messages for missing input or duplicate subject codes
- Help tooltip with usage guidance for new users
- Built-in documentation support via the `docs/` Jekyll site

## Features

- Add subjects with name, code, and credit hours
- Choose grades for each subject from a customizable grade-point scale
- Calculate GPA instantly with one click
- Automatically save all data to localStorage
- Reset all data or restore default grade settings
- Default subjects and GPA grade settings shown here are based on the UCSC MCS degree program 2023 (Sri Lanka), but you can set up your own easily
- Mobile-friendly layout with responsive design

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
   - Your GPA appears immediately in the floating results panel

4. Customize your grading scale:
   - Edit grade letters and point values in the `GPA Grade Management` panel
   - Add or remove grade entries as needed
   - Click `Reset Defaults` to restore the default scale

5. Reset everything:
   - Click `Reset All` to clear subjects, grades, and GPA

## Development

Run the app locally:

```bash
npm install
npm run dev
```

Build the production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run the Jekyll documentation site:

```bash
npm run jekyll:dev
```

Build the Jekyll docs:

```bash
npm run jekyll:build
```

## Built With

- React 19
- Vite 6
- Material UI 7
- Jekyll docs site
- LocalStorage persistence

## Support

If you enjoy this app, please support me on Buy Me a Coffee:

[https://www.buymeacoffee.com/uniqode_solz](https://www.buymeacoffee.com/uniqode_solz)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
