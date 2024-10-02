import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductCommission1727666715715 implements MigrationInterface {
    name = 'UpdateProductCommission1727666715715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`combo-trackings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantityUsed\` int NOT NULL, \`remaining\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`comboId\` int NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`commissionType\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`combo-trackings\` ADD CONSTRAINT \`FK_2a1dee5d9475ab85d4b714fa274\` FOREIGN KEY (\`comboId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`combo-trackings\` ADD CONSTRAINT \`FK_2dca5e1ec185841659b52245052\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`combo-trackings\` DROP FOREIGN KEY \`FK_2dca5e1ec185841659b52245052\``);
        await queryRunner.query(`ALTER TABLE \`combo-trackings\` DROP FOREIGN KEY \`FK_2a1dee5d9475ab85d4b714fa274\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`commissionType\``);
        await queryRunner.query(`DROP TABLE \`combo-trackings\``);
    }

}
