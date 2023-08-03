/*
  Warnings:

  - Added the required column `isMarkatable` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality` to the `Warehouses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Warehouses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Warehouses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "sku" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isMarkatable" BOOLEAN NOT NULL
);
INSERT INTO "new_Product" ("name", "sku") SELECT "name", "sku" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Warehouses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "locality" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    CONSTRAINT "Warehouses_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Warehouses" ("id", "inventoryId") SELECT "id", "inventoryId" FROM "Warehouses";
DROP TABLE "Warehouses";
ALTER TABLE "new_Warehouses" RENAME TO "Warehouses";
CREATE UNIQUE INDEX "Warehouses_inventoryId_key" ON "Warehouses"("inventoryId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
