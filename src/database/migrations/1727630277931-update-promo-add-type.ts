import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromoAddType1727630277931 implements MigrationInterface {
    name = 'UpdatePromoAddType1727630277931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`discountType\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`productOrCombo\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`isAutoApply\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`total\` float NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`total\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`isAutoApply\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`productOrCombo\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`discountType\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`discount\` int NOT NULL`);
    }

}
