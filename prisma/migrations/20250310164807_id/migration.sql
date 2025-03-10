/*
  Warnings:

  - The primary key for the `AuditLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Barcode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdBy` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `Book` table. All the data in the column will be lost.
  - The primary key for the `BookStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BorrowedBook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Format` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Language` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PenaltyRule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Publisher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Recommendation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Translator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `createdById` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Made the column `label` on table `Role` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AuditLog" ("action", "entity", "entityId", "id", "timestamp", "userId") SELECT "action", "entity", "entityId", "id", "timestamp", "userId" FROM "AuditLog";
DROP TABLE "AuditLog";
ALTER TABLE "new_AuditLog" RENAME TO "AuditLog";
CREATE TABLE "new_Author" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Author" ("id", "isActive", "name") SELECT "id", "isActive", "name" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
CREATE TABLE "new_Barcode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Barcode_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Barcode" ("bookId", "code", "id", "isActive") SELECT "bookId", "code", "id", "isActive" FROM "Barcode";
DROP TABLE "Barcode";
ALTER TABLE "new_Barcode" RENAME TO "Barcode";
CREATE UNIQUE INDEX "Barcode_code_key" ON "Barcode"("code");
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "publishingDate" DATETIME NOT NULL,
    "publisherId" TEXT NOT NULL,
    "pageCount" INTEGER NOT NULL,
    "formatId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "summary" TEXT,
    "translatorId" TEXT,
    "edition" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "updatedAt" DATETIME,
    "updatedById" TEXT,
    "bookStatusId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "Book_bookStatusId_fkey" FOREIGN KEY ("bookStatusId") REFERENCES "BookStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Book_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_translatorId_fkey" FOREIGN KEY ("translatorId") REFERENCES "Translator" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Book_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_formatId_fkey" FOREIGN KEY ("formatId") REFERENCES "Format" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("bookStatusId", "createdAt", "edition", "formatId", "id", "isActive", "isbn", "languageId", "pageCount", "publisherId", "publishingDate", "summary", "title", "translatorId", "updatedAt") SELECT "bookStatusId", "createdAt", "edition", "formatId", "id", "isActive", "isbn", "languageId", "pageCount", "publisherId", "publishingDate", "summary", "title", "translatorId", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");
CREATE INDEX "Book_isbn_idx" ON "Book"("isbn");
CREATE TABLE "new_BookStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "label" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_BookStatus" ("id", "isActive", "key", "label") SELECT "id", "isActive", "key", "label" FROM "BookStatus";
DROP TABLE "BookStatus";
ALTER TABLE "new_BookStatus" RENAME TO "BookStatus";
CREATE TABLE "new_BorrowedBook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "barcodeId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "borrowedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATETIME NOT NULL,
    "returnDate" DATETIME,
    "fineValue" REAL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "BorrowedBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BorrowedBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BorrowedBook_barcodeId_fkey" FOREIGN KEY ("barcodeId") REFERENCES "Barcode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BorrowedBook" ("barcodeId", "bookId", "borrowedAt", "dueDate", "fineValue", "id", "isActive", "returnDate", "userId") SELECT "barcodeId", "bookId", "borrowedAt", "dueDate", "fineValue", "id", "isActive", "returnDate", "userId" FROM "BorrowedBook";
DROP TABLE "BorrowedBook";
ALTER TABLE "new_BorrowedBook" RENAME TO "BorrowedBook";
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Category" ("id", "isActive", "name") SELECT "id", "isActive", "name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE TABLE "new_Format" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "label" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Format" ("id", "isActive", "key", "label") SELECT "id", "isActive", "key", "label" FROM "Format";
DROP TABLE "Format";
ALTER TABLE "new_Format" RENAME TO "Format";
CREATE UNIQUE INDEX "Format_key_key" ON "Format"("key");
CREATE TABLE "new_Language" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "label" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Language" ("id", "isActive", "key", "label") SELECT "id", "isActive", "key", "label" FROM "Language";
DROP TABLE "Language";
ALTER TABLE "new_Language" RENAME TO "Language";
CREATE UNIQUE INDEX "Language_key_key" ON "Language"("key");
CREATE TABLE "new_PenaltyRule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "finePerDay" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_PenaltyRule" ("createdAt", "description", "finePerDay", "id", "isActive") SELECT "createdAt", "description", "finePerDay", "id", "isActive" FROM "PenaltyRule";
DROP TABLE "PenaltyRule";
ALTER TABLE "new_PenaltyRule" RENAME TO "PenaltyRule";
CREATE TABLE "new_Publisher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Publisher" ("id", "isActive", "name") SELECT "id", "isActive", "name" FROM "Publisher";
DROP TABLE "Publisher";
ALTER TABLE "new_Publisher" RENAME TO "Publisher";
CREATE UNIQUE INDEX "Publisher_name_key" ON "Publisher"("name");
CREATE TABLE "new_Recommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Recommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Recommendation_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recommendation" ("bookId", "createdAt", "id", "reason", "userId") SELECT "bookId", "createdAt", "id", "reason", "userId" FROM "Recommendation";
DROP TABLE "Recommendation";
ALTER TABLE "new_Recommendation" RENAME TO "Recommendation";
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "approvalDate" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("approvalDate", "bookId", "createdAt", "id", "isActive", "isApproved", "rating", "updatedAt", "userId") SELECT "approvalDate", "bookId", "createdAt", "id", "isActive", "isApproved", "rating", "updatedAt", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE TABLE "new_Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Role" ("id", "isActive", "key", "label") SELECT "id", "isActive", "key", "label" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
CREATE UNIQUE INDEX "Role_key_key" ON "Role"("key");
CREATE UNIQUE INDEX "Role_label_key" ON "Role"("label");
CREATE TABLE "new_Translator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Translator" ("id", "isActive", "name") SELECT "id", "isActive", "name" FROM "Translator";
DROP TABLE "Translator";
ALTER TABLE "new_Translator" RENAME TO "Translator";
CREATE UNIQUE INDEX "Translator_name_key" ON "Translator"("name");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profilePicture" TEXT,
    "roleId" TEXT NOT NULL,
    "lastLogin" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "firstName", "id", "isActive", "lastLogin", "lastName", "password", "profilePicture", "roleId", "username") SELECT "email", "firstName", "id", "isActive", "lastLogin", "lastName", "password", "profilePicture", "roleId", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_email_idx" ON "User"("email");
CREATE TABLE "new__BookAuthors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BookAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__BookAuthors" ("A", "B") SELECT "A", "B" FROM "_BookAuthors";
DROP TABLE "_BookAuthors";
ALTER TABLE "new__BookAuthors" RENAME TO "_BookAuthors";
CREATE UNIQUE INDEX "_BookAuthors_AB_unique" ON "_BookAuthors"("A", "B");
CREATE INDEX "_BookAuthors_B_index" ON "_BookAuthors"("B");
CREATE TABLE "new__BookCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BookCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__BookCategories" ("A", "B") SELECT "A", "B" FROM "_BookCategories";
DROP TABLE "_BookCategories";
ALTER TABLE "new__BookCategories" RENAME TO "_BookCategories";
CREATE UNIQUE INDEX "_BookCategories_AB_unique" ON "_BookCategories"("A", "B");
CREATE INDEX "_BookCategories_B_index" ON "_BookCategories"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
