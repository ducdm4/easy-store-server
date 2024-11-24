import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromotion1732431638708 implements MigrationInterface {
    name = 'UpdatePromotion1732431638708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD \`imageId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD UNIQUE INDEX \`IDX_2f3463d9a862184de536d20203\` (\`imageId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_2f3463d9a862184de536d20203\` ON \`promo-campaigns\` (\`imageId\`)`);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` ADD CONSTRAINT \`FK_2f3463d9a862184de536d202031\` FOREIGN KEY (\`imageId\`) REFERENCES \`photos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP FOREIGN KEY \`FK_2f3463d9a862184de536d202031\``);
        await queryRunner.query(`DROP INDEX \`REL_2f3463d9a862184de536d20203\` ON \`promo-campaigns\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP INDEX \`IDX_2f3463d9a862184de536d20203\``);
        await queryRunner.query(`ALTER TABLE \`promo-campaigns\` DROP COLUMN \`imageId\``);
    }

}
