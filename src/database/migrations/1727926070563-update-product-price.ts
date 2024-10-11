import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductPrice1727926070563 implements MigrationInterface {
    name = 'UpdateProductPrice1727926070563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price\` bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`commissionRate\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`commissionRate\` bigint NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`commissionRate\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`commissionRate\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price\` varchar(255) NOT NULL DEFAULT '0'`);
    }

}
