import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromotion1732102273230 implements MigrationInterface {
    name = 'UpdatePromotion1732102273230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` CHANGE \`discountAmount\` \`discountAmount\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` CHANGE \`quantity\` \`quantity\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` CHANGE \`quantity\` \`quantity\` decimal(5,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-bonus\` CHANGE \`discountAmount\` \`discountAmount\` decimal(5,2) NOT NULL DEFAULT '0.00'`);
    }

}
