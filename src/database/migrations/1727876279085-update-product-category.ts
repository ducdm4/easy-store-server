import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductCategory1727876279085 implements MigrationInterface {
    name = 'UpdateProductCategory1727876279085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`category\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`category\``);
    }

}
