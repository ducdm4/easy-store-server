import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductTransactions1730030381882 implements MigrationInterface {
    name = 'AddProductTransactions1730030381882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product-transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`reason\` text NOT NULL, \`type\` int NOT NULL DEFAULT '0', \`quantity\` decimal(5,1) NOT NULL DEFAULT '1.0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`originalPrice\` decimal(11,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`product-transactions\` ADD CONSTRAINT \`FK_01aa0429921a8c72a173e008738\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product-transactions\` DROP FOREIGN KEY \`FK_01aa0429921a8c72a173e008738\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`originalPrice\``);
        await queryRunner.query(`DROP TABLE \`product-transactions\``);
    }

}
