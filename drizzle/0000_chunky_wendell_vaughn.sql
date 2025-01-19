CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(50),
	"source" varchar(50) NOT NULL,
	"stage" varchar(50) DEFAULT 'New Lead' NOT NULL,
	"owner" varchar(255) NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
