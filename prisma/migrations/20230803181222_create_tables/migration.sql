-- CreateTable
CREATE TABLE "Product" (
    "sku" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "productSku" TEXT NOT NULL,
    CONSTRAINT "Inventory_productSku_fkey" FOREIGN KEY ("productSku") REFERENCES "Product" ("sku") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Warehouses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inventoryId" INTEGER NOT NULL,
    CONSTRAINT "Warehouses_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productSku_key" ON "Inventory"("productSku");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouses_inventoryId_key" ON "Warehouses"("inventoryId");
