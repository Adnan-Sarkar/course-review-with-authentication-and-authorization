# Course Review With Authentication & Authorization [![](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)]() [![](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)]()

## Table of Contents

- [API Documentation](#api-documentation)
- [Live Server Test](#live-server-test)
  - [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation locally](#installation-locally)
  - [Running the Application](#running-the-application)

## API Documentation

This documentation, generated with Postman.

```bash
  Live link: `https://documenter.getpostman.com/view/15069256/2s9Ykt4ymL`
```

Or,

[Click API Documentation](https://documenter.getpostman.com/view/15069256/2s9Ykt4ymL)

## Live Server Test

To test the live API endpoints, I prefer using [Postman](https://www.postman.com/) for testing with better user experience.

### Live API

```bash
https://course-review-with-auth-by-adnan-sarkar.vercel.app/
```

## API Endpoints

for `user`

- **POST** /api/auth/register
- **POST** /api/auth/login
- **POST** /api/auth/change-password

for `course`

- **POST** /api/courses
- **GET** /api/courses
- **GET** /api/courses/:courseId/reviews
- **PUT** /api/courses/:courseId
  <br>
- **GET** /api/course/best

for `category`

- **POST** /api/categories
- **GET** /api/categories

for `review`

- **POST** /api/reviews

## Getting Started

These instructions will help you set up and run the application on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation locally

1. Clone the repository:

```bash
https://github.com/Porgramming-Hero-web-course/l2b2a4-course-review-with-auth-Adnan-Sarkar.git
```

2. Navigate to the project directory:

```bash
cd course-review-with-authentication-and-authorization
```

3. Install dependencies:

```bash
npm install
```

4. Create a .env file in the root directory and configure environment variables:

```bash
PORT=...
SALT_ROUND=...
DB_URL=...
JWT_ACCESS_TOKEN_SECRET=...
JWT_ACCESS_TOKEN_EXPIRES_IN=...
```

### Running the Application

1. Convert the typescript file to javascript file

```bash
npm run build
```

2. Running typescript in development environment

```bash
npm run start:dev
```

3. Running javascript in production environment

```bash
npm run start:prod
```

<br><br>

Thank you for exploring the `Course Review With Authentication & Authorization` backend application! Feel free to provide feedback, report issues.

## 📢 Social Links

- [![](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adnan-sarkar-8b54341a0/)
- [![](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/AdnanSarkar14)
- [![](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/adnansarkaraduvai/)
- [![](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/_a_d_u_v_a_i_/)
- [![](https://img.shields.io/badge/Hashnode-2962FF?style=for-the-badge&logo=hashnode&logoColor=white)](https://adnansarkar.hashnode.dev/)
