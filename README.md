# LostLink

LostLink is an AI-assisted organizational lost and found management platform designed for small communities, offices, institutions, campuses, and other controlled environments.

The system provides a centralized platform where users can report lost and found items, upload supporting images, search for items, communicate with other users, submit claims, and contact administrators. Administrators can manage users, complaints, claims, messages, uploaded files, and item records through an administrative interface.

## Features

### User Features

- User registration and login
- User approval system
- Report lost items
- Report found items
- Upload images for reported items
- Manually search lost and found items
- AI-assisted item search and matching
- View reported items
- Claim lost items
- Handle item claim requests
- Messaging between users
- Submit complaints to administrators
- Access uploaded files related to items and reports

### Admin Features

- Admin authentication
- Approve registered users
- View and manage users
- View lost and found item records
- Manage item claims
- Handle user complaints
- Communicate with users
- View archived messages
- Download uploaded files
- Maintain permanent lost and found records

## Technology Stack

### Backend

- Python
- Django
- Django REST Framework
- SQLite
- Django ORM
- REST APIs

### Frontend

- Angular
- TypeScript
- HTML5
- CSS3
- Bootstrap
- Angular Material

## Project Structure

```text
LostLink/
│
├── backend/
│   ├── api/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── about/
│   │       ├── admin-dashboard/
│   │       ├── admin-login/
│   │       ├── create-found-item/
│   │       ├── create-lost-item/
│   │       ├── dashboard/
│   │       ├── found-item-details/
│   │       ├── home/
│   │       ├── login/
│   │       ├── message-center/
│   │       ├── my-found-items/
│   │       ├── my-lost-items/
│   │       ├── register/
│   │       └── view-matches/
│   │
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md