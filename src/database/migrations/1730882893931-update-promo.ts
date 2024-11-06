import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromo1730882893931 implements MigrationInterface {
    name = 'UpdatePromo1730882893931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP FOREIGN KEY \`FK_6bbc7a32da0a87f37f093642244\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP FOREIGN KEY \`FK_9843df3b87b38c7424f513a8d7d\``);
        await queryRunner.query(`CREATE TABLE \`promo-codes_products_products\` (\`promoCodesId\` int NOT NULL, \`productsId\` int NOT NULL, INDEX \`IDX_37958b7d3577ed6533a0683a17\` (\`promoCodesId\`), INDEX \`IDX_d6a8c7e41bf4c5c4dc6a828c36\` (\`productsId\`), PRIMARY KEY (\`promoCodesId\`, \`productsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`promo-codes_combos_combos\` (\`promoCodesId\` int NOT NULL, \`combosId\` int NOT NULL, INDEX \`IDX_0db7677306a60bbd1d2f79421a\` (\`promoCodesId\`), INDEX \`IDX_e19a6daeff97f131dc7187e227\` (\`combosId\`), PRIMARY KEY (\`promoCodesId\`, \`combosId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`promo-codes_packages_packages\` (\`promoCodesId\` int NOT NULL, \`packagesId\` int NOT NULL, INDEX \`IDX_c7217058d4e99c7c57e32b928b\` (\`promoCodesId\`), INDEX \`IDX_27a6d7ded952eaa07e3c839207\` (\`packagesId\`), PRIMARY KEY (\`promoCodesId\`, \`packagesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`comboId\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`productOrCombo\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`type\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`isPaused\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`promo-codes_products_products\` ADD CONSTRAINT \`FK_37958b7d3577ed6533a0683a170\` FOREIGN KEY (\`promoCodesId\`) REFERENCES \`promo-codes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`promo-codes_products_products\` ADD CONSTRAINT \`FK_d6a8c7e41bf4c5c4dc6a828c360\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`promo-codes_combos_combos\` ADD CONSTRAINT \`FK_0db7677306a60bbd1d2f79421af\` FOREIGN KEY (\`promoCodesId\`) REFERENCES \`promo-codes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`promo-codes_combos_combos\` ADD CONSTRAINT \`FK_e19a6daeff97f131dc7187e227d\` FOREIGN KEY (\`combosId\`) REFERENCES \`combos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`promo-codes_packages_packages\` ADD CONSTRAINT \`FK_c7217058d4e99c7c57e32b928b1\` FOREIGN KEY (\`promoCodesId\`) REFERENCES \`promo-codes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`promo-codes_packages_packages\` ADD CONSTRAINT \`FK_27a6d7ded952eaa07e3c8392076\` FOREIGN KEY (\`packagesId\`) REFERENCES \`packages\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-codes_packages_packages\` DROP FOREIGN KEY \`FK_27a6d7ded952eaa07e3c8392076\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes_packages_packages\` DROP FOREIGN KEY \`FK_c7217058d4e99c7c57e32b928b1\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes_combos_combos\` DROP FOREIGN KEY \`FK_e19a6daeff97f131dc7187e227d\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes_combos_combos\` DROP FOREIGN KEY \`FK_0db7677306a60bbd1d2f79421af\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes_products_products\` DROP FOREIGN KEY \`FK_d6a8c7e41bf4c5c4dc6a828c360\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes_products_products\` DROP FOREIGN KEY \`FK_37958b7d3577ed6533a0683a170\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`isPaused\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`productOrCombo\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`comboId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_27a6d7ded952eaa07e3c839207\` ON \`promo-codes_packages_packages\``);
        await queryRunner.query(`DROP INDEX \`IDX_c7217058d4e99c7c57e32b928b\` ON \`promo-codes_packages_packages\``);
        await queryRunner.query(`DROP TABLE \`promo-codes_packages_packages\``);
        await queryRunner.query(`DROP INDEX \`IDX_e19a6daeff97f131dc7187e227\` ON \`promo-codes_combos_combos\``);
        await queryRunner.query(`DROP INDEX \`IDX_0db7677306a60bbd1d2f79421a\` ON \`promo-codes_combos_combos\``);
        await queryRunner.query(`DROP TABLE \`promo-codes_combos_combos\``);
        await queryRunner.query(`DROP INDEX \`IDX_d6a8c7e41bf4c5c4dc6a828c36\` ON \`promo-codes_products_products\``);
        await queryRunner.query(`DROP INDEX \`IDX_37958b7d3577ed6533a0683a17\` ON \`promo-codes_products_products\``);
        await queryRunner.query(`DROP TABLE \`promo-codes_products_products\``);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD CONSTRAINT \`FK_9843df3b87b38c7424f513a8d7d\` FOREIGN KEY (\`comboId\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` ADD CONSTRAINT \`FK_6bbc7a32da0a87f37f093642244\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
