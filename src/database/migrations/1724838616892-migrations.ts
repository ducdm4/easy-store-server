import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1724838616892 implements MigrationInterface {
    name = 'Migrations1724838616892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stores\` ADD \`address\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stores\` DROP COLUMN \`address\``);
    }

}
