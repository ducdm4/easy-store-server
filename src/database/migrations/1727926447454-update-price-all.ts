import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePriceAll1727926447454 implements MigrationInterface {
    name = 'UpdatePriceAll1727926447454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`commissionRate\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`commissionRate\` decimal(11,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`combos\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`combos\` ADD \`price\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD \`price\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`packages\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD \`price\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`combos\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`combos\` ADD \`price\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`commissionRate\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`commissionRate\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price\` bigint NOT NULL DEFAULT '0'`);
    }

}
