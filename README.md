# IMDb Clone

An IMDb-inspired web application built using the MERN stack, with Redux for state management and Bootstrap for styling. This application allows users to perform CRUD operations on movies, manage actors and producers, and view details of each movie.

## Tech Stack

- **Frontend:** React, Redux, Bootstrap
- **Backend:** Node.js, Express, JWT, bcrypt
- **Database:** MongoDB with Mongoose ODM

## Features

- Add, view, update, and delete movies.
- Add and manage actors and producers.
- View details of movies with associated actors and producer information.

### Frontend Structure

- **Components**: All UI components, such as forms, buttons, and lists, organized by functionality.
- **Redux Store**: Manages global state for movies, actors, producers, and loading states.
- **API Integration**: Uses `axios` to communicate with the backend API for CRUD operations.
- **Routing**: React Router is used for navigation between pages.

### Installation

1. Clone the repository and navigate to the `client` folder:

```
git clone https://github.com/your-username/ebook-reader.git	
cd ebook-reader
```

2. Install the dependencies:

```
npm install
```

 
3. Start the development server:

```
npm start
```
  
The frontend will be available at `http://localhost:3000`.