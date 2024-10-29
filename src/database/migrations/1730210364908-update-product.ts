import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1730210364908 implements MigrationInterface {
    name = 'UpdateProduct1730210364908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`isStorable\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`isSaleable\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`inStock\` decimal(11,2) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`inStock\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`isSaleable\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`isStorable\``);
    }

}
