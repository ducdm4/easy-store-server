import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductRemoveIsSaleAble1742442211441 implements MigrationInterface {
    name = 'UpdateProductRemoveIsSaleAble1742442211441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`isSaleable\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`isSaleable\` tinyint NOT NULL DEFAULT '1'`);
    }

}
