-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL DEFAULT concat('user_', gen_random_uuid()),
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL DEFAULT concat('ref_', substr(gen_random_uuid()::text, 1, 8)),
    "name" TEXT,
    "avatar" TEXT,
    "dob" TIMESTAMP(3),
    "instituteName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralRegistered" (
    "id" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,
    "doneByIdentifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferralRegistered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL DEFAULT concat('post_', gen_random_uuid()),
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "contentHTML" TEXT NOT NULL,
    "sharableLink" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostAsset" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "type" "AssetType" NOT NULL DEFAULT 'IMAGE',

    CONSTRAINT "PostAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_publicId_key" ON "User"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");

-- CreateIndex
CREATE INDEX "User_publicId_idx" ON "User"("publicId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_referralCode_idx" ON "User"("referralCode");

-- CreateIndex
CREATE INDEX "ReferralRegistered_referralCode_idx" ON "ReferralRegistered"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralRegistered_referralCode_doneByIdentifier_key" ON "ReferralRegistered"("referralCode", "doneByIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "Post_publicId_key" ON "Post"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_sharableLink_key" ON "Post"("sharableLink");

-- CreateIndex
CREATE INDEX "Post_slug_idx" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_publicId_idx" ON "Post"("publicId");

-- CreateIndex
CREATE INDEX "Post_isArchived_idx" ON "Post"("isArchived");

-- CreateIndex
CREATE INDEX "Post_isPublished_idx" ON "Post"("isPublished");

-- AddForeignKey
ALTER TABLE "ReferralRegistered" ADD CONSTRAINT "ReferralRegistered_referralCode_fkey" FOREIGN KEY ("referralCode") REFERENCES "User"("referralCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostAsset" ADD CONSTRAINT "PostAsset_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
