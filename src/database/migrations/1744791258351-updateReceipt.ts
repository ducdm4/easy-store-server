import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReceipt1744791258351 implements MigrationInterface {
    name = 'UpdateReceipt1744791258351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`totalDiscountAmount\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`totalDiscountAmount\``);
    }

}
