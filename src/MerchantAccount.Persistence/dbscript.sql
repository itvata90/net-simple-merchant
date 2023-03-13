﻿CREATE TABLE "Members" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "Username" character varying(50) NULL,
    "FirstName" character varying(50) NULL,
    "LastName" character varying(50) NULL,
    "CreatedOnUtc" timestamp with time zone NOT NULL,
    "ModifiedOnUtc" timestamp with time zone NOT NULL,
    "MerchantId" integer NOT NULL,
    CONSTRAINT "PK_Members" PRIMARY KEY ("Id")
);


CREATE TABLE "MemberDetails" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "BirthDate" character varying(50) NULL,
    "Nationality" character varying(50) NULL,
    "Province" character varying(50) NULL,
    "District" character varying(50) NULL,
    "Street" character varying(50) NULL,
    "Email" character varying(50) NULL,
    "Phone" text NULL,
    "MemberId" integer NOT NULL,
    "CreatedOnUtc" timestamp with time zone NOT NULL,
    "ModifiedOnUtc" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_MemberDetails" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_MemberDetails_Members_MemberId" FOREIGN KEY ("MemberId") REFERENCES "Members" ("Id") ON DELETE CASCADE
);


CREATE TABLE "Merchants" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "Name" character varying(50) NULL,
    "Province" character varying(50) NULL,
    "District" character varying(50) NULL,
    "Street" character varying(50) NULL,
    "Email" character varying(50) NULL,
    "Phone" text NULL,
    "OwnerId" integer NOT NULL,
    "Status" text NULL,
    "CreatedOnUtc" timestamp with time zone NOT NULL,
    "ModifiedOnUtc" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_Merchants" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Merchants_Members_OwnerId" FOREIGN KEY ("OwnerId") REFERENCES "Members" ("Id") ON DELETE CASCADE
);


CREATE UNIQUE INDEX "IX_MemberDetails_MemberId" ON "MemberDetails" ("MemberId");


CREATE UNIQUE INDEX "IX_Merchants_OwnerId" ON "Merchants" ("OwnerId");

