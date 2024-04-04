# HarmonyHub

## Description

"For musicians, by musicians* this website is all about connecting with people who share an interest in creating and enjoying music."

## Features

- **User Authentication**: The application uses `bcrypt` for password hashing and `express-session` for managing user sessions. This is evident from the dependencies listed in the `package.json` file and the usage of `express-session` in `server.js`.

- **Real-time Communication**: The application uses `socket.io` for real-time communication. This is mentioned in the readme and the dependency is listed in the `package.json` file.

- **Database Interaction**: The application uses `sequelize` to interact with the database. This is evident from the `server.js` file and the dependencies listed in the `package.json` file.

- **Blog and Forum**: The application has features related to blogs and forums, as indicated by the presence of `blog.js` and `forum.js` in the `models` directory and corresponding routes in the `routes` directory.

- **User Profiles**: The application allows users to create and manage profiles, as indicated by the presence of `profileController.js` in the `controllers` directory and corresponding routes in the `routes` directory.

- **Testing**: The application uses `jest` for testing, as indicated in the `package.json` file and the readme.

- **Environment Variables**: The application uses environment variables for configuration, as indicated by the presence of the `.env.EXAMPLE` file.

## Development Environment

This project is developed using JavaScript and Node.js. It uses Express.js for the server and Sequelize for the database. The project also uses Socket.IO for real-time communication.

### Prerequisites

Before you begin, ensure you have installed the following:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [Git](https://git-scm.com/downloads)

### Setup

1. Clone the repository to your local machine using Git.
2. Navigate to the project directory.
3. Run `npm install` to install all dependencies listed in the [package.json](package.json) file.
4. Create a `.env` file in the root directory of the project. Use the `.env.EXAMPLE` file as a guide for what environment variables need to be set.
5. Run `npm run start` to start the application.

### Running Tests

This project uses Jest for testing. To run the tests, use the following command:

```sh
npm run test

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT