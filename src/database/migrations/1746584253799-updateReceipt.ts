import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReceipt1746584253799 implements MigrationInterface {
    name = 'UpdateReceipt1746584253799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`discounted\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`discounted\``);
    }

}
