import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromotion1732120576325 implements MigrationInterface {
    name = 'UpdatePromotion1732120576325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` ADD \`memberRankId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` ADD CONSTRAINT \`FK_049e51d425c45b54445bf9990f7\` FOREIGN KEY (\`memberRankId\`) REFERENCES \`member-ranks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` DROP FOREIGN KEY \`FK_049e51d425c45b54445bf9990f7\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaign-conditions\` DROP COLUMN \`memberRankId\``);
    }

}
