import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReceiptProduct1743322770267 implements MigrationInterface {
    name = 'UpdateReceiptProduct1743322770267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`groupNumber\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`groupNumber\``);
    }

}
