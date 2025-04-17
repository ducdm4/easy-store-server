import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReceipt1744829202775 implements MigrationInterface {
    name = 'UpdateReceipt1744829202775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`type\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`type\``);
    }

}
