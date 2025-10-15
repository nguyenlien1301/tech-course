export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum CommentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum CourseStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export enum CourseOptions {
  LATEST = "LATEST",
  FREE = "FREE",
}

export enum Courselevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
export enum RatingStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
}

export enum CouponType {
  PERCENT = "PERCENT",
  AMOUNT = "AMOUNT",
}

export enum UserStatus {
  ACTIVE = "ACTIVE", // đang hoạt động
  UNACTIVE = "UNACTIVE", // chưa kích hoạt
  BANED = "BANED", // bị cấm
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  EXPERT = "EXPERT",
}

export enum LessonType {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
}
