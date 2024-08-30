import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1724835399162 implements MigrationInterface {
    name = 'Migrations1724835399162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`type\` tinyint NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`type\``);
    }

}
