---
title: "UTHM Dental Appointment System with Role Based Access Control RBAC"
description: "Secure web-based Dental Appointment Management System with Role-Based Access Control (RBAC), authentication hardening, encrypted data handling, and real-world healthcare security considerations. Built using PHP, MySQL, and Agile methodology."
techStack:

github: "https://github.com/MishaSaifuddin/UTHM-Dental-Appointment-System-with-Role-Based-Access-Control-RBAC"
date: "2026-01-06"
---

## Overview

Secure web-based Dental Appointment Management System with Role-Based Access Control (RBAC), authentication hardening, encrypted data handling, and real-world healthcare security considerations. Built using PHP, MySQL, and Agile methodology.

## Repository

View the source code: [MishaSaifuddin/UTHM-Dental-Appointment-System-with-Role-Based-Access-Control-RBAC](https://github.com/MishaSaifuddin/UTHM-Dental-Appointment-System-with-Role-Based-Access-Control-RBAC)

- **Language**: N/A
- **Stars**: 1
- **Forks**: 0
- **Updated**: 2026-09-07


---

Secure web-based Dental Appointment Management System with Role-Based Access Control (RBAC), authentication hardening, encrypted data handling, and real-world healthcare security considerations. Built using PHP, MySQL, and Agile methodology.
This project demonstrates my ability to:
- Design secure systems using RBAC
- Protect sensitive data with modern authentication practices
- Build scalable, maintainable backend logic
- Apply Agile development in a real-world scenario

# 🦷 UTHM Dental Appointment System with Role-Based Access Control (RBAC)

A secure, web-based dental appointment management system developed for **Universiti Tun Hussein Onn Malaysia (UTHM) Health Center**, designed to replace manual appointment workflows with a **scalable, secure, and efficient digital solution**. This project emphasizes **information security, role-based access control, and secure system design**, making it suitable as a **professional portfolio project** for software engineering and cybersecurity roles.

---

## 📌 Project Overview

The UTHM Dental Appointment System automates the scheduling, management, and monitoring of dental appointments for students and staff.  
The system eliminates manual paperwork, reduces scheduling conflicts, and ensures **confidential handling of sensitive patient data** through modern security practices.
The system was developed using the **Agile methodology**, enabling iterative development, stakeholder feedback, and continuous improvement.

---

## 🎯 Objectives

- Design a **secure web-based appointment system** using Role-Based Access Control (RBAC)
- Implement strong **authentication and authorization mechanisms**
- Protect sensitive patient data using **modern security controls**
- Improve operational efficiency for dental staff and administrators
- Provide a **user-friendly experience** for patients, dentists, and staff

---

---

## 🛡️ Threat Model (Analyst Perspective)

### Identified Threats
- Unauthorized access to patient records
- Privilege escalation between user roles
- Credential compromise
- Injection-based attacks (SQL Injection, XSS)
- Session hijacking
- Data exposure through misconfigured access controls

### Mitigations Implemented
| Threat | Mitigation |
|------|----------|
| Unauthorized Access | Role-Based Access Control (RBAC) |
| Credential Theft | Password hashing (BCRYPT) |
| SQL Injection | Input validation & parameterized queries |
| XSS | Output encoding & sanitization |
| Session Hijacking | Secure session handling |
| Insider Threats | Role separation & access logging |

---

## 🔐 Key Security Features

- **Role-Based Access Control (RBAC)**
  - Access permissions based on user roles (Admin, Dentist, Staff, Patient)
  - Prevents unauthorized access to sensitive data

- **End-to-End Encryption (E2EE)**
  - Protects data during transmission
  - Ensures confidentiality of appointment and patient information

- **Password Hashing (BCRYPT)**
  - Secure storage of credentials using PHP `password_hash()`
  - Prevents password exposure even if database is compromised

- **Input Validation**
  - Prevents SQL Injection and Cross-Site Scripting (XSS)
  - Ensures data integrity and application stability

- **Two-Factor Authentication (2FA)**
  - Adds an extra security layer during login
  - Protects privileged accounts from unauthorized access

- **Secure Database Authorization**
  - Restricts read/write operations based on user roles
  - Centralized and controlled access to patient records

---

## 🧩 Core System Modules

### 1. User Authentication & Registration
- Secure login and role assignment
- Admin-controlled registration for staff and dentists

### 2. Appointment Scheduling
- Real-time availability of time slots
- Book, view, cancel, or update appointments
- Automated email confirmations

### 3. Patient Management
- Secure access to patient dental records
- Appointment history tracking
- Dentist-only access to sensitive medical information

### 4. Notification System
- Automated email notifications for:
  - Registration confirmation
  - Appointment approval/rejection
  - Appointment reminders

### 5. Dashboard & Reporting
- Real-time system metrics
- Appointment trends and service utilization
- Admin-level analytical insights

---

## 🛠️ Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- PHP
- Java

**Database**
- MySQL

**Security & Tools**
- RBAC
- PHPMailer (Email Notifications)
- XAMPP
- Visual Studio Code

---

## 🧪 Testing & Validation

- **Functional Testing**
  - Appointment booking, cancellation, and notifications

- **Security Testing**
  - RBAC enforcement
  - Authentication and authorization checks
  - Input validation testing

- **User Acceptance Testing (UAT)**
  - Feedback from students and health center staff
  - Validation of usability and system performance

---

## 🚀 Expected Impact

- Reduced administrative workload
- Elimination of appointment conflicts
- Improved patient experience
- Strong data protection and compliance
- Scalable architecture suitable for institutional use

---

## 📈 Why This Project Matters

This system demonstrates:
- **Secure system design**
- **Practical RBAC implementation**
- **Real-world healthcare data protection**
- **Full SDLC experience using Agile**
- **Industry-relevant cybersecurity practices**

It reflects the skills required for roles such as:
- Software Engineer
- Backend Developer
- Cybersecurity Analyst
- Information Security Engineer

---

## 📄 License

This project was developed as part of a **Bachelor of Computer Science (Information Security)** final year project at **Universiti Tun Hussein Onn Malaysia (UTHM)**.

---

## 👩‍💻 Author
🔐 Focused on Secure Systems, Databases & Cybersecurity  
📌 This project is part of my professional portfolio and demonstrates my readiness for **industry-level software and security roles**.

---