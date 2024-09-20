import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1726820410955 implements MigrationInterface {
    name = 'Migrations1726820410955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`space-units\` DROP COLUMN \`active\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`space-units\` ADD \`active\` tinyint NOT NULL DEFAULT '1'`);
    }

}
