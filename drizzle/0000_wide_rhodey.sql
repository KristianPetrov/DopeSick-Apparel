CREATE TABLE "intake_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"date_of_birth" date NOT NULL,
	"gender" text,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"address1" text NOT NULL,
	"address2" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip" text NOT NULL,
	"emergency_name" text NOT NULL,
	"emergency_relationship" text NOT NULL,
	"emergency_phone" text NOT NULL,
	"uninsured" boolean DEFAULT false NOT NULL,
	"insurance_provider" text,
	"member_id" text,
	"group_number" text,
	"insured_name" text,
	"primary_substance" text NOT NULL,
	"other_substances" text,
	"frequency" text NOT NULL,
	"duration" text NOT NULL,
	"last_use_date" text,
	"route_of_use" text,
	"amount_per_use" text,
	"current_medications" text,
	"allergies" text,
	"chronic_conditions" text,
	"mental_health_diagnoses" text,
	"suicide_risk" text,
	"seizures_history" text,
	"pregnancy_status" text,
	"prior_treatment" text,
	"prior_facilities" text,
	"legal_issues" text,
	"court_mandated" text,
	"probation_officer" text,
	"detox_needed" text,
	"hipaa_consent" boolean NOT NULL,
	"contact_consent" boolean NOT NULL,
	"agree_to_terms" boolean NOT NULL,
	"submitted_at" text
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" text,
	"customer_name" text,
	"email" text NOT NULL,
	"items_json" text NOT NULL,
	"status" text DEFAULT 'new' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL
);
--> statement-breakpoint
CREATE INDEX "orders_email_idx" ON "orders" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");