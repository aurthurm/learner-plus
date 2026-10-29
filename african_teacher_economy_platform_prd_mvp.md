# Product Requirements Document (PRD)
# African Teacher Economy Platform (MVP)

## 1. Executive Summary

The African Teacher Economy Platform is a multi-tenant digital learning ecosystem that combines:

- Tutor marketplace
- Virtual classroom infrastructure
- Teacher resource marketplace
- Lesson planning and delivery tools
- Recorded learning marketplace
- School and academy tenancy

The platform enables teachers, tutors, schools, and academies to:

- Teach live online classes
- Conduct one-on-one tutoring
- Sell and rent educational resources
- Plan lessons
- Manage students and classrooms
- Record and resell classes
- Earn recurring income from educational content

The platform is designed primarily for Zimbabwe and broader African education markets where:

- teachers are underpaid,
- educational resources are fragmented,
- tutoring already exists informally,
- WhatsApp is dominant,
- mobile-first and low-bandwidth access are critical.

The MVP focuses on validating:

1. Teacher onboarding and monetization
2. Student demand for live online learning
3. Educational resource marketplace viability
4. Live classroom experience
5. Recorded lesson monetization
6. Group revision class demand

---

# 2. Vision

To become Africa’s digital infrastructure for educators by enabling teachers to:

- earn online,
- distribute educational content,
- teach virtually,
- build audiences,
- and operate digital classrooms.

---

# 3. Problem Statement

## Teachers

Teachers in Zimbabwe and many African countries:

- are underpaid,
- spend excessive time preparing lessons,
- repeatedly recreate educational materials,
- lack monetization channels,
- run tutoring informally through WhatsApp,
- lack tools for online teaching,
- cannot easily distribute or license educational content.

## Students

Students:

- struggle to access quality tutors,
- rely on fragmented WhatsApp groups,
- lack structured revision resources,
- lack reliable online classrooms,
- cannot easily discover quality educational content.

## Schools and Academies

Schools and tutoring centers:

- lack affordable digital classroom infrastructure,
- lack LMS systems,
- lack scalable online teaching capabilities,
- struggle to manage hybrid learning.

---

# 4. Product Goals

## Primary Goals

1. Enable teachers to earn online.
2. Enable students to access quality live learning.
3. Create a marketplace for African educational resources.
4. Enable virtual teaching at low bandwidth.
5. Enable recorded lesson monetization.
6. Support school and academy multi-tenancy.

## Secondary Goals

1. Build AI-assisted teaching tools.
2. Build curriculum-aligned educational libraries.
3. Expand into enterprise school infrastructure.
4. Create teacher creator-economy network effects.

---

# 5. Target Users

## Primary Users

### Teachers

- Secondary school teachers
- A-Level teachers
- University tutors
- Private tutors
- STEM tutors
- Exam revision instructors
- Coding instructors

### Students

- Secondary school students
- A-Level students
- University students
- Adult learners
- Exam preparation students

## Secondary Users

### Organizations

- Schools
- Tutoring centers
- Academies
- NGOs
- Training institutes
- Teacher colleges

---

# 6. MVP Scope

The MVP includes:

1. User authentication
2. Tutor marketplace
3. Teacher resource marketplace
4. Virtual classrooms
5. Interactive whiteboards
6. Live chat
7. One-on-one lessons
8. Group lessons
9. Recording and replay
10. Resource uploads
11. Resource rental and purchases
12. Lesson planning
13. Student booking system
14. Basic payments
15. Multi-tenant support
16. Admin moderation
17. WhatsApp notifications

The MVP excludes:

- AI teaching agents
- Automated marking
- Mobile native apps
- Full school ERP functionality
- Advanced analytics
- Adaptive learning
- Deep curriculum intelligence

---

# 7. Core Product Modules

# 7.1 Authentication & Identity

## Features

- Email registration
- Phone registration
- OTP verification
- Password reset
- Social login (future)
- Role-based access control
- Multi-tenant authentication

## Roles

- Student
- Teacher
- Tutor
- School Admin
- Tenant Admin
- Platform Admin

---

# 7.2 Tutor Marketplace

## Features

### Tutor Profiles

Teachers/tutors can:

- create profiles,
- upload profile pictures,
- add qualifications,
- add subjects,
- set hourly pricing,
- define availability,
- add teaching experience,
- upload certifications.

### Student Discovery

Students can:

- search tutors,
- filter by subject,
- filter by level,
- filter by pricing,
- filter by language,
- filter by ratings,
- filter by online availability.

### Booking System

Students can:

- book lessons,
- schedule sessions,
- reschedule sessions,
- cancel sessions,
- pay for sessions.

---

