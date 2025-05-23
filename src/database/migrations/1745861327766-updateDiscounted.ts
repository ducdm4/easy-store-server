import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDiscounted1745861327766 implements MigrationInterface {
    name = 'UpdateDiscounted1745861327766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` ADD \`discounted\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`discounted\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`discounted\``);
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` DROP COLUMN \`discounted\``);
    }

}
