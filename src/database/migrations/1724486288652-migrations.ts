import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1724486288652 implements MigrationInterface {
    name = 'Migrations1724486288652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_93b09314f05ed2653da12beabe\` ON \`personal-info\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_93b09314f05ed2653da12beabe\` ON \`personal-info\` (\`email\`)`);
    }

}
