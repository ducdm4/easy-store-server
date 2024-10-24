import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePackageImage1728700488603 implements MigrationInterface {
    name = 'UpdatePackageImage1728700488603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`packages\` ADD \`imageId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD UNIQUE INDEX \`IDX_5baea1af19d8746fb213523e77\` (\`imageId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5baea1af19d8746fb213523e77\` ON \`packages\` (\`imageId\`)`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD CONSTRAINT \`FK_5baea1af19d8746fb213523e777\` FOREIGN KEY (\`imageId\`) REFERENCES \`photos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`packages\` DROP FOREIGN KEY \`FK_5baea1af19d8746fb213523e777\``);
        await queryRunner.query(`DROP INDEX \`REL_5baea1af19d8746fb213523e77\` ON \`packages\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP INDEX \`IDX_5baea1af19d8746fb213523e77\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP COLUMN \`imageId\``);
    }

}
