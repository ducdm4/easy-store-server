import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReceipt1745372006800 implements MigrationInterface {
    name = 'UpdateReceipt1745372006800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` ADD \`isInCombo\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-product-topping\` DROP COLUMN \`isInCombo\``);
    }

}
