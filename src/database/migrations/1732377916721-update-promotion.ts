import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromotion1732377916721 implements MigrationInterface {
    name = 'UpdatePromotion1732377916721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` DROP COLUMN \`expiryDate\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`expiryDate\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` CHANGE \`maximumAmount\` \`maximumAmount\` decimal(11,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` CHANGE \`quantity\` \`quantity\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` CHANGE \`quantity\` \`quantity\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` CHANGE \`maximumAmount\` \`maximumAmount\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`expiryDate\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` ADD \`expiryDate\` int NOT NULL DEFAULT '0'`);
    }

}
