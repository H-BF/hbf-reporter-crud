/*
  Warnings:

  - Added the required column `commit` to the `launch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dst_branch` to the `launch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hbf_tag` to the `launch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `src_branch` to the `launch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "launch" ADD COLUMN     "commit" TEXT NOT NULL,
ADD COLUMN     "dst_branch" TEXT NOT NULL,
ADD COLUMN     "hbf_tag" TEXT NOT NULL,
ADD COLUMN     "src_branch" TEXT NOT NULL;
