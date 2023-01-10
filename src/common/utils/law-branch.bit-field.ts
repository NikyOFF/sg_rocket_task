import { BitField } from '@packages/bit-field/bit-field';
import { LawBranchEnum } from '@common/enums/law-branch.enum';

export class LawBranchBitField extends BitField<LawBranchEnum> {
  static FLAGS = LawBranchEnum;
}
