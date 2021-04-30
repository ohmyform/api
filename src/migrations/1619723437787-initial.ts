import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class initial1619723437787 implements MigrationInterface {
  name = 'initial1619723437787'

  public async up(queryRunner: QueryRunner): Promise<void> {

    if (queryRunner.connection.driver.options.type !== 'sqlite') {
      await queryRunner.query(`CREATE TABLE "button" ("id" SERIAL NOT NULL, "url" VARCHAR, "action" VARCHAR, "text" VARCHAR NOT NULL, "bgColor" VARCHAR, "activeColor" VARCHAR, "color" VARCHAR, CONSTRAINT "PK_a4df4e4f7a5882bc94442d3f209" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form_field_logic" ("id" SERIAL NOT NULL, "formula" VARCHAR NOT NULL, "action" VARCHAR(10) NOT NULL, "visible" boolean, "require" boolean, "disable" boolean, "enabled" boolean NOT NULL, "fieldId" integer, "jumpToId" integer, CONSTRAINT "PK_c40e7f583854ff1b60900d8cf1b" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form_field_option" ("id" SERIAL NOT NULL, "key" VARCHAR, "title" VARCHAR, "value" VARCHAR NOT NULL, "fieldId" integer, CONSTRAINT "PK_812955356e516819e37b64bf39b" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form_field" ("id" SERIAL NOT NULL, "title" VARCHAR NOT NULL, "description" text NOT NULL, "slug" VARCHAR, "required" boolean NOT NULL, "disabled" boolean NOT NULL, "type" VARCHAR NOT NULL, "value" VARCHAR NOT NULL, "formId" integer, CONSTRAINT "PK_135904ddb60085b07254ea4f485" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form_hook" ("id" SERIAL NOT NULL, "enabled" boolean NOT NULL, "url" VARCHAR NOT NULL, "format" VARCHAR, "formId" integer, CONSTRAINT "PK_4b63bd9ff09f7b3e5c4a41fcbec" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form_notification" ("id" SERIAL NOT NULL, "subject" VARCHAR, "htmlTemplate" VARCHAR, "enabled" boolean NOT NULL, "toEmail" VARCHAR, "fromEmail" VARCHAR, "formId" integer, "fromFieldId" integer, "toFieldId" integer, CONSTRAINT "PK_935306529aed07c9f6628f6e24f" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "submission" ("id" SERIAL NOT NULL, CONSTRAINT "PK_7faa571d0e4a7076e85890c9bd0" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form_visitor" ("id" SERIAL NOT NULL, "referrer" VARCHAR, "formId" integer, "submissionId" integer, CONSTRAINT "PK_74224dc63e13cf5cb5f0420e65b" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "page" ("id" SERIAL NOT NULL, "show" boolean NOT NULL, "title" VARCHAR, "paragraph" text, "buttonText" VARCHAR, CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" VARCHAR(255) NOT NULL, "username" VARCHAR(255) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "form" ("id" SERIAL NOT NULL, "title" VARCHAR NOT NULL, "language" VARCHAR(10) NOT NULL, "showFooter" boolean NOT NULL, "isLive" boolean NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastModified" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "adminId" integer, "startPageId" integer, "endPageId" integer, CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "submission_field" ("id" SERIAL NOT NULL, CONSTRAINT "PK_5443f5f769fce3107982c16e0b5" PRIMARY KEY ("id"))`);

      await queryRunner.query(`ALTER TABLE "form_field_logic" ADD CONSTRAINT "FK_6098b83f6759445d8cfdd03d545" FOREIGN KEY ("fieldId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_field_logic" ADD CONSTRAINT "FK_4a8019f2b753cfb3216dc3001a6" FOREIGN KEY ("jumpToId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_field_option" ADD CONSTRAINT "FK_c4484ad12c2c56db31dffdbfe97" FOREIGN KEY ("fieldId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_field" ADD CONSTRAINT "FK_2d83d8a334dd66445db13f92b77" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_hook" ADD CONSTRAINT "FK_bbeb4d224d8857fd5a458538a30" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_notification" ADD CONSTRAINT "FK_a9ed55144108ded893b502d6321" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_notification" ADD CONSTRAINT "FK_0876741ce2acdaee4553d7a3bbd" FOREIGN KEY ("fromFieldId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_notification" ADD CONSTRAINT "FK_4915ebae53e09b732322d0ff6ed" FOREIGN KEY ("toFieldId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_visitor" ADD CONSTRAINT "FK_72ade6c3a3e55d1fce94300f8b6" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form_visitor" ADD CONSTRAINT "FK_cc7e7beb67c46f65d57289b121d" FOREIGN KEY ("submissionId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_a7cb33580bca2b362e5e34fdfcd" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_023d9cf1d97e93facc96c86ca70" FOREIGN KEY ("startPageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_e5d158932e43cfbf9958931ee01" FOREIGN KEY ("endPageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    } else {
      await queryRunner.query(`CREATE TABLE "button" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar, "action" varchar, "text" varchar NOT NULL, "bgColor" varchar, "activeColor" varchar, "color" varchar)`);
      await queryRunner.query(`CREATE TABLE "submission" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
      await queryRunner.query(`CREATE TABLE "page" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "show" boolean NOT NULL, "title" varchar, "paragraph" text, "buttonText" varchar)`);
      await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar(255) NOT NULL, "username" varchar(255) NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
      await queryRunner.query(`CREATE TABLE "form" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "language" varchar(10) NOT NULL, "showFooter" boolean NOT NULL, "isLive" boolean NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "lastModified" datetime NOT NULL DEFAULT (datetime('now')), "adminId" integer, "startPageId" integer, "endPageId" integer, CONSTRAINT "FK_a7cb33580bca2b362e5e34fdfcd" FOREIGN KEY ("adminId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_023d9cf1d97e93facc96c86ca70" FOREIGN KEY ("startPageId") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e5d158932e43cfbf9958931ee01" FOREIGN KEY ("endPageId") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "submission_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
      await queryRunner.query(`CREATE TABLE "form_field_logic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "formula" varchar NOT NULL, "action" varchar(10) NOT NULL, "visible" boolean, "require" boolean, "disable" boolean, "enabled" boolean NOT NULL, "fieldId" integer, "jumpToId" integer, CONSTRAINT "FK_6098b83f6759445d8cfdd03d545" FOREIGN KEY ("fieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4a8019f2b753cfb3216dc3001a6" FOREIGN KEY ("jumpToId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "form_field_option" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "key" varchar, "title" varchar, "value" varchar NOT NULL, "fieldId" integer, CONSTRAINT "FK_c4484ad12c2c56db31dffdbfe97" FOREIGN KEY ("fieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "form_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "slug" varchar, "required" boolean NOT NULL, "disabled" boolean NOT NULL, "type" varchar NOT NULL, "value" varchar NOT NULL, "formId" integer, CONSTRAINT "FK_2d83d8a334dd66445db13f92b77" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "form_hook" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "enabled" boolean NOT NULL, "url" varchar NOT NULL, "format" varchar, "formId" integer, CONSTRAINT "FK_bbeb4d224d8857fd5a458538a30" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "form_notification" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "subject" varchar, "htmlTemplate" varchar, "enabled" boolean NOT NULL, "toEmail" varchar, "fromEmail" varchar, "formId" integer, "fromFieldId" integer, "toFieldId" integer, CONSTRAINT "FK_a9ed55144108ded893b502d6321" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0876741ce2acdaee4553d7a3bbd" FOREIGN KEY ("fromFieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4915ebae53e09b732322d0ff6ed" FOREIGN KEY ("toFieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
      await queryRunner.query(`CREATE TABLE "form_visitor" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "referrer" varchar, "formId" integer, "submissionId" integer, CONSTRAINT "FK_72ade6c3a3e55d1fce94300f8b6" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cc7e7beb67c46f65d57289b121d" FOREIGN KEY ("submissionId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.connection.driver.options.type !== 'sqlite') {
      await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_e5d158932e43cfbf9958931ee01"`);
      await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_023d9cf1d97e93facc96c86ca70"`);
      await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_a7cb33580bca2b362e5e34fdfcd"`);
      await queryRunner.query(`ALTER TABLE "form_visitor" DROP CONSTRAINT "FK_cc7e7beb67c46f65d57289b121d"`);
      await queryRunner.query(`ALTER TABLE "form_visitor" DROP CONSTRAINT "FK_72ade6c3a3e55d1fce94300f8b6"`);
      await queryRunner.query(`ALTER TABLE "form_notification" DROP CONSTRAINT "FK_4915ebae53e09b732322d0ff6ed"`);
      await queryRunner.query(`ALTER TABLE "form_notification" DROP CONSTRAINT "FK_0876741ce2acdaee4553d7a3bbd"`);
      await queryRunner.query(`ALTER TABLE "form_notification" DROP CONSTRAINT "FK_a9ed55144108ded893b502d6321"`);
      await queryRunner.query(`ALTER TABLE "form_hook" DROP CONSTRAINT "FK_bbeb4d224d8857fd5a458538a30"`);
      await queryRunner.query(`ALTER TABLE "form_field" DROP CONSTRAINT "FK_2d83d8a334dd66445db13f92b77"`);
      await queryRunner.query(`ALTER TABLE "form_field_option" DROP CONSTRAINT "FK_c4484ad12c2c56db31dffdbfe97"`);
      await queryRunner.query(`ALTER TABLE "form_field_logic" DROP CONSTRAINT "FK_4a8019f2b753cfb3216dc3001a6"`);
      await queryRunner.query(`ALTER TABLE "form_field_logic" DROP CONSTRAINT "FK_6098b83f6759445d8cfdd03d545"`);
    }

    await queryRunner.query(`DROP TABLE "submission_field"`);
    await queryRunner.query(`DROP TABLE "form"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "page"`);
    await queryRunner.query(`DROP TABLE "form_visitor"`);
    await queryRunner.query(`DROP TABLE "submission"`);
    await queryRunner.query(`DROP TABLE "form_notification"`);
    await queryRunner.query(`DROP TABLE "form_hook"`);
    await queryRunner.query(`DROP TABLE "form_field"`);
    await queryRunner.query(`DROP TABLE "form_field_option"`);
    await queryRunner.query(`DROP TABLE "form_field_logic"`);
    await queryRunner.query(`DROP TABLE "button"`);
  }

}
