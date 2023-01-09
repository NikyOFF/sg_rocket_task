type BitFieldResolvable<Type extends number> =
  | number
  | bigint
  | string
  | Type
  | BitField<Type>
  | Array<BitFieldResolvable<Type>>;

type Test = {
  [value: string]: string;
};

export class BitField<Type extends number> {
  static Flags = typeof {};
  static DefaultBit = BigInt(0);

  public bitfield: bigint;

  public constructor(...bits: BitFieldResolvable<Type>[]) {
    this.bitfield = this.resolve(bits);
  }

  public any(bit: BitFieldResolvable<Type>): boolean {
    return (this.bitfield & this.resolve(bit)) !== BitField.DefaultBit;
  }

  public equals(bit: BitFieldResolvable<Type>): boolean {
    return this.bitfield === this.resolve(bit);
  }

  public has(bit: BitFieldResolvable<Type>): boolean {
    bit = this.resolve(bit);
    return (this.bitfield & bit) === bit;
  }

  public missing(bits): string[] {
    return new BitField<Type>(bits).remove(this).toArray();
  }

  public freeze(): Readonly<BitField<Type>> {
    return Object.freeze(this);
  }

  public add(...bits: BitFieldResolvable<Type>[]): BitField<Type> {
    let total = BitField.DefaultBit;

    for (const bit of bits) {
      total |= this.resolve(bit);
    }

    if (Object.isFrozen(this)) {
      return new BitField<Type>(this.bitfield | total);
    }

    this.bitfield |= total;
    return this;
  }

  public remove(...bits: BitFieldResolvable<Type>[]): BitField<Type> {
    let total = BitField.DefaultBit;

    for (const bit of bits) {
      total |= this.resolve(bit);
    }

    if (Object.isFrozen(this)) {
      return new BitField<Type>(this.bitfield & ~total);
    }

    this.bitfield &= ~total;

    return this;
  }

  public serialize(): { [value: string]: boolean } {
    const serialized = {};

    for (const [flag, bit] of Object.entries(
      (this.constructor as typeof BitField).Flags,
    )) {
      serialized[flag] = this.has(bit);
    }

    return serialized;
  }

  public toArray(): string[] {
    return Object.keys((this.constructor as typeof BitField).Flags).filter(
      (bit) => this.has(bit),
    );
  }

  public toJSON() {
    return typeof this.bitfield === 'number'
      ? this.bitfield
      : this.bitfield.toString();
  }

  public valueOf(): bigint {
    return this.bitfield;
  }

  *[Symbol.iterator]() {
    yield* this.toArray();
  }

  private resolve<Type extends number>(bit: BitFieldResolvable<Type>): bigint {
    return (this.constructor as typeof BitField).resolve(bit);
  }

  static resolve<Type extends number>(bit: BitFieldResolvable<Type>): bigint {
    if (typeof bit === 'number' || typeof bit === 'bigint') {
      return BigInt(bit);
    }

    if (bit instanceof BitField) {
      return bit.bitfield;
    }

    if (Array.isArray(bit)) {
      return bit
        .map((bitField: BitFieldResolvable<Type>) => this.resolve(bitField))
        .reduce(
          (previousValue, currentValue) => previousValue | currentValue,
          BitField.DefaultBit,
        );
    }

    if (typeof bit === 'string' && typeof this.Flags[bit] !== undefined) {
      return this.Flags[bit];
    }

    return BigInt(0);
  }
}
