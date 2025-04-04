import { InconsistentWellKnownEbmlTagTypeError } from './errors';
import {
  type EbmlBlockTagIdType,
  type EbmlDataTagIdType,
  EbmlElementType,
  type EbmlMasterTagIdType,
  type EbmlSimpleBlockTagIdType,
  EbmlTagIdEnum,
  isEbmlBlockTagId,
  isEbmlSimpleBlockTagId,
  getEbmlTypeByTagId,
} from './models/enums';
import {
  type CreateEbmlBlockTagOptions,
  EbmlBlockTag,
} from './models/tag-block';
import { type CreateEbmlDataTagOptions, EbmlDataTag } from './models/tag-data';
import {
  type CreateEbmlMasterTagOptions,
  EbmlMasterTag,
} from './models/tag-master';
import {
  type CreateEbmlSimpleBlockTagOptions,
  EbmlSimpleBlockTag,
} from './models/tag-simple-block';
import type { CreateEbmlTagOptions, EbmlTagTrait } from './models/tag-trait';

export function createEbmlTag(
  id: EbmlMasterTagIdType,
  options: Omit<CreateEbmlMasterTagOptions, 'id'>
): EbmlMasterTag;

export function createEbmlTag(
  id: EbmlDataTagIdType,
  options: Omit<CreateEbmlDataTagOptions, 'id'>
): EbmlDataTag;

export function createEbmlTag(
  id: EbmlBlockTagIdType,
  options: Omit<CreateEbmlBlockTagOptions, 'id'>
): EbmlBlockTag;

export function createEbmlTag(
  id: EbmlSimpleBlockTagIdType,
  options: Omit<CreateEbmlSimpleBlockTagOptions, 'id'>
): EbmlSimpleBlockTag;

export function createEbmlTag(
  id: CreateEbmlTagOptions['id'],
  options: Omit<CreateEbmlTagOptions, 'id'>
): EbmlTagTrait;

export function createEbmlTag(arg1: unknown, arg2: unknown): EbmlTagTrait {
  const id = arg1 as EbmlTagIdEnum;
  const options = arg2 as Omit<CreateEbmlTagOptions, 'id'>;
  let type: EbmlElementType | undefined = options.type;
  if (EbmlTagIdEnum[id] !== undefined) {
    let foundType: EbmlElementType | undefined;
    // adhoc start
    if (isEbmlBlockTagId(id)) {
      return new EbmlBlockTag({ ...options, id });
    }
    if (isEbmlSimpleBlockTagId(id)) {
      return new EbmlSimpleBlockTag({ ...options });
    }
    // adhoc end

    foundType = getEbmlTypeByTagId(id);

    if (type === undefined) {
      type = foundType;
    }
    if (type !== foundType) {
      throw new InconsistentWellKnownEbmlTagTypeError(id, type!);
    }
  }

  if (type === EbmlElementType.Master) {
    return new EbmlMasterTag({
      ...options,
      id: id as EbmlMasterTagIdType,
    });
  }
  return new EbmlDataTag({
    ...options,
    id,
    type,
  });
}

export type EncodeUselessCreateOptionsType =
  | 'contentLength'
  | 'headerLength'
  | 'startOffset';

export function createEbmlTagForManuallyBuild(
  id: EbmlMasterTagIdType,
  options: Omit<
    CreateEbmlMasterTagOptions,
    'id' | EncodeUselessCreateOptionsType
  > &
    Partial<Pick<CreateEbmlMasterTagOptions, EncodeUselessCreateOptionsType>>
): EbmlMasterTag;

export function createEbmlTagForManuallyBuild(
  id: EbmlDataTagIdType,
  options: Omit<
    CreateEbmlDataTagOptions,
    'id' | EncodeUselessCreateOptionsType
  > &
    Partial<Pick<CreateEbmlMasterTagOptions, EncodeUselessCreateOptionsType>>
): EbmlDataTag;

export function createEbmlTagForManuallyBuild(
  id: EbmlBlockTagIdType,
  options: Omit<
    CreateEbmlBlockTagOptions,
    'id' | EncodeUselessCreateOptionsType
  > &
    Partial<Pick<CreateEbmlMasterTagOptions, EncodeUselessCreateOptionsType>>
): EbmlBlockTag;

export function createEbmlTagForManuallyBuild(
  id: EbmlSimpleBlockTagIdType,
  options: Omit<
    CreateEbmlSimpleBlockTagOptions,
    'id' | EncodeUselessCreateOptionsType
  > &
    Partial<Pick<CreateEbmlMasterTagOptions, EncodeUselessCreateOptionsType>>
): EbmlSimpleBlockTag;

export function createEbmlTagForManuallyBuild(
  id: CreateEbmlTagOptions['id'],
  options: Omit<CreateEbmlTagOptions, 'id' | EncodeUselessCreateOptionsType> &
    Partial<Pick<CreateEbmlMasterTagOptions, EncodeUselessCreateOptionsType>>
): EbmlTagTrait;

export function createEbmlTagForManuallyBuild(
  arg1: unknown,
  arg2: unknown
): EbmlTagTrait {
  const id = arg1 as CreateEbmlTagOptions['id'];
  const options = arg2 as Omit<
    CreateEbmlTagOptions,
    'id' | EncodeUselessCreateOptionsType
  > &
    Partial<Pick<CreateEbmlMasterTagOptions, EncodeUselessCreateOptionsType>>;
  return createEbmlTag(
    id,
    Object.assign(
      {
        contentLength: Number.NaN,
        headerLength: Number.NaN,
        startOffset: Number.NaN,
      },
      options
    ) as Omit<CreateEbmlTagOptions, 'id'>
  );
}
