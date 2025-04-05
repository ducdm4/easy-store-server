import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCategory1735265265301 implements MigrationInterface {
    name = 'UpdateCategory1735265265301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`max\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`max\``);
    }

}
