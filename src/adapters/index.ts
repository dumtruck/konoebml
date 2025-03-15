import type { Promisable } from 'type-fest';

export type FileDataViewController = {
  getOffset(): number;
  seek(offset: number): Promisable<number>;
  read(
    offset: number,
    length?: number,
    exactLength?: boolean
  ): Promise<DataView>;
  peek(offset: number): Promise<DataView | null>;
};
