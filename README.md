

Introduction
This repository outlines 12 lab assignments from my Full Stack Development curriculum. These exercises cover backend technologies like Node.js and Express, database management with Sequelize, and frontend development with React, culminating in a full-stack integrated application.

This journal records:

Objectives achieved in each lab

Key concepts that were applied

Specific tools and libraries utilized

Personal reflections and knowledge gained

Lab-Wise Work Journal
Lab 1 — Node.js + Express Basics
Set up a new Node.js project with npm init.

Launched a minimal web server using Express.js.

Defined basic API routes (GET, POST) to handle HTTP requests.

Concepts: Node.js runtime, Express application setup, request/response cycle.

Lab 2 — Using Lodash Utility Library
Added Lodash to the project dependencies using npm install lodash.

Practiced data manipulation using utility functions (e.g., _.debounce, _.cloneDeep).

Concepts: NPM package management, utility libraries, importing modules.

Lab 3 — Error Handling, Callbacks & Event Emitters
Wrote custom middleware for centralized error handling.

Practiced asynchronous control flow using callbacks.

Implemented a custom EventEmitter to signal application events.

Concepts: Middleware, async programming, the observer pattern, Node.js events.

Lab 4 — Reminder Application
Used setTimeout and setInterval to manage timed events.

Integrated an event emitter to trigger alerts.

Created Express endpoints to set and clear reminders.

Concepts: Node.js timers, event-driven programming, API development.

Lab 5 — Routing & Streams (with Pipe)
Organized routes using express.Router() for better modularity.

Implemented file I/O using fs.createReadStream and fs.createWriteStream.

Piped data from a readable stream to a writable stream using .pipe().

Concepts: Modular routing, data streaming, memory efficiency.

Lab 6 — Cron Jobs
Integrated the node-cron library into the project.

Wrote a script to automate a task (e.g., "run every midnight").

Monitored job execution through console logs.

Concepts: Task automation, scheduling syntax, background processes.

Lab 7 — Sequelize Connection Setup
Installed Sequelize ORM and the pg (PostgreSQL) driver.

Established and verified a successful connection to the database instance.

Concepts: Object-Relational Mapping (ORM), database drivers, configuration.

Lab 8 — User Model & Queries
Defined a User model with attributes (username, email, password).

Used Sequelize methods (.create(), .findAll(), .update(), .destroy()) for data manipulation.

Concepts: Data modeling, database abstraction, CRUD operations.

Lab 9 — Sequelize Model Associations
Modeled a UserProfile (One-to-One).

Modeled User and Posts (One-to-Many).

Modeled Students and Courses with a join table (Many-to-Many).

Concepts: Database relationships, foreign keys, join tables.

Lab 10 — React Setup
Bootstrapped a new client application with npx create-react-app.

Cleaned the boilerplate and structured the src directory.

Practiced using the useState and useEffect hooks for state and side effects.

Concepts: React environment, component lifecycle, React Hooks.

Lab 11 — Creating Components (Home, About, Contact)
Created reusable functional components for different pages.

Set up client-side routing using react-router-dom.

Managed data flow between parent and child components using props.

Concepts: Component-based architecture, client-side routing, props.

Lab 12 — Frontend & Backend Integration
Used axios in the React app to make API calls to the Node.js server.

Fetched data from the backend and rendered it dynamically in the UI.

Configured CORS on the Express server to allow cross-origin requests.

Concepts: API consumption, CORS, async/await, MERN/PERN stack.

Concepts I Found Challenging
Integration
Configuring CORS (Cross-Origin Resource Sharing) was an initial hurdle.

Learned to handle asynchronous API requests and manage loading/error states in React.

Gained confidence in connecting the client and server.

File Streaming
Understanding the concept of buffers and chunks was complex.

Practicing with .pipe() helped clarify how data moves efficiently.

Appreciated its use for large-scale file uploads or downloads.

User Queries
Translating complex SQL joins into Sequelize association methods was challenging.

Learned to use options like where, include, and attributes.

Became comfortable with promise-based query resolution.

Context Handling
Deciding when to use props vs. React Context for state management was confusing.

Implemented a simple Context provider to avoid "prop drilling."

Understood how to share global state (like user auth) across the app.

Conclusion
This journal summarizes my progress from basic server setup to a fully functional integrated application. The 12 labs provided a comprehensive, hands-on experience in full-stack development.
