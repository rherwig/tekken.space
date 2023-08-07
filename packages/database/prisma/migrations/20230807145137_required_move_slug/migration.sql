/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Move` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Move_slug_key" ON "Move"("slug");
