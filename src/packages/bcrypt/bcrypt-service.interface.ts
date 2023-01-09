export interface BcryptServiceInterface {
  hash(data: string): Promise<string>;

  hashSync(data: string): string;

  compare(data: string, encrypted: string): Promise<boolean>;

  compareSync(data: string, encrypted: string): boolean;
}
