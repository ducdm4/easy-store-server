import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMoneyBalance1730856902996 implements MigrationInterface {
    name = 'AddMoneyBalance1730856902996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`money-transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`reason\` text NULL, \`amount\` decimal(11,2) NOT NULL DEFAULT '0.00', \`type\` tinyint NOT NULL, \`date\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`storeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`money-balance-daily\` (\`id\` int NOT NULL AUTO_INCREMENT, \`balance\` decimal(11,2) NOT NULL DEFAULT '0.00', \`date\` date NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`money-transactions\` ADD CONSTRAINT \`FK_1373843b0eed570b38dbc0ad77c\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`money-transactions\` DROP FOREIGN KEY \`FK_1373843b0eed570b38dbc0ad77c\``);
        await queryRunner.query(`DROP TABLE \`money-balance-daily\``);
        await queryRunner.query(`DROP TABLE \`money-transactions\``);
    }

}
