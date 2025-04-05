import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexPersonalInfo1742017786541 implements MigrationInterface {
    name = 'AddIndexPersonalInfo1742017786541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_77dd6ba16668c3c6d911ce7aea\` ON \`personal-info\` (\`firstName\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_7ad67ad40590bf8e83f562caf7\` ON \`personal-info\` (\`lastName\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_634ee961e734511873c796ea9f\` ON \`personal-info\` (\`phone\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_634ee961e734511873c796ea9f\` ON \`personal-info\``);
        await queryRunner.query(`DROP INDEX \`IDX_7ad67ad40590bf8e83f562caf7\` ON \`personal-info\``);
        await queryRunner.query(`DROP INDEX \`IDX_77dd6ba16668c3c6d911ce7aea\` ON \`personal-info\``);
    }

}
