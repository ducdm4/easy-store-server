import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateInStock1730224045560 implements MigrationInterface {
    name = 'UpdateInStock1730224045560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`inStock\``);
        await queryRunner.query(`ALTER TABLE \`product-transactions\` ADD \`inStock\` decimal(11,2) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product-transactions\` DROP COLUMN \`inStock\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`inStock\` decimal(11,2) NULL`);
    }

}
