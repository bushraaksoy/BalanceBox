-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastSeenAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "userId" TEXT,
    "type" TEXT NOT NULL,
    "path" TEXT,
    "country" TEXT,
    "timezone" TEXT,
    "language" TEXT,
    "referrer" TEXT,
    "device" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Visit_type_createdAt_idx" ON "Visit"("type", "createdAt");

-- CreateIndex
CREATE INDEX "Visit_visitorId_type_createdAt_idx" ON "Visit"("visitorId", "type", "createdAt");
