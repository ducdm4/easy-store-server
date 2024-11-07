import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromo1730968966626 implements MigrationInterface {
    name = 'UpdatePromo1730968966626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_cdf2a0ce026904f32a75095b26\` ON \`promo-codes\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`isAutoApply\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`discountType\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`isAutoApply\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`canUseWithOther\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`canUseWithOther\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`discountAmount\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD UNIQUE INDEX \`IDX_cdf2a0ce026904f32a75095b26\` (\`code\`)`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`quantity\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`discountAmount\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`canUseWithOther\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`canUseWithOther\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`discountType\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`total\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`isAutoApply\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`total\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`isAutoApply\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` DROP COLUMN \`used\``);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` ADD \`used\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` DROP COLUMN \`used\``);
        await queryRunner.query(`ALTER TABLE \`un-used-promo\` ADD \`used\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`isAutoApply\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`isAutoApply\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`discountType\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`canUseWithOther\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`canUseWithOther\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`discountAmount\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP INDEX \`IDX_cdf2a0ce026904f32a75095b26\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`quantity\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`discountAmount\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`canUseWithOther\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`canUseWithOther\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`total\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`isAutoApply\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`discountType\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`total\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`isAutoApply\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_cdf2a0ce026904f32a75095b26\` ON \`promo-codes\` (\`code\`)`);
    }

}
