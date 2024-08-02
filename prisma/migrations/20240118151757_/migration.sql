-- CreateEnum
CREATE TYPE "direction_type" AS ENUM ('fqdn', 'cidr', 'sg');

-- CreateEnum
CREATE TYPE "assertion_status" AS ENUM ('pass', 'fail');

-- CreateEnum
CREATE TYPE "protocol" AS ENUM ('tcp', 'udp', 'icmp');

-- CreateEnum
CREATE TYPE "launch_status" AS ENUM ('create', 'in_process', 'finish', 'error');

-- CreateEnum
CREATE TYPE "traffic" AS ENUM ('ingress', 'egress', 'unknown');

-- CreateTable
CREATE TABLE "launch" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pipeline" INTEGER NOT NULL,
    "job" INTEGER NOT NULL,
    "src_branch" TEXT NOT NULL,
    "commit" TEXT NOT NULL,
    "fail_count" INTEGER,
    "pass_count" INTEGER,
    "duration" INTEGER,
    "hbf_tag" TEXT NOT NULL,
    "status" "launch_status" NOT NULL DEFAULT 'create',
    "service_name" TEXT NOT NULL,

    CONSTRAINT "launch_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "launch_error" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "launch_uuid" UUID NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "launch_error_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "assertions" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "launch_uuid" UUID NOT NULL,
    "src_ip" TEXT NOT NULL,
    "src_port" TEXT,
    "dst_ip" TEXT NOT NULL,
    "dst_port" TEXT,
    "protocol" "protocol" NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "from_type" "direction_type" NOT NULL,
    "to_type" "direction_type" NOT NULL,
    "status" "assertion_status" NOT NULL,
    "msg_err" TEXT,
    "icmp_type" TEXT,
    "icmp_command" TEXT,
    "test_name" TEXT NOT NULL,
    "traffic" "traffic" NOT NULL DEFAULT 'unknown',

    CONSTRAINT "assertions_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "launch_pipeline_job_service_name_key" ON "launch"("pipeline", "job", "service_name");

-- CreateIndex
CREATE UNIQUE INDEX "launch_error_launch_uuid_key" ON "launch_error"("launch_uuid");

-- AddForeignKey
ALTER TABLE "launch_error" ADD CONSTRAINT "launch_error_launch_uuid_fkey" FOREIGN KEY ("launch_uuid") REFERENCES "launch"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assertions" ADD CONSTRAINT "assertions_launch_uuid_fkey" FOREIGN KEY ("launch_uuid") REFERENCES "launch"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
