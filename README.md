# Haikyuudle

[My Notes](notes.md)

I plan to create a wordle-esque game based on an anime that I enjoy. I will create a couple different game modes for things such as quotes, names, and characters. I will store scores, enable login, and allow players to see how they compare to others. I will add additional game modes that relate to a spinoff game that they created.


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. 

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Do you like playing word games and you love Haikyuu? With this application, you will be able to prove your love of both. Play through several different game modes to show your knowledge of the anime and your mental prowess. Login to be able to see how you compare to others and store your top scores.
### Design

![Design image](HaikyuuMockup.png)

I'm not 100% sure how the sequence diagram should look, so I'll update it as I implement different features, but here's the basic parts that I understand.

```mermaid
sequenceDiagram
    actor User1
    actor User2
    actor Website
    User1 ->> Website: Play daily
    Website ->> User2: Display statistics
```

### Key features

- Login to be able to save your scores
- Classic wordle style game mode
- Nontraditional guessing mode
- Engaging gameplay

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Correctly uses HTML structure for application. I will create a page for login and others for game modes
- **CSS** - Application formatting that will work on multiple screen sizes. Also engaging yet not overstimulating.
- **React** - Provides login for storing scores
- **Service** - Backend service to enable login and score sharing. Grabs information from the Haikyuu wiki.
- **DB/Login** - Store users and their scores. Securely store login information. Store information relevant to the games.
- **WebSocket** - Broadcast average scores and percentiles.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://ejensen.click).

## 🚀 HTML deliverable

For this deliverable I did the following:

- [x] **HTML pages** - I created my index page as well as pages for 2 other game modes.
- [x] **Proper HTML element usage** - I followed W3schools tutorials to ensure proper syntax and usage.
- [x] **Links** - Added links between pages and a statistics link
- [x] **Text** - I have text that matches my application purpose.
- [x] **3rd party API placeholder** - There is a placeholder for this.
- [x] **Images** - I added a background image.
- [x] **Login placeholder** - I have a login interface
- [x] **DB data placeholder** - I left a spot for where the database will be used
- [x] **WebSocket placeholder** - Included a placeholder

## 🚀 CSS deliverable

For this deliverable I did the following:

- [x] **Header, footer, and main content body** - The header, footer, and main content are all formatted how I want them.
- [x] **Navigation elements** - You can quickly navigate between pages using the nav bar at the top
- [x] **Responsive to window resizing** - The nav bar and boxes respond to the shape of the window
- [x] **Application elements** - Some application specific elements such as the boxes for guesses are shown
- [x] **Application text content** - The text of the application is there
- [x] **Application images** - Added images

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following:

- [x] **Bundled using Vite** - Using vite, I connected my html and java but left out the css
- [x] **Components** - I ported everything into jsx files and css files.
- [x] **Router** - I used a router to get header/footer framework, and I used .jsx files for everything else

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following:

- [x] **All functionality implemented or mocked out** - All of my web pages are functional! some are a little bit less because of the sheer amount of database that they need, but I'm feeling pretty proud of it!
- [x] **Hooks** - I use useState on every page, and I think I use useEffect on some of them

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
