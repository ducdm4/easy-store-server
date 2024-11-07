import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePromoOnHold1730971959339 implements MigrationInterface {
    name = 'CreatePromoOnHold1730971959339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_cdf2a0ce026904f32a75095b26\` ON \`promo-codes\``);
        await queryRunner.query(`CREATE TABLE \`promo-code-on-hold\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`codeId\` int NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
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
        await queryRunner.query(`ALTER TABLE \`promo-code-on-hold\` ADD CONSTRAINT \`FK_87b86c4cc7aaef2f025e1c86994\` FOREIGN KEY (\`codeId\`) REFERENCES \`promo-codes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promo-code-on-hold\` ADD CONSTRAINT \`FK_18564b5dbed80e40f4bb074f3ba\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-code-on-hold\` DROP FOREIGN KEY \`FK_18564b5dbed80e40f4bb074f3ba\``);
        await queryRunner.query(`ALTER TABLE \`promo-code-on-hold\` DROP FOREIGN KEY \`FK_87b86c4cc7aaef2f025e1c86994\``);
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
        await queryRunner.query(`DROP TABLE \`promo-code-on-hold\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_cdf2a0ce026904f32a75095b26\` ON \`promo-codes\` (\`code\`)`);
    }

}
