import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReceiptPromo1747317511965 implements MigrationInterface {
    name = 'UpdateReceiptPromo1747317511965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD \`campaignBonusId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` ADD CONSTRAINT \`FK_0944cbc994a2eb1e6bbce559911\` FOREIGN KEY (\`campaignBonusId\`) REFERENCES \`promo-campaign-bonus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP FOREIGN KEY \`FK_0944cbc994a2eb1e6bbce559911\``);
        await queryRunner.query(`ALTER TABLE \`receipt-promo\` DROP COLUMN \`campaignBonusId\``);
    }

}
