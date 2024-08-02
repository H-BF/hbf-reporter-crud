-- CreateEnum
CREATE TYPE "traffic" AS ENUM ('ingress', 'egress');

-- AlterTable
ALTER TABLE "assertions" ADD COLUMN "traffic" "traffic" default null;
