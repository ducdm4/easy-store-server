import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReceipt1746843529445 implements MigrationInterface {
    name = 'UpdateReceipt1746843529445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`totalDiscountAmount\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`totalItemDiscount\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`discounted\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`discounted\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`totalItemDiscount\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`totalDiscountAmount\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
    }

}
