import { ICalcBlock } from 'entities/calc-blocks';

export default function isCalcBlockCopied(array: ICalcBlock[], id: string): boolean {
  return array.filter((item) => item.id.includes(id)).length > 0;
}
