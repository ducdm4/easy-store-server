import { MigrationInterface, QueryRunner } from "typeorm";

export class AddComboProductTopping1727933533526 implements MigrationInterface {
    name = 'AddComboProductTopping1727933533526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`combo-product-topping\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`comboQuantityId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`combos\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`packages\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`combo-product-topping\` ADD CONSTRAINT \`FK_df7b0560d3ab9f978acf61f012b\` FOREIGN KEY (\`comboQuantityId\`) REFERENCES \`combo-quantity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`combo-product-topping\` ADD CONSTRAINT \`FK_77e58017c4b04f5309380f80285\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`combo-product-topping\` DROP FOREIGN KEY \`FK_77e58017c4b04f5309380f80285\``);
        await queryRunner.query(`ALTER TABLE \`combo-product-topping\` DROP FOREIGN KEY \`FK_df7b0560d3ab9f978acf61f012b\``);
        await queryRunner.query(`ALTER TABLE \`packages\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`combos\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`DROP TABLE \`combo-product-topping\``);
    }

}
