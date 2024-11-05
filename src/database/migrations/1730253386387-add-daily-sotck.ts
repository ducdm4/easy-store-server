import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDailySotck1730253386387 implements MigrationInterface {
    name = 'AddDailySotck1730253386387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product-in-stock-daily\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` decimal(7,1) NOT NULL DEFAULT '1.0', \`date\` date NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product-transactions\` DROP COLUMN \`inStock\``);
        await queryRunner.query(`ALTER TABLE \`product-in-stock-daily\` ADD CONSTRAINT \`FK_7fc0287219d732273df0a5e662f\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product-in-stock-daily\` DROP FOREIGN KEY \`FK_7fc0287219d732273df0a5e662f\``);
        await queryRunner.query(`ALTER TABLE \`product-transactions\` ADD \`inStock\` decimal(11,2) NULL`);
        await queryRunner.query(`DROP TABLE \`product-in-stock-daily\``);
    }

}
