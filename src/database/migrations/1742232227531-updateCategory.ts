import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCategory1742232227531 implements MigrationInterface {
    name = 'UpdateCategory1742232227531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`isToppingRequired\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`isToppingRequired\``);
    }

}
