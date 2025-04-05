import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductMaxSale1742437219810 implements MigrationInterface {
    name = 'UpdateProductMaxSale1742437219810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`maxSalePerTime\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`maxSalePerTime\``);
    }

}
