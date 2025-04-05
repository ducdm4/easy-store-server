import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1735203755760 implements MigrationInterface {
    name = 'UpdateProduct1735203755760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products_topping_category_categories\` (\`productsId\` int NOT NULL, \`categoriesId\` int NOT NULL, INDEX \`IDX_f554fbc74224346de29ca43129\` (\`productsId\`), INDEX \`IDX_394d99ec81417770f8888f99ed\` (\`categoriesId\`), PRIMARY KEY (\`productsId\`, \`categoriesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`category\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`toppingCategory\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_topping_category_categories\` ADD CONSTRAINT \`FK_f554fbc74224346de29ca43129d\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`products_topping_category_categories\` ADD CONSTRAINT \`FK_394d99ec81417770f8888f99edc\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products_topping_category_categories\` DROP FOREIGN KEY \`FK_394d99ec81417770f8888f99edc\``);
        await queryRunner.query(`ALTER TABLE \`products_topping_category_categories\` DROP FOREIGN KEY \`FK_f554fbc74224346de29ca43129d\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`toppingCategory\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`category\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_394d99ec81417770f8888f99ed\` ON \`products_topping_category_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_f554fbc74224346de29ca43129\` ON \`products_topping_category_categories\``);
        await queryRunner.query(`DROP TABLE \`products_topping_category_categories\``);
    }

}
