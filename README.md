# Profile Management App

This project is a web application built using **React**, **Redux**, and **Firebase** for the backend. It features two main views: a **Client View** and an **Admin Panel**. The Client View allows users to search and view profiles, while the Admin Panel enables profile management, including adding, editing, and deleting profiles. The app is fully responsive, thanks to **Tailwind CSS**.

## Live Demo

You can check out the live version of the app here:  
[Live Demo](https://bynry-frontend-intern-assignment.vercel.app/)

## Features

- **User Type Selection**: On the root path (`/`), users can choose between **Client** or **Admin**.
- **Client Home (`/clientHome`)**:

  - Displays a list of profiles.
  - Includes a **search bar** to filter profiles by name, description, or address.
  - Profiles include the name, photo, description, and address of the person.

- **Admin Home (`/adminHome`)**:

  - Displays all profiles with options to **edit** or **delete** a profile.
  - Admin has the ability to **add new profiles** to the system.

- **Responsive Design**: The app is designed using **Tailwind CSS**, ensuring a fully responsive layout on all screen sizes.

## Technologies Used

- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Firebase (for authentication and data storage)

## Setup Instructions

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/ganeshnitalikar/frontend-intern-assignment
   ```

2. Navigate to the project directory:

   ```bash
   cd your-project-repo
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up Firebase:

   - Create a Firebase project if you don't already have one.
   - Set up Firebase Authentication and Firestore in your Firebase project.
   - Add your Firebase configuration to the `config.js` file (you can find this in the Firebase console).

   Example:

   ```bash
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

5. Run the application locally:

   ```bash
   npm start
   ```

6. Visit `http://localhost:3000` in your browser to see the app in action.

## Folder Structure

- `src/`
  - `components/` - React components for UI.
  - `redux/` - Redux store, actions, and reducers.
  - `firebase/` - Firebase configuration and setup.
  - `pages/` - Page components for the client and admin views.
  - `App.js` - Main entry point of the application.
  - `index.js` - Renders the app.

## Contributing

If you would like to contribute to this project, feel free to fork the repository, create a new branch, and submit a pull request.

### Steps to Contribute:

1. Fork the repository.
2. Clone your fork:
   ```bash
   git clone https://github.com/ganeshnitalikar/frontend-intern-assignment
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
4. Make your changes and commit them:
   ```bash
   git commit -m "Add feature"
   ```
5. Push your changes:
   ```bash
   git push origin feature/your-feature
   ```
6. Open a pull request on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to explore and contribute to this project!
