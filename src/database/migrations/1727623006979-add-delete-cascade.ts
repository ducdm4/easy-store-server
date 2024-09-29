import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeleteCascade1727623006979 implements MigrationInterface {
    name = 'AddDeleteCascade1727623006979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee-info\` DROP FOREIGN KEY \`FK_4cc978dbd3c0b4fe114bc1ab27a\``);
        await queryRunner.query(`ALTER TABLE \`employee-info\` DROP FOREIGN KEY \`FK_e2497a12faa9628c41bfdbaf98e\``);
        await queryRunner.query(`ALTER TABLE \`employee-info\` ADD CONSTRAINT \`FK_4cc978dbd3c0b4fe114bc1ab27a\` FOREIGN KEY (\`identityCardImage2Id\`) REFERENCES \`photos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee-info\` ADD CONSTRAINT \`FK_e2497a12faa9628c41bfdbaf98e\` FOREIGN KEY (\`personalInfoId\`) REFERENCES \`personal-info\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee-info\` DROP FOREIGN KEY \`FK_e2497a12faa9628c41bfdbaf98e\``);
        await queryRunner.query(`ALTER TABLE \`employee-info\` DROP FOREIGN KEY \`FK_4cc978dbd3c0b4fe114bc1ab27a\``);
        await queryRunner.query(`ALTER TABLE \`employee-info\` ADD CONSTRAINT \`FK_e2497a12faa9628c41bfdbaf98e\` FOREIGN KEY (\`personalInfoId\`) REFERENCES \`personal-info\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee-info\` ADD CONSTRAINT \`FK_4cc978dbd3c0b4fe114bc1ab27a\` FOREIGN KEY (\`identityCardImage2Id\`) REFERENCES \`photos\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
