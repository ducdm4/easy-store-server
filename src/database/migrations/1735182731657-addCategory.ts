import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategory1735182731657 implements MigrationInterface {
    name = 'AddCategory1735182731657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`displayed\` tinyint NOT NULL DEFAULT 1, \`displayOrder\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`storeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_fa6ba3528de12e174b163c09fdd\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_fa6ba3528de12e174b163c09fdd\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
