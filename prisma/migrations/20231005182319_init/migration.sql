/*
  Warnings:

  - The primary key for the `Kata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Videos` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Kata` DROP FOREIGN KEY `Kata_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `Videos` DROP FOREIGN KEY `Videos_kataId_fkey`;

-- AlterTable
ALTER TABLE `Kata` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `serviceId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Service` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Videos` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `kataId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Kata` ADD CONSTRAINT `Kata_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Videos` ADD CONSTRAINT `Videos_kataId_fkey` FOREIGN KEY (`kataId`) REFERENCES `Kata`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
