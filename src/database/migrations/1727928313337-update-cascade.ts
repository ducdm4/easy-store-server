import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCascade1727928313337 implements MigrationInterface {
    name = 'UpdateCascade1727928313337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee-info\` DROP FOREIGN KEY \`FK_eb4181527b71aa76bef4f2dc59f\``);
        await queryRunner.query(`ALTER TABLE \`employee-info\` ADD CONSTRAINT \`FK_eb4181527b71aa76bef4f2dc59f\` FOREIGN KEY (\`identityCardImage1Id\`) REFERENCES \`photos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee-info\` DROP FOREIGN KEY \`FK_eb4181527b71aa76bef4f2dc59f\``);
        await queryRunner.query(`ALTER TABLE \`employee-info\` ADD CONSTRAINT \`FK_eb4181527b71aa76bef4f2dc59f\` FOREIGN KEY (\`identityCardImage1Id\`) REFERENCES \`photos\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
