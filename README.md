# PDF BOT System :crystal_ball: | [Deployed Link](https://doc-ai-indol.vercel.app/) | [Code Base](https://github.com/swastikom/DocAI)

![Screenshot (14)](https://github.com/swastikom/DocAI/assets/94228566/5c4ab086-989a-4a73-99a7-66c485d11a44)

# Introduction :star2:

Welcome to our groundbreaking project! We've crafted a seamless fusion of cutting-edge natural language processing and sleek user interfaces. With our system, you can effortlessly upload PDF documents, pose questions about their content, and receive intelligent answers in return. It's like having your own personal assistant powered by the latest in NLP technology. Get ready to redefine the boundaries of what's possible and embark on an exhilarating journey into the future of technology with us!

Open [Deployed Link](http://localhost:3000) with your browser to get started :sunglasses:.

# Project Overview 🚀


https://github.com/swastikom/DocAI/assets/94228566/68f77742-1613-43dc-a586-9c6dd345be84


This project is a revolutionary fusion of technology, combining state-of-the-art natural language processing with sleek user interfaces. 🌐

**Functionality**: Users can effortlessly upload PDF documents, ask questions about their content, and receive intelligent answers in return. 💬

**Objective**: Redefine the boundaries of what's possible in full-stack development, pushing the limits of innovation. 🔍

**Tools and Technologies**: Backend powered by FastAPI, NLP processing with LangChain/LLamaIndex, frontend crafted with React.js. 🛠️

**Database**: Document metadata stored in SQLite or PostgreSQL, ensuring efficient data management. 📊

**File Storage**: Options include local filesystem for storing uploaded PDFs. ☁️

# Frontend Development Process 🖥️

![Untitled design (1)](https://github.com/swastikom/DocAI/assets/94228566/c2c0334c-40fd-4e00-b224-96ee0dbc7343)

Our front end is built using React.js, a powerful JavaScript library for building user interfaces. Here's an overview of our frontend development process:

1. **Project Setup**: We use `Next.js`, a popular framework built on top of `React.js`, to scaffold our project and handle server-side rendering.

2. **Component Architecture**: We follow a modular component-based architecture, breaking down our user interface into reusable components for better maintainability and scalability. Few examples of this would be the Navbar, the chat window, the welcome screen, etc.

3. **Styling**: We utilize `Tailwind CSS`, a utility-first CSS framework, for styling our components. Tailwind CSS allows us to quickly prototype and style our UI elements using utility classes. Also, our application is responsive for Desktop, Laptop, Tablet, and mobile devices to enhance the User Experience.

4. **State Management**: We managed the application state using React's built-in state management capabilities, such as useState and useContext hooks. 

5. **API Integration**: We integrated with the backend API using fetch to fetch data from the server and update the UI accordingly. We follow RESTful API principles for clear and consistent communication between the front end and back end.

6. **Testing**: We write unit tests using tools like Jest and React Testing Library to ensure the correctness and reliability of our components. We also conduct manual testing to verify the user experience across different devices and screen sizes.

7. **Deployment**: We deployed the application on `Vercel`, which provides seamless deployment workflows and hosting services.

Overall, our frontend development process prioritizes modularity, scalability, and user experience to deliver a high-quality and responsive user interface. 🚀

# Backend Development Process 🛠️

![Untitled design (2)](https://github.com/swastikom/DocAI/assets/94228566/c184a0e0-81ac-4459-8bc0-2e3cc744d09e)

Our backend development process involves creating a robust and efficient server-side architecture using FastAPI, a modern Python framework for building APIs. Here's a detailed overview of our backend development process:

1. **Framework Selection**: We chose `FastAPI` due to its high performance, automatic API documentation generation, and easy-to-use features like dependency injection and data validation.

2. **Database Design**: We designed the database schema using `SQLAlchemy`, a powerful ORM (Object-Relational Mapping) tool for working with relational databases like `SQLite`. We define database models to represent entities such as documents and their metadata.

3. **API Endpoints**: We defined RESTful API endpoints using FastAPI's declarative syntax, specifying routes for uploading PDF documents, asking questions, and retrieving answers. Each endpoint corresponds to a specific functionality of our application, following the principles of CRUD operations (Create, Read, Update, Delete).

4. **File Handling**: We handled file uploads using FastAPI's File class and managed file storage using Python's built-in file manipulation libraries like `os` and `shutil`. Uploaded PDF documents are stored locally with their metadata stored in the database.

5. **PDF Processing**: We used external libraries like PyMuPDF to extract text content from uploaded PDF documents. This extracted text is then used for natural language processing tasks, such as answering questions posed by users.

6. **NLP Integration**: We integrated with `LangChain`, a powerful natural language processing library, to process user questions and generate accurate answers based on the content of uploaded PDF documents. These libraries leverage advanced `NLP techniques like word embeddings and similarity search to provide relevant responses.

7. **Error Handling**: We implemented robust error handling mechanisms to gracefully handle exceptions and provide informative error messages to clients. We use HTTP status codes to indicate the success or failure of API requests and handle edge cases such as invalid input data or file format errors.

8. **Security**: We prioritized security by implementing measures like CORS (Cross-Origin Resource Sharing) middleware to restrict access to our API endpoints.
   

By following this comprehensive backend development process, we ensure that our application is scalable, secure, and capable of handling complex business logic efficiently. 🚀


# Conclusion 🌟

In conclusion, our project represents a sophisticated solution for document analysis and knowledge extraction, leveraging cutting-edge technologies and streamlined workflows. By seamlessly integrating frontend and backend components, we've created an intuitive platform where users can effortlessly upload PDF documents, ask questions, and receive accurate answers generated through advanced natural language processing techniques. With a user-friendly interface and robust backend architecture, our application sets new standards in document processing, offering unparalleled convenience and efficiency. Whether it's extracting insights from research papers, legal documents, or educational materials, our project empowers users to unlock the full potential of their documents with ease. 🚀💡

