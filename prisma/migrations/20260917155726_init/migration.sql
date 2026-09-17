-- CreateTable
CREATE TABLE "RequiredInformation" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "productFamily" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "enquireType" TEXT NOT NULL,
    "request" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RequiredInformation_pkey" PRIMARY KEY ("id")
);
