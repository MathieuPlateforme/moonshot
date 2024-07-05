<div align="center">
  <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExamZyYW9nMGxpaTI5MHM0enE2YjFzbnZ5MHYzOG45aTRkNHRyenJzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BGIqWh2R1fi6JDa/giphy.gif" alt="Nature conservation GIF" width="100%" height="250">
  <h1>Spotty</h1>
  <p>Connecting eco-conscious individuals through a mobile platform to promote and organize ecological events.</p>

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)
![GitHub contributors](https://img.shields.io/github/contributors/alexandre-aloesode/spotty)
</div>

## Table of Contents

- [🌱 Introduction](#-introduction)
- [🏞️ Project Structure](#-project-structure)
- [🔧 Installation](#-installation)
- [🌍 Usage](#-usage)
- [🌟 Features](#-features)
- [📦 Dependencies](#-dependencies)
- [⚙️ Configuration](#-configuration)
- [📚 Documentation](#-documentation)
- [🌱 Examples](#-examples)
- [🔍 Troubleshooting](#-troubleshooting)
- [👨‍💻 Contributors](#-contributors)
- [📝 License](#-license)

## 🌱 Introduction

Spotty is a mobile application designed to foster environmental awareness and action. It provides a platform where
individuals can organize, promote, and participate in ecological events like beach cleanups, tree plantings, and more,
with the ease of social networking capabilities similar to Twitter.

## 🏞️ Project Structure

The project is organized as follows:

```plaintext
.
├── README.md
├── code
│   ├── backend
│   └── frontend
├── docs
├── infra
└── tasks
```

- `code`: Houses the microservices for the backend and the React Native application for the frontend.
- `docs`: Contains all documentation related to the project.
- `infra`: Used for setting up and managing the infrastructure, including Kubernetes cluster configurations.
- `tasks`: Taskfile for managing project tasks.

Sure, here's a simplified version of the installation instructions:

## 🔧 Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/alexandre-aloesode/spotty.git
   cd spotty
   ```

2. **Install Taskfile**:
   If Taskfile is not installed on your device, download it from [here](https://taskfile.dev/#/installation) and follow
   the installation instructions.

3. **Install Docker**:
   If Docker is not installed on your device, download it from [here](https://www.docker.com/products/docker-desktop)
   and follow the installation instructions.

4. **Run the Taskfile**:
   Taskfile will handle the Docker setup and running the containers. Run the following command:
   ```sh
   task up
   ```

## 🌍 Usage

Once the containers are up and running, the services can be accessed at:

- Frontend (React Native): Run instructions will be added as the project progresses.
- API Gateway (KrakenD): `http://localhost:8080`

## 🌟 Features

- **Mobile Application**: Built with React Native for iOS and Android platforms.
- **Microservices Architecture**: Backend structured in microservices to ensure scalability and maintainability.
- **Event Organization Tools**: Users can create, manage, and join ecological events.
- **Social Networking**: Features like posts, comments, and groups to enhance user interaction and engagement.

## 📦 Dependencies

Major dependencies include:

- **React Native**: For the mobile frontend.
- **Various backend frameworks**: Depending on the microservice.
- **KrakenD**: For efficient API gateway management.
- **Message Broker (Kafka/RabbitMQ)**: To manage data flow and communication between services.

## ⚙️ Configuration

Details about system configuration and environmental setups are provided in the `infra` directory, including potential
Kubernetes configurations and message broker setups.

## 📚 Documentation

Refer to the `docs` directory for detailed project documentation, including setup guides and feature descriptions.

## 🌱 Examples

Example usage and code snippets will be provided as the project develops.

## 🔍 Troubleshooting

Document common issues and solutions to help with potential problems during project setup and execution.

## 👨‍💻 Contributors

Feel free to contribute to this project. Here's how you can do it:

- **Alexandre ALOESODE** - [github](https://github.com/alexandre-aloesode) [linkedin](https://www.linkedin.com/in/alexandre-aloesode-29501694/) 
- **Elarif INZOUDINE** - [github](https://github.com/harrysCTB) [linkedin](https://www.linkedin.com/in/elarif-inzoudine)
- **Félix HAUGER** - [github](https://github.com/felix-hauger) [linkedin](https://www.linkedin.com/in/félix-hauger)
- **Hervé BEZIAT** - [github](https://github.com/herve-beziat) [linkedin](https://www.linkedin.com/in/hervé-beziat)
- **Mathieu RUIZ** - [github](https://github.com/MathieuPlateforme) [linkedin](https://www.linkedin.com/in/mathieu-ruiz-48719a251/)
- **Yassine EL GHERRABI** - [github](https://github.com/yassineelg) [linkedin](https://www.linkedin.com/in/yassine-el-gherrabi)
- **Yassine FELLOUS** - [github](https://github.com/yassine-fellous) [linkedin](https://www.linkedin.com/in/yassine-fellous)

## 📝 License

This project is licensed under
the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

---

Join us in making the world a cleaner, greener place. Happy coding! 🌍🚀
