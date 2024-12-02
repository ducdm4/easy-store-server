import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNote1732871227131 implements MigrationInterface {
    name = 'UpdateNote1732871227131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-products\` ADD \`note\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`receipts\` ADD \`note\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipts\` DROP COLUMN \`note\``);
        await queryRunner.query(`ALTER TABLE \`receipt-products\` DROP COLUMN \`note\``);
    }

}
