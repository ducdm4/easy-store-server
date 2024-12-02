import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1733113132293 implements MigrationInterface {
    name = 'UpdateProduct1733113132293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`toppingCategory\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`toppingCategory\``);
    }

}
