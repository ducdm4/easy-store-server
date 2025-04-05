import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePersonalInfo1742058266427 implements MigrationInterface {
    name = 'UpdatePersonalInfo1742058266427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_634ee961e734511873c796ea9f\` ON \`personal-info\``);
        await queryRunner.query(`CREATE INDEX \`IDX_634ee961e734511873c796ea9f\` ON \`personal-info\` (\`phone\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_634ee961e734511873c796ea9f\` ON \`personal-info\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_634ee961e734511873c796ea9f\` ON \`personal-info\` (\`phone\`)`);
    }

}
