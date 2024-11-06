import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMoneyBalance1730859120729 implements MigrationInterface {
    name = 'UpdateMoneyBalance1730859120729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`spends\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`amount\` int NOT NULL, \`type\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`storeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`money-balance-daily\` ADD \`storeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`spends\` ADD CONSTRAINT \`FK_ce454cf10e9405c811a26b6e55d\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`money-balance-daily\` ADD CONSTRAINT \`FK_2fd4687bd3a128c11f809116e2d\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`money-balance-daily\` DROP FOREIGN KEY \`FK_2fd4687bd3a128c11f809116e2d\``);
        await queryRunner.query(`ALTER TABLE \`spends\` DROP FOREIGN KEY \`FK_ce454cf10e9405c811a26b6e55d\``);
        await queryRunner.query(`ALTER TABLE \`money-balance-daily\` DROP COLUMN \`storeId\``);
        await queryRunner.query(`DROP TABLE \`spends\``);
    }

}
