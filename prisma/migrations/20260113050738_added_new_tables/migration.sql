/*
  Warnings:

  - Added the required column `lastUpdatedById` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "lastUpdatedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "referralCode" SET DEFAULT concat('ref_', substr(gen_random_uuid()::text, 1, 8));

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "AdminUser_email_idx" ON "AdminUser"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "AdminUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
