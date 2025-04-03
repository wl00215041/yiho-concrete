-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Certifications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "file" TEXT,
    "type" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Certifications" ("created_at", "file", "id", "name", "type") SELECT "created_at", "file", "id", "name", "type" FROM "Certifications";
DROP TABLE "Certifications";
ALTER TABLE "new_Certifications" RENAME TO "Certifications";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
