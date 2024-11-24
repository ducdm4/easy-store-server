import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromotion1732115461245 implements MigrationInterface {
    name = 'UpdatePromotion1732115461245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`isCumulative\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`isCumulative\``);
    }

}
