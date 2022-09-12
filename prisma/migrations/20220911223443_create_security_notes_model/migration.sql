-- CreateTable
CREATE TABLE "SecurityNotes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "SecurityNotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SecurityNotes_userId_title_key" ON "SecurityNotes"("userId", "title");

-- AddForeignKey
ALTER TABLE "SecurityNotes" ADD CONSTRAINT "SecurityNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
