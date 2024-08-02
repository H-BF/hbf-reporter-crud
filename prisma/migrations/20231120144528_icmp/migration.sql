-- AlterTable
ALTER TABLE "assertions" ADD COLUMN     "icmp_command" TEXT,
ADD COLUMN     "icmp_type" TEXT,
ALTER COLUMN "src_port" DROP NOT NULL,
ALTER COLUMN "dst_port" DROP NOT NULL;
ALTER TYPE protocol ADD VALUE 'icmp';
