-- CreateTable
CREATE TABLE "Foodshops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "openby" TIMESTAMP(3) NOT NULL,
    "closedby" TIMESTAMP(3) NOT NULL,
    "delivery" BOOLEAN NOT NULL,

    CONSTRAINT "Foodshops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isVegetarian" BOOLEAN NOT NULL,
    "shopid" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Foodshops_id_key" ON "Foodshops"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_shopid_fkey" FOREIGN KEY ("shopid") REFERENCES "Foodshops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
