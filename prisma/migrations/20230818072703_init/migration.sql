-- CreateEnum
CREATE TYPE "assertion_status" AS ENUM ('pass', 'fail');

-- CreateEnum
CREATE TYPE "protocol" AS ENUM ('tcp', 'udp');

-- CreateEnum
CREATE TYPE "launch_status" AS ENUM ('create', 'in_process', 'finish', 'error');

-- CreateTable
CREATE TABLE "launch" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pipeline" INTEGER NOT NULL,
    "job" INTEGER NOT NULL,
    "fail_count" INTEGER,
    "pass_count" INTEGER,
    "duration" INTEGER,
    "status" "launch_status" NOT NULL DEFAULT 'create',

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
    "src_port" TEXT NOT NULL,
    "dst_ip" TEXT NOT NULL,
    "dst_port" TEXT NOT NULL,
    "protocol" "protocol" NOT NULL,
    "sg_from" TEXT NOT NULL,
    "sg_to" TEXT NOT NULL,
    "status" "assertion_status" NOT NULL,
    "msg_err" TEXT,

    CONSTRAINT "assertions_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "launch_pipeline_job_key" ON "launch"("pipeline", "job");

-- CreateIndex
CREATE UNIQUE INDEX "launch_error_launch_uuid_key" ON "launch_error"("launch_uuid");

-- AddForeignKey
ALTER TABLE "launch_error" ADD CONSTRAINT "launch_error_launch_uuid_fkey" FOREIGN KEY ("launch_uuid") REFERENCES "launch"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assertions" ADD CONSTRAINT "assertions_launch_uuid_fkey" FOREIGN KEY ("launch_uuid") REFERENCES "launch"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
