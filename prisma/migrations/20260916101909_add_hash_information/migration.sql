-- CreateTable
CREATE TABLE "HashInformation" (
    "id" TEXT NOT NULL,
    "productImageUrl" TEXT,
    "productImagePublicId" TEXT,
    "productName" TEXT NOT NULL,
    "firmwareVersion" TEXT NOT NULL,
    "hashValue" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HashInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HashInformation_userId_idx" ON "HashInformation"("userId");

-- AddForeignKey
ALTER TABLE "HashInformation" ADD CONSTRAINT "HashInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
