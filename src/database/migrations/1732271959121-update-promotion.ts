import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromotion1732271959121 implements MigrationInterface {
    name = 'UpdatePromotion1732271959121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` ADD \`maximumAmount\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` DROP COLUMN \`maximumAmount\``);
    }

}
