import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePersonalInfo1742036894102 implements MigrationInterface {
    name = 'UpdatePersonalInfo1742036894102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`personal-info\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`personal-info\` CHANGE \`email\` \`email\` varchar(255) NOT NULL DEFAULT ''`);
    }

}
