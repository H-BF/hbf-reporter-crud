-- CreateEnum
CREATE TYPE "traffic" AS ENUM ('ingress', 'egress', 'unknown');

-- AlterTable
ALTER TABLE "assertions" ADD COLUMN "traffic" "traffic" NOT NULL DEFAULT 'unknown';
