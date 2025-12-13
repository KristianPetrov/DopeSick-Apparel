import { boolean, date, index, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const intakeSubmissions = pgTable("intake_submissions", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),

  // Personal
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: text("gender"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address1: text("address1").notNull(),
  address2: text("address2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),

  // Emergency
  emergencyName: text("emergency_name").notNull(),
  emergencyRelationship: text("emergency_relationship").notNull(),
  emergencyPhone: text("emergency_phone").notNull(),

  // Insurance
  uninsured: boolean("uninsured").notNull().default(false),
  insuranceProvider: text("insurance_provider"),
  memberId: text("member_id"),
  groupNumber: text("group_number"),
  insuredName: text("insured_name"),

  // Substance Use
  primarySubstance: text("primary_substance").notNull(),
  otherSubstances: text("other_substances"),
  frequency: text("frequency").notNull(),
  duration: text("duration").notNull(),
  lastUseDate: text("last_use_date"),
  routeOfUse: text("route_of_use"),
  amountPerUse: text("amount_per_use"),

  // Medical & Mental Health
  currentMedications: text("current_medications"),
  allergies: text("allergies"),
  chronicConditions: text("chronic_conditions"),
  mentalHealthDiagnoses: text("mental_health_diagnoses"),
  suicideRisk: text("suicide_risk"),
  seizuresHistory: text("seizures_history"),
  pregnancyStatus: text("pregnancy_status"),

  // Treatment & Legal
  priorTreatment: text("prior_treatment"),
  priorFacilities: text("prior_facilities"),
  legalIssues: text("legal_issues"),
  courtMandated: text("court_mandated"),
  probationOfficer: text("probation_officer"),
  detoxNeeded: text("detox_needed"),

  // Consent
  hipaaConsent: boolean("hipaa_consent").notNull(),
  contactConsent: boolean("contact_consent").notNull(),
  agreeToTerms: boolean("agree_to_terms").notNull(),

  // Client-provided timestamp
  submittedAt: text("submitted_at"),
});

export type IntakeSubmission = typeof intakeSubmissions.$inferSelect;
export type NewIntakeSubmission = typeof intakeSubmissions.$inferInsert;

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    name: text("name"),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    role: text("role").notNull().default("user"), // "user" | "admin"
  },
  (t) => ({
    emailUnique: uniqueIndex("users_email_unique").on(t.email),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    userId: text("user_id"),
    customerName: text("customer_name"),
    email: text("email").notNull(),
    itemsJson: text("items_json").notNull(), // JSON string
    status: text("status").notNull().default("new"), // new | processing | shipped | cancelled
  },
  (t) => ({
    emailIdx: index("orders_email_idx").on(t.email),
  }),
);

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export const providerApplications = pgTable(
  "provider_applications",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),

    // Organization
    organizationName: text("organization_name").notNull(),
    organizationType: text("organization_type").notNull(), // detox | rehab | sober_living | outpatient | other
    website: text("website"),

    // Contact
    contactName: text("contact_name").notNull(),
    contactTitle: text("contact_title"),
    contactEmail: text("contact_email").notNull(),
    contactPhone: text("contact_phone"),

    // Location
    address1: text("address1"),
    address2: text("address2"),
    city: text("city"),
    state: text("state"),
    zip: text("zip"),

    // Program details
    services: text("services"),
    levelsOfCare: text("levels_of_care"),
    acceptsInsurance: boolean("accepts_insurance").notNull().default(false),
    notes: text("notes"),

    // Meta
    status: text("status").notNull().default("new"), // new | reviewed | contacted | approved | rejected
    agreeToContact: boolean("agree_to_contact").notNull(),
    submittedAt: text("submitted_at"),
  },
  (t) => ({
    createdAtIdx: index("provider_applications_created_at_idx").on(t.createdAt),
    contactEmailIdx: index("provider_applications_contact_email_idx").on(t.contactEmail),
    statusIdx: index("provider_applications_status_idx").on(t.status),
  }),
);

export type ProviderApplication = typeof providerApplications.$inferSelect;
export type NewProviderApplication = typeof providerApplications.$inferInsert;

