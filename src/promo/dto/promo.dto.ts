import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePromoCodeDto {
  @IsString()
  code: string;

  @IsString()
  description: string;

  quantity: number;
  @IsNotEmpty()
  discountType: number;

  discountAmount: number;
  itemQuantity: number;

  timeStart: Date;
  timeEnd: Date;
  @IsNotEmpty()
  canUseWithOther: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isPaused: boolean;

  product: {
    id: number;
  };

  combo: {
    id: number;
  };

  package: {
    id: number;
  };

  store: {
    id: number;
  };
}

export class UpdatePromoCodeDto extends CreatePromoCodeDto {
  id: number;
}

export class CreatePromoCampaignDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  image: {
    id: number;
  };

  timeStart: Date;
  timeEnd: Date;
  @IsNotEmpty()
  canUseWithOther: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isPaused: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isCumulative: boolean;

  promoCampaignConditions: PromoCampaignConditionDto[];
  promoCampaignBonus: PromoCampaignBonusDto[];

  store: {
    id: number;
  };
}

export class UpdatePromoCampaignDto extends CreatePromoCampaignDto {
  id: number;
  promoCampaignConditions: EditPromoCampaignConditionDto[];
  promoCampaignBonus: EditPromoCampaignBonusDto[];
}
class PromoCampaignBonusDto {
  product: {
    id: number;
  };

  combo: {
    id: number;
  };

  package: {
    id: number;
  };

  @IsNotEmpty()
  discountType: number;

  discountAmount: number;

  @IsNotEmpty()
  @IsNumber()
  expiryDate: number;

  @IsNotEmpty()
  quantity: string;
  maximumAmount: string;
}
class PromoCampaignConditionDto {
  product: {
    id: number;
  };

  combo: {
    id: number;
  };

  package: {
    id: number;
  };

  memberRank: {
    id: number;
  };

  quantity: number;
}

class EditPromoCampaignBonusDto extends PromoCampaignBonusDto {
  id: number;
}
class EditPromoCampaignConditionDto extends PromoCampaignConditionDto {
  id: number;
}
