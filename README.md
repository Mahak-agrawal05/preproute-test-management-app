# Preproute Test Management Application

A React + TypeScript based Test Management Application developed as part of the Preproute Frontend Developer Assessment.

## Overview

This application allows users to create, manage, preview, and publish tests through a structured 5-page workflow.

## Features

### Authentication

* User login with validation
* Error handling for invalid credentials
* Protected navigation flow
* Token management using Local Storage

### Dashboard

* View all available tests
* Create new tests
* Edit existing tests
* Delete tests
* View test information

### Create Test

* Test Name
* Subject
* Topic
* Sub Topic
* Difficulty Level
* Marking Scheme
* Total Time
* Total Marks
* Save as Draft functionality
* Form validation

### Question Management

* Add MCQ questions
* Four options per question
* Select correct answer
* Explanation field
* Difficulty selection
* Topic and Sub-topic selection
* Media URL support
* Edit questions
* Delete questions
* Minimum one question validation

### Preview & Publish

* Test overview
* Question preview
* Edit test details
* Edit questions
* Publish test
* Success notification
* Redirect to dashboard after publishing

---

## Technology Stack

* React
* TypeScript
* Vite
* React Router DOM
* Axios
* React Hook Form
* CSS

---

## Project Structure

```text
src/
│
├── components/
│   ├── Header
│   ├── Sidebar
│   ├── Layout
│
├── pages/
│   ├── Login
│   ├── Dashboard
│   ├── CreateTest
│   ├── Questions
│   └── Publish
│
├── services/
│   ├── api
│   ├── auth
│   └── testService
│
├── styles/
│
└── App.tsx
```

---

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Mahak-agrawal05/preproute-test-management-app.git
```

Navigate to project directory:

```bash
cd preproute-test-management-app
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Assessment Requirements Covered

### Page 1 – Login

* Login form
* Validation
* Error handling
* Redirect on success

### Page 2 – Dashboard

* Test listing
* Create Test
* Edit Test
* Delete Test
* View Test

### Page 3 – Create/Edit Test

* Test details form
* Validation
* Save as Draft

### Page 4 – Add Questions

* Add/Edit/Delete Questions
* Correct Option Selection
* Explanation
* Media URL
* Validation

### Page 5 – Preview & Publish

* Test Overview
* Questions Preview
* Edit Navigation
* Publish Flow
* Success Notification

---

## API Integration

All APIs from the provided documentation have been integrated.

Note: The provided staging backend currently returns CORS errors from localhost, which prevents full end-to-end API testing. Frontend integration for all endpoints has been completed according to the API specification.

## Author

**Mahak Agrawal**

Frontend Developer Assessment Submission for Preproute.
