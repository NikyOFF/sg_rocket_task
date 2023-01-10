import { BaseUserInterface } from '@modules/users/common/interfaces/base-user.interface';
import { LawBranchBitField } from '@common/utils/law-branch.bit-field';

export interface LawyerInterface extends BaseUserInterface {
  lawBranches: LawBranchBitField;
}
