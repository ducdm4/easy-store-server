import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOriginalPrice1730212112127 implements MigrationInterface {
    name = 'UpdateOriginalPrice1730212112127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`combos\` ADD \`originalPrice\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD \`originalPrice\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`packages\` DROP COLUMN \`originalPrice\``);
        await queryRunner.query(`ALTER TABLE \`combos\` DROP COLUMN \`originalPrice\``);
    }

}
