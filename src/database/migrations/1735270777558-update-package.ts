import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePackage1735270777558 implements MigrationInterface {
    name = 'UpdatePackage1735270777558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`package-tracking\` ADD \`timesUsed\` int NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`package-tracking\` DROP COLUMN \`timesUsed\``);
    }

}
