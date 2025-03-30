# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This project is a simple front-end focused project that utilized technology such as AJAX, JQuery, CSS, and HTML. 

This project was instrumental for understanding such things like (but not limited to): 
- CSS Flexbox
  - Page layout primarily achieved with flexbox
- Responsive web design
  - Media queries included at a 1024px breakpoint
- Deubgging front-end using Developer Tools on the browser
  - Utilized Chrome Dev Tools during development
- Browser events handled with AJAX
  - On form submit, character counter, on click features included
- Document Object Model and HTML
- Form security (handling cross-site scripting)
  - Using JQuery .text() method to prevent HTML being entered into form
- DOM manipulations (Toggles)
  - Error handling, form can be toggled, and to-top button appears on scroll

## Final Product
### Final Page Layout
![Final Page Layout](/images/main.png)

### Tweet Validation
![Error Validation](/images/validation.png)

### Responsive Design
![Responsive Design](/images/responsive.png)

## Toggle Features
![Toggle Tweet Form](/images/toggle.png)


## Getting Started
1. Clone the repository onto your local device.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- Chance
- Body-Parser
