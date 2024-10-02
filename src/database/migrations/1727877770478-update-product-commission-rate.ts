import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductCommissionRate1727877770478 implements MigrationInterface {
    name = 'UpdateProductCommissionRate1727877770478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`commissionRate\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`commissionRate\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`commissionRate\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`commissionRate\` int NULL`);
    }

}
