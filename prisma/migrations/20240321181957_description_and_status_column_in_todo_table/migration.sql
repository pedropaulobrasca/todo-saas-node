-- CreateEnum
CREATE TYPE "Status" AS ENUM ('processing', 'completed', 'idle');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'idle';
