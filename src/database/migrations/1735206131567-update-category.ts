import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCategory1735206131567 implements MigrationInterface {
    name = 'UpdateCategory1735206131567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`isTopping\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`isTopping\``);
    }

}
