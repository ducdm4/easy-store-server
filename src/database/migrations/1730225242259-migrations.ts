import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1730225242259 implements MigrationInterface {
    name = 'Migrations1730225242259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product-transactions\` ADD \`inStock\` decimal(11,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`product-transactions\` ADD CONSTRAINT \`FK_01aa0429921a8c72a173e008738\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product-transactions\` DROP FOREIGN KEY \`FK_01aa0429921a8c72a173e008738\``);
        await queryRunner.query(`ALTER TABLE \`product-transactions\` DROP COLUMN \`inStock\``);
    }

}
