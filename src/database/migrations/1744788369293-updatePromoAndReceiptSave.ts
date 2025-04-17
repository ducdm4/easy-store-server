import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromoAndReceiptSave1744788369293 implements MigrationInterface {
    name = 'UpdatePromoAndReceiptSave1744788369293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-code-on-hold\` DROP FOREIGN KEY \`FK_18564b5dbed80e40f4bb074f3ba\``);
        await queryRunner.query(`ALTER TABLE \`promo-code-on-hold\` CHANGE \`customerId\` \`receiptId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`isTemporarySave\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`firstSaveTimestamp\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-code-on-hold\` ADD CONSTRAINT \`FK_81f4c330f576a5106342d9ca680\` FOREIGN KEY (\`receiptId\`) REFERENCES \`receipts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-code-on-hold\` DROP FOREIGN KEY \`FK_81f4c330f576a5106342d9ca680\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`firstSaveTimestamp\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`isTemporarySave\``);
        await queryRunner.query(`ALTER TABLE \`promo-code-on-hold\` CHANGE \`receiptId\` \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-code-on-hold\` ADD CONSTRAINT \`FK_18564b5dbed80e40f4bb074f3ba\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
