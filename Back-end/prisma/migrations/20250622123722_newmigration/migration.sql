/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `profile`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `CustomerIdentifier` (
    `customerId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerEmail` VARCHAR(191) NOT NULL,
    `customerPhoneNumber` VARCHAR(191) NOT NULL,
    `customerAddedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `customerHash` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CustomerIdentifier_customerEmail_key`(`customerEmail`),
    PRIMARY KEY (`customerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerInfo` (
    `customerInfoId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `customerFirstName` VARCHAR(191) NOT NULL,
    `customerLastName` VARCHAR(191) NOT NULL,
    `activeCustomerStatus` INTEGER NOT NULL,

    PRIMARY KEY (`customerInfoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerVehicleInfo` (
    `vehicleId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `vehicleYear` INTEGER NOT NULL,
    `vehicleMake` VARCHAR(191) NOT NULL,
    `vehicleModel` VARCHAR(191) NOT NULL,
    `vehicleType` VARCHAR(191) NOT NULL,
    `vehicleMileage` INTEGER NOT NULL,
    `vehicleTag` VARCHAR(191) NOT NULL,
    `vehicleSerial` VARCHAR(191) NOT NULL,
    `vehicleColor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`vehicleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommonServices` (
    `serviceId` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceName` VARCHAR(191) NOT NULL,
    `serviceDescription` VARCHAR(191) NULL,

    PRIMARY KEY (`serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `employeeId` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeEmail` VARCHAR(191) NOT NULL,
    `activeEmployee` INTEGER NOT NULL,
    `addedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('ADMIN', 'EMPLOYEE', 'MANAGER') NOT NULL DEFAULT 'EMPLOYEE',

    UNIQUE INDEX `Employee_employeeEmail_key`(`employeeEmail`),
    PRIMARY KEY (`employeeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeInfo` (
    `employeeInfoId` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `employeeFirstName` VARCHAR(191) NOT NULL,
    `employeeLastName` VARCHAR(191) NOT NULL,
    `employeePhone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`employeeInfoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeePass` (
    `employeePassId` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `employeePasswordHashed` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`employeePassId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,
    `vehicleId` INTEGER NOT NULL,
    `orderDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `activeOrder` INTEGER NOT NULL,
    `orderHash` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderInfo` (
    `orderInfoId` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `orderTotalPrice` INTEGER NOT NULL,
    `estimatedCompletionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completionDate` DATETIME(3) NULL,
    `additionalRequest` VARCHAR(191) NULL,
    `notesForInternalUse` VARCHAR(191) NULL,
    `notesForCustomer` VARCHAR(191) NULL,
    `additionalRequestsCompleted` INTEGER NOT NULL,

    PRIMARY KEY (`orderInfoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderService` (
    `orderServiceId` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `serviceCompleted` INTEGER NOT NULL,

    PRIMARY KEY (`orderServiceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderStatus` (
    `orderStatusId` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `orderStatus` INTEGER NOT NULL,

    PRIMARY KEY (`orderStatusId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CustomerInfo` ADD CONSTRAINT `CustomerInfo_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `CustomerIdentifier`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerVehicleInfo` ADD CONSTRAINT `CustomerVehicleInfo_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `CustomerIdentifier`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeInfo` ADD CONSTRAINT `EmployeeInfo_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`employeeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeePass` ADD CONSTRAINT `EmployeePass_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`employeeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`employeeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `CustomerIdentifier`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `CustomerVehicleInfo`(`vehicleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderInfo` ADD CONSTRAINT `OrderInfo_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderService` ADD CONSTRAINT `OrderService_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderService` ADD CONSTRAINT `OrderService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `CommonServices`(`serviceId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderStatus` ADD CONSTRAINT `OrderStatus_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;