# 7.3 Teacher Resource Marketplace

## Resource Types

- Lesson plans
- Worksheets
- PDFs
- Slides
- Tests
- Exam papers
- Marking schemes
- Notes
- Recorded lessons
- Interactive resources

## Monetization Models

### One-Time Purchase

Permanent access.

### Time-Limited Rental

Examples:

- 1 day
- 1 week
- 1 month
- 1 term

### Subscription Access

Monthly access to libraries.

### Institutional Licensing

School-wide licensing.

## Features

### Teachers

Teachers can:

- upload resources,
- set pricing,
- define rental duration,
- create bundles,
- manage versions,
- view analytics.

### Students/Teachers

Users can:

- browse resources,
- preview resources,
- purchase/rent resources,
- bookmark resources,
- rate resources,
- download resources.

---

# 7.4 Virtual Classroom System

## Core Technology

### BigBlueButton

Used for:

- video conferencing,
- audio conferencing,
- screen sharing,
- collaborative whiteboards,
- breakout rooms,
- polling,
- chat,
- recordings.

## Features

### One-on-One Classes

- tutor and student rooms
- scheduled sessions
- private chat
- whiteboard collaboration

### Group Classes

- multi-student participation
- breakout rooms
- moderated chat
- polls
- attendance tracking

### Whiteboard

Features:

- drawing
- annotations
- diagrams
- math writing
- multi-user collaboration
- presentation annotations

### Recording

Support:

- audio recording
- teacher video
- whiteboard capture
- screen recording
- replay access

---

# 7.5 Lesson Planning System

## Features

Teachers can:

- create lesson plans,
- create schemes of work,
- attach resources,
- attach quizzes,
- reuse lesson templates,
- schedule lessons.

## Resource Integration

Teachers can:

- import rented resources into lesson plans,
- reuse purchased resources,
- clone plans.

---

# 7.6 Recorded Learning Marketplace

## Features

Teachers can:

- upload recordings,
- convert live lessons into courses,
- create revision series,
- create bundled courses,
- monetize recordings.

Students can:

- stream recordings,
- purchase access,
- save lessons,
- continue playback.

## Recording Types

### Private Lessons

Not public by default.

### Group Revision Sessions

Can be sold if consented.

### Studio Lessons

Teacher-only recording format.

---

# 7.7 Messaging & Notifications

## Features

- in-app messaging
- lesson reminders
- booking confirmations
- WhatsApp notifications & conversational AI agents
- email notifications
- class alerts

## WhatsApp Integration & AI Agents

### Conversational Agents (WhatsApp Business API + LLM Integration)

- **Tutor Matchmaker Agent (Parents/Students):** Users search and discover tutors, check pricing, and get booking suggestions using natural language.
- **Low-Bandwidth Study Companion (Students):** Students interact with an AI tutor via text and photo uploads (OCR) to get homework help or solve curriculum questions (ZIMSEC/Cambridge past papers) without video data costs.
- **Teacher Prep Assistant (Teachers):** Teachers dictate voice messages to generate standard lesson plan outlines, quizzes, or assignments directly stored to their account draft space.

### Operational Notifications

- lesson reminders
- tutor alerts
- assignment reminders
- payment confirmations
- revision announcements

---

# 7.8 Multi-Tenant Architecture

## Tenant Types

- Schools
- Academies
- Tutoring centers
- Independent tutor brands
- Universities

## Tenant Features

Each tenant gets:

- branding,
- logo,
- teachers,
- students,
- classrooms,
- analytics,
- resource libraries.

---

# 7.9 Payments

## MVP Payment Methods

- Paynow
- EcoCash workflows
- ZIPIT workflows
- Bank transfer workflows
- Cash reconciliation support

## Payment Flows

### Tutoring Payments

Student pays:

- tutor fee
- platform commission

### Resource Marketplace

User pays:

- resource cost
- optional subscription fees

### Tenant Subscriptions

Schools pay:

- monthly platform subscription

---

# 7.10 Admin & Moderation

## Features

Admins can:

- approve teachers,
- moderate resources,
- review reports,
- suspend users,
- monitor classrooms,
- manage disputes,
- manage payouts.

---

# 8. Non-Functional Requirements

# 8.1 Performance

- Support low-bandwidth usage
- PWA support
- Fast loading pages
- Optimized media streaming
- Recording compression

---

# 8.2 Scalability

System must support:

- thousands of students,
- concurrent classrooms,
- multiple tenants,
- large media storage.

---

# 8.3 Security

- JWT authentication
- RBAC authorization
- encrypted passwords
- signed classroom access
- secure media access
- audit logs
- tenant isolation

---

# 8.4 Multi-Tenancy

