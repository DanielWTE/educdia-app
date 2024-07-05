<div align="center">

  <p align="center">

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)

  </p>

  <h1 align="center">Educdia</h1>

  <p align="center">
    Educdia is a web application to help students to learn and improve their knowledge with a course driven question and answer system.
  </p>

</div>

<br>

## What is the purpose of Educdia?

Educdia is a web application that helps students to learn and improve their knowledge with a course driven question and answer system. The application is built with Next.js, Prisma, Kinde Auth and OpenAI's GPT-4o API.

Users can create an account and create courses with questions.

When a user starts a course, they will be asked questions and they can answer them, when they answer a question, they will get a response from the OpenAI's GPT-4o API with a JSON object with the answer and the correct status.

If the answer is correct the next question will be loaded, when it is incorrect the user will get the correct answer and he can proceed to the next question.

The course progress will be saved in the database and the user can pause and continue the course at any time via the dashboard.

## Developing locally

After cloning the repo, run `npm install` in the root of the project to install all necessary dependencies. Then run `npm run dev` to start the development server.

You need to set up a MySQL database and create a `.env` file in the root of the project with the envs of the `.env.example` file.

You can create the SQL database with the prisma schema by running `npx prisma migrate dev --name init` and then `npx prisma db push`.

