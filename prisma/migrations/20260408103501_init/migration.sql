/*
  Warnings:

  - You are about to drop the column `link` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `aId` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `bId` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `endsAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `rsvpUrl` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `applyUrl` on the `Gig` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Gig` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Gig` table. All the data in the column will be lost.
  - You are about to drop the column `salaryRange` on the `Gig` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Gig` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `meta` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `batch` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `initials` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `roleTitle` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromId` to the `Connection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toId` to the `Connection` table without a default value. This is not possible if the table is not empty.
  - Made the column `mode` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `Gig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Gig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `body` on table `Notification` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gigId" TEXT,
    "company" TEXT NOT NULL,
    "roleTitle" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Application" ("company", "createdAt", "id", "status", "updatedAt", "userId") SELECT "company", "createdAt", "id", "status", "updatedAt", "userId" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
CREATE TABLE "new_Connection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Connection_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Connection_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Connection" ("createdAt", "id") SELECT "createdAt", "id" FROM "Connection";
DROP TABLE "Connection";
ALTER TABLE "new_Connection" RENAME TO "Connection";
CREATE UNIQUE INDEX "Connection_fromId_toId_key" ON "Connection"("fromId", "toId");
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "startsAt" DATETIME NOT NULL,
    "mode" TEXT NOT NULL,
    "location" TEXT,
    "description" TEXT NOT NULL,
    "attendees" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Event" ("createdAt", "description", "id", "location", "mode", "startsAt", "title", "updatedAt") SELECT "createdAt", "description", "id", "location", "mode", "startsAt", "title", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE TABLE "new_Gig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "salaryBand" TEXT,
    "description" TEXT NOT NULL,
    "tagsJson" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Gig" ("company", "createdAt", "description", "id", "location", "title", "type", "updatedAt") SELECT "company", "createdAt", "description", "id", "location", "title", "type", "updatedAt" FROM "Gig";
DROP TABLE "Gig";
ALTER TABLE "new_Gig" RENAME TO "Gig";
CREATE TABLE "new_Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "href" TEXT,
    "readAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Notification" ("body", "createdAt", "href", "id", "readAt", "title", "userId") SELECT "body", "createdAt", "href", "id", "readAt", "title", "userId" FROM "Notification";
DROP TABLE "Notification";
ALTER TABLE "new_Notification" RENAME TO "Notification";
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorId", "content", "createdAt", "id") SELECT "authorId", "content", "createdAt", "id" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "headline" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "company" TEXT,
    "title" TEXT,
    "batchYear" INTEGER,
    "skillsJson" TEXT NOT NULL DEFAULT '[]',
    "avatarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("avatarUrl", "bio", "company", "createdAt", "headline", "id", "title", "updatedAt", "userId") SELECT "avatarUrl", "bio", "company", "createdAt", "headline", "id", "title", "updatedAt", "userId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "verifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "passwordHash", "role", "updatedAt") SELECT "createdAt", "email", "id", "passwordHash", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
