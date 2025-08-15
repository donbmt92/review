/*
  Warnings:

  - You are about to drop the column `asin` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `markdown` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `scrapeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sourceURL` on the `Product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("categoryId", "createdAt", "id", "imageUrl", "score", "title") SELECT "categoryId", "createdAt", "id", "imageUrl", "score", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
