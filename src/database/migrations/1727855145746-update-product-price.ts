import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductPrice1727855145746 implements MigrationInterface {
    name = 'UpdateProductPrice1727855145746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price\` varchar(255) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price\` int NOT NULL DEFAULT '0'`);
    }

}