Recommended architecture:

- shared application layer,
- tenant-isolated database schemas,
- tenant branding support.

---

# 8.5 Availability

Target:

- 99.5% uptime MVP

---

# 8.6 Observability

- structured logging
- audit trails
- monitoring dashboards
- classroom monitoring
- payment logs

---

# 9. Recommended Open Source Stack

# Frontend

## Web

- Next.js (TypeScript)
- React
- TailwindCSS
- TanStack Query

## Mobile (Future)

- Flutter

---

# Backend (TypeScript Full-Stack)

- NestJS (Modular Core Architecture)
- Fastify (Underlying HTTP adapter for NestJS - high performance)
- Hono (Edge/Serverless deployable router for lightweight WhatsApp webhook gateways)
- Drizzle ORM or Prisma (TypeScript SQL Query Builder & Migrations)
- Vercel AI SDK (Unified AI/LLM routing interface)

---

# Database

- PostgreSQL (with schema-based isolation for multi-tenancy)

---

# Caching & Queues

- Redis (Session caching & event bus)
- BullMQ (TypeScript Redis-backed task & message queues)

---

# Live Classroom

- BigBlueButton (WebRTC virtual classroom)

---

# Object Storage

- MinIO or AWS S3 Compatible Storage

---

# Search

- Meilisearch

---

# Realtime & WebSockets

- WS / Socket.IO (TypeScript Node.js libraries for live syncing & whiteboard status)

---

# Containerization

- Docker
- Docker Compose
- Kubernetes (future)

---

# Reverse Proxy

- Caddy or Traefik

---

# Analytics

- PostHog

---

# 10. High-Level Architecture & Services

## Core Services

### Identity Service (NestJS)

Handles:

- authentication
- authorization
- tenant resolution

### Marketplace Service (NestJS)

Handles:

- tutor marketplace
- resource marketplace
- purchases
- rentals

### Classroom Service (NestJS)

Handles:

- classroom orchestration
- BBB integration
- recordings
- attendance

### Resource Service (NestJS)

Handles:

- uploads
- previews
- licensing
- downloads

### Payments Service (NestJS)

Handles:

- transactions
- commissions
- payouts
- subscriptions

### WhatsApp & Agent Service (Hono Edge Gateway)

Handles:

- Twilio / WhatsApp Business API webhooks
- AI agent workflow orchestration (with LangChain/Vercel AI SDK)
- BullMQ messaging tasks to offload notifications
- Local language translation mappings (Shona/Ndebele/English)

---

# 11. Suggested MVP Rollout

# Phase 1

## Marketplace + Live Tutoring

Features:

- authentication
- tutor profiles
- tutor booking
- live classrooms
- payments
- messaging

Goal:

Validate live tutoring demand.

---

# Phase 2

## Teacher Resource Marketplace

Features:

- resource uploads
- purchases
- rentals
- previews
- downloads

Goal:

Validate teacher creator economy.

---

# Phase 3

## Recorded Learning Marketplace

Features:

- lesson recording
- replay
- course creation
- subscriptions

Goal:

Build scalable recurring revenue.

---

# Phase 4

## School Tenancy

Features:

- branded tenants
- teacher management
- institutional billing

Goal:

Expand into schools and academies.

---

# 12. Risks

## Technical Risks

- video infrastructure costs
- recording storage growth
- bandwidth challenges
- scaling live classrooms

## Business Risks

- teacher adoption
- payment fragmentation
- content piracy
- marketplace trust
- curriculum quality control

## Operational Risks

- moderation load
- payout disputes
- copyright issues
- tenant support complexity

---

# 13. Future Vision

## AI-Assisted Teaching

- lesson generation
- quiz generation
- automated marking
- AI tutoring assistants
- curriculum alignment

## Enterprise School Platform

- school LMS
- attendance systems
- grading systems
- parent portals

## Regional Expansion

- Zimbabwe
- Zambia
- Botswana
- South Africa
- East Africa

---

# 14. Success Metrics

## Marketplace Metrics

- active tutors
- active students
- tutoring bookings
- resource purchases

## Classroom Metrics

- classroom attendance
- session duration
- recording usage

## Revenue Metrics

- GMV
- subscription revenue
- tutor earnings
- resource sales

## Engagement Metrics

- DAU/MAU
- lesson completion
- repeat bookings
- resource reuse

---

# 15. Strategic Positioning

The platform is not merely:

- a tutoring platform,
- a classroom tool,
- or a resource marketplace.

It is:

# “Digital infrastructure for African educators.”

The long-term moat is:

- teacher creator economy,
- curriculum-aligned educational assets,
- classroom infrastructure,
- and localized educational workflows.

