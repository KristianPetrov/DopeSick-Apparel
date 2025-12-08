import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const intakeSubmissions = sqliteTable("intake_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  // Personal
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
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
  uninsured: integer("uninsured", { mode: "boolean" }).notNull().default(false),
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
  hipaaConsent: integer("hipaa_consent", { mode: "boolean" }).notNull(),
  contactConsent: integer("contact_consent", { mode: "boolean" }).notNull(),
  agreeToTerms: integer("agree_to_terms", { mode: "boolean" }).notNull(),

  // Client-provided timestamp
  submittedAt: text("submitted_at"),
});

export type IntakeSubmission = typeof intakeSubmissions.$inferSelect;
export type NewIntakeSubmission = typeof intakeSubmissions.$inferInsert;


