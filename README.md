<div align="center">

  <p align="center">

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)

  </p>

  <h1 align="center">Educdia</h1>

  <p align="center">
    Educdia is an online platform designed to assist students in enhancing their learning by utilizing a question and answer system based on  courses.
</p>

</div>

<br>

## What is the purpose of Educdia?

Educdia is an online platform designed to assist students in enhancing their knowledge through a question and answer system based on courses. The platform utilizes Next.js, Prisma, Kinde Auth, and OpenAI's GPT-4o API.

Users have the option to sign up and create courses with questions.

Upon commencing a course, users will receive questions to answer. Subsequently, they will receive responses from OpenAI's GPT-4o API in JSON format after answering each question.

```json
{ "correct": false, "answer": "Uhm actually 🤓👆" }
```
- `correct` is a boolean that indicates if the answer is correct or not.
- `answer` is the correct answer to the question, if the user's answer is incorrect.

When a user provides the correct answer, the next question will be displayed. In case of an incorrect answer, the user will receive the correct one and can then proceed to the next question.

The progress of the course will be stored in the database, allowing users to pause and resume their learning at any time through the dashboard.

Upon submitting the first answer to a question, a session will be initiated for the user. Users have the option to reset the course at any point through the dashboard.

## Developing locally

Upon cloning the repository, execute `npm install` at the project's root to install all necessary dependencies. Subsequently, launch the development server by running `npm run dev`.

Ensure to establish a MySQL database and generate a `.env` file in the project's root with environment variables from the `.env.example` file.

To create the SQL database using the Prisma schema, utilize `npx prisma migrate dev --name init` followed by `npx prisma db push`.