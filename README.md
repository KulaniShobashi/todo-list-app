# ToDo List App

A React-based ToDo application that allows users to manage learning topics and sub-topics. This project was developed based on a UI enhancement requirement where simple todos were transformed into topic containers with nested sub-topics. :contentReference[oaicite:0]{index=0}

---

## Features

### Topic Management
- Add new topics
- View all topics
- Select multiple topics
- Delete selected topics
- Display deleted topics with a deleted marker

### Sub-Topic Management
- Add sub-topics inside a topic
- Add descriptions for sub-topics
- Mark sub-topics as completed
- Select and delete multiple sub-topics
- Show deleted sub-topics with deletion information

### Permission Management
Supports multiple user roles:

| Role | Permissions |
|--------|-------------|
| Admin | Create, update, delete, and view everything |
| Dept Head | View and delete todos and sub-todos |
| Learner | Create and update todos and sub-todos |
| Viewer | View-only access |

### Local Storage
The application stores:
- Topics
- Sub-topics
- User role
- Deleted records

---

## Project Structure


src
│
├── components
│   ├── TopicCard.jsx
│   ├── TodoApp.jsx
│   ├── UserPanel.jsx
│   └── PermissionTable.jsx
│
├── App.jsx
├── main.jsx
└── index.css
