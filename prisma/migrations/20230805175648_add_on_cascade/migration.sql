-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Warehouses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "locality" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    CONSTRAINT "Warehouses_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Warehouses" ("id", "inventoryId", "locality", "quantity", "type") SELECT "id", "inventoryId", "locality", "quantity", "type" FROM "Warehouses";
DROP TABLE "Warehouses";
ALTER TABLE "new_Warehouses" RENAME TO "Warehouses";
CREATE TABLE "new_Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "productSku" TEXT NOT NULL,
    CONSTRAINT "Inventory_productSku_fkey" FOREIGN KEY ("productSku") REFERENCES "Product" ("sku") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Inventory" ("id", "productSku", "quantity") SELECT "id", "productSku", "quantity" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
CREATE UNIQUE INDEX "Inventory_productSku_key" ON "Inventory"("productSku");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
