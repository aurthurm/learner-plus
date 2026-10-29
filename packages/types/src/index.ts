export type UserRole = 'STUDENT' | 'TEACHER' | 'TUTOR' | 'SCHOOL_ADMIN' | 'TENANT_ADMIN' | 'PLATFORM_ADMIN';

export interface User {
  id: string;
  email: string;
  phoneNumber?: string;
  name: string;
  role: UserRole;
  tenantId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TutorProfile {
  id: string;
  userId: string;
  bio: string;
  qualifications: string[];
  subjects: string[];
  hourlyRate: number;
  availability: Record<string, string[]>; // e.g. { "monday": ["09:00-10:00"] }
  rating: number;
  verified: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  tutorId: string;
  startTime: Date;
  endTime: Date;
  price: number;
  meetingUrl?: string;
  isGroup: boolean;
  maxParticipants?: number;
}

export interface Booking {
  id: string;
  lessonId: string;
  studentId: string;
  amountPaid: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  paymentId?: string;
  createdAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  fileUrl: string;
  fileType: string;
  price: number;
  isRental: boolean;
  rentalDurationDays?: number;
  createdAt: Date;
}

export interface MaterialAttachment {
  id: string;
  title: string;
  notes?: string;
  fileName: string;
  fileSize?: string;
  order: number;
}

export interface GroupCohort {
  id: string;
  title: string;
  subject: string;
  curriculum: string;
  schedule: string;
  price: number;
  seats: number;
  registeredCount: number;
  description: string;
  miniDescription: string;
  attachments: MaterialAttachment[];
  publishStatus?: 'draft' | 'published' | 'archived';
}

export interface AvailSlot {
  id: string;
  day: string;
  time: string;
  subject: string;
  status: string;
  description: string;
  miniDescription: string;
  attachments: MaterialAttachment[];
  publishStatus?: 'draft' | 'published' | 'archived';
}

export interface DigitalResource {
  id: string;
  title: string;
  curriculum: string;
  audience: string;
  type: string;
  price: number;
  downloads: number;
  revenue: number;
  description: string;
  miniDescription: string;
  attachments: MaterialAttachment[];
  publishStatus?: 'draft' | 'published' | 'archived';
}


