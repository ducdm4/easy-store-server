import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromoCode1731696024176 implements MigrationInterface {
    name = 'UpdatePromoCode1731696024176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-codes\` CHANGE \`numbersLeft\` \`numbersUsed\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` CHANGE \`numbersUsed\` \`numbersUsed\` int NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-codes\` CHANGE \`numbersUsed\` \`numbersUsed\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`promo-codes\` CHANGE \`numbersUsed\` \`numbersLeft\` int NULL`);
    }

}
