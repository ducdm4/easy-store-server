import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePackageAndEmployeeServiceTracking1727682144462 implements MigrationInterface {
    name = 'UpdatePackageAndEmployeeServiceTracking1727682144462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`packages\` ADD \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD \`comboId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`employee-service-tracking\` ADD \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD CONSTRAINT \`FK_47ec6b75876906c640c4ee6ddb1\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD CONSTRAINT \`FK_7a4fff9ea1e8dc22c48b7fb22ee\` FOREIGN KEY (\`comboId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee-service-tracking\` ADD CONSTRAINT \`FK_2ed3871c0d7910a82be2737b0d9\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee-service-tracking\` DROP FOREIGN KEY \`FK_2ed3871c0d7910a82be2737b0d9\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP FOREIGN KEY \`FK_7a4fff9ea1e8dc22c48b7fb22ee\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP FOREIGN KEY \`FK_47ec6b75876906c640c4ee6ddb1\``);
        await queryRunner.query(`ALTER TABLE \`employee-service-tracking\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP COLUMN \`comboId\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP COLUMN \`productId\``);
    }

}
