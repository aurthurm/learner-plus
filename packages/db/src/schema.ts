import { pgTable, uuid, text, varchar, timestamp, integer, boolean, decimal, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phoneNumber: varchar('phone_number', { length: 50 }),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('STUDENT'), // STUDENT, TEACHER, TUTOR, etc.
  tenantId: varchar('tenant_id', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const tutorProfiles = pgTable('tutor_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  bio: text('bio').notNull(),
  qualifications: text('qualifications').array().notNull(),
  subjects: text('subjects').array().notNull(),
  hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }).notNull(),
  availability: jsonb('availability').notNull().default({}),
  rating: decimal('rating', { precision: 3, scale: 2 }).notNull().default('0.00'),
  verified: boolean('verified').notNull().default(false),
});

export const lessons = pgTable('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  tutorId: uuid('tutor_id').notNull().references(() => tutorProfiles.id, { onDelete: 'cascade' }),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  meetingUrl: varchar('meeting_url', { length: 1024 }),
  isGroup: boolean('is_group').notNull().default(false),
  maxParticipants: integer('max_participants'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  amountPaid: decimal('amount_paid', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('PENDING'), // PENDING, CONFIRMED, CANCELLED, COMPLETED
  paymentId: varchar('payment_id', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const resources = pgTable('resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  teacherId: uuid('teacher_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  fileUrl: varchar('file_url', { length: 1024 }).notNull(),
  fileType: varchar('file_type', { length: 100 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  isRental: boolean('is_rental').notNull().default(false),
  rentalDurationDays: integer('rental_duration_days'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
