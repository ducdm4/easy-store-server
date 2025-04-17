import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReceipt1744827845160 implements MigrationInterface {
    name = 'UpdateReceipt1744827845160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` CHANGE \`isTemporarySave\` \`status\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`status\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`status\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`receipts\` CHANGE \`status\` \`isTemporarySave\` tinyint NOT NULL DEFAULT '0'`);
    }

}
