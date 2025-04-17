import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReceipt1744828151769 implements MigrationInterface {
    name = 'UpdateReceipt1744828151769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`firstSaveTimestamp\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`firstSaveTimestamp\` datetime NULL`);
    }

}
