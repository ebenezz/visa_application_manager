# 🌍 Visa Application Manager

A full-stack web application for managing visa applications, countries, notifications, and admin workflows — built with Angular, ASP.NET Core, and Entity Framework Core.

---

## 🚀 Features

- 📝 Submit and track visa applications
- 🌐 Manage country-specific visa requirements and fees
- 🔔 Admin notifications and audit logging
- 👥 Role-based access control (Admin vs SuperAdmin)
- 📊 Dashboard with summary cards and charts
- 🛡️ Secure login with JWT authentication
- 🧠 Intelligent helpdesk assistant (planned)

---

## 🧱 Tech Stack

| Layer         | Technology                          |
|--------------|--------------------------------------|
| Frontend      | Angular 20, Angular Material         |
| Backend       | ASP.NET Core Web API                 |
| Database      | SQL Server + Entity Framework Core   |
| Auth          | JWT-based authentication             |
| Dev Tools     | Visual Studio, VS Code, Postman      |

---

## 🛠️ Setup Instructions

### 🔧 Backend (.NET Core)

1. **Clone the repo**  
   `git clone https://github.com/your-org/visa-manager-api.git`

2. **Apply migrations**  
   `dotnet ef database update`

3. **Run the API**  
   `dotnet run`

> Default URL: `http://localhost:5226/api`

---

### 🖥️ Frontend (Angular)

1. **Navigate to frontend folder**  
   `cd visa-manager-ui`

2. **Install dependencies**  
   `npm install`

3. **Run the app**  
   `ng serve`

> Default URL: `http://localhost:4200`

---

## 🔐 Admin Roles

| Username     | Password       | Role        |
|--------------|----------------|-------------|
| superadmin   | supersecure     | SuperAdmin  |
| admin        | admin123        | Admin       |

> Passwords are plaintext in seed data — hash before production deployment.

---

## 🧩 Architecture Overview

- **Modular Angular components** with standalone routing
- **EF Core models** for `Application`, `Country`, `Admin`, `AuditLog`, `Document`
- **Role-based guards** and JWT decoding for secure access
- **Audit logging** for sensitive actions (planned)
- **Helpdesk chatbot** integration with Rasa (planned)

---

## 📈 Dashboard Summary

- Total applications
- Approved / Rejected / Pending breakdown
- Payment status chart
- Real-time route tracking via `NavigationEnd`

---

## 🧪 Testing

- Backend: xUnit + Moq (planned)
- Frontend: Jasmine + Karma
- API: Postman collections available in `/docs`

---

## 📦 Deployment

- Frontend: Azure Static Web Apps / Firebase Hosting
- Backend: Azure App Service / Docker
- Database: Azure SQL / PostgreSQL

---

## 🧠 Future Enhancements

- Multilingual support
- Intelligent helpdesk assistant
- Audit log viewer
- Admin creation workflow with approval
- Role hierarchy and granular permissions

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Submit a pull request with clear description

---

## 📄 License

MIT License © 2025 Abenezer

---

## 📬 Contact

For questions, feedback, or collaboration:
**Email:** abenezerted3@gmail.com  

