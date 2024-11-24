import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromotion1732375753773 implements MigrationInterface {
    name = 'UpdatePromotion1732375753773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`timesUsed\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`timesUsed\``);
    }

}
