import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromoCode1731137165553 implements MigrationInterface {
    name = 'UpdatePromoCode1731137165553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`isAutoApply\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`discountType\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`isAutoApply\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`numbersLeft\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`numbersLeft\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`total\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`isAutoApply\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`discountType\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`total\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`isAutoApply\` tinyint NOT NULL DEFAULT '0'`);
    }

}
