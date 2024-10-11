import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductActive1727889178643 implements MigrationInterface {
    name = 'UpdateProductActive1727889178643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`isActive\``);
    }

}
