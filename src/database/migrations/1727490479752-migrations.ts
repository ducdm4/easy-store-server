import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1727490479752 implements MigrationInterface {
    name = 'Migrations1727490479752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`commissionRate\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`commissionRate\``);
    }

}
