-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "id_chat_telegram" INTEGER NOT NULL,
    "id_user_telegram" INTEGER NOT NULL,
    "user_telegram" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_notitication" (
    "account_id" INTEGER NOT NULL,
    "notification_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validation_data" TEXT,

    CONSTRAINT "account_notitication_pkey" PRIMARY KEY ("account_id","notification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_id_chat_telegram_key" ON "account"("id_chat_telegram");

-- CreateIndex
CREATE UNIQUE INDEX "account_id_user_telegram_key" ON "account"("id_user_telegram");

-- CreateIndex
CREATE UNIQUE INDEX "account_user_telegram_key" ON "account"("user_telegram");

-- CreateIndex
CREATE UNIQUE INDEX "notification_name_key" ON "notification"("name");

-- CreateIndex
CREATE UNIQUE INDEX "notification_label_key" ON "notification"("label");

-- AddForeignKey
ALTER TABLE "account_notitication" ADD CONSTRAINT "account_notitication_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_notitication" ADD CONSTRAINT "account_notitication_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
