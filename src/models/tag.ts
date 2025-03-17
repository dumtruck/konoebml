import type {
  EbmlAsciiDataTagIdType,
  EbmlBinaryDataTagIdType,
  EbmlBlockTagIdType,
  EbmlDateDataTagIdType,
  EbmlElementType,
  EbmlFloatDataTagIdType,
  EbmlIntDataTagIdType,
  EbmlMasterTagIdType,
  EbmlSimpleBlockTagIdType,
  EbmlTagPosition,
  EbmlUintDataTagIdType,
  EbmlUnknownTagIdType,
  EbmlUtf8DataTagIdType,
} from './enums';
import type { EbmlBlockTag } from './tag-block';
import type { EbmlDataTag } from './tag-data';
import type { EbmlMasterTag } from './tag-master';
import type { EbmlSimpleBlockTag } from './tag-simple-block';

export type EbmlTagExcludeField =
  | 'id'
  | 'position'
  | 'parent'
  | 'type'
  | 'data'
  | 'children';

export type EbmlUintTagType = Omit<EbmlDataTag, EbmlTagExcludeField> & {
  id: EbmlUintDataTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.UnsignedInt;
  data: number | bigint;
  children?: [];
};

export type EbmlIntTagType = Omit<EbmlDataTag, EbmlTagExcludeField> & {
  id: EbmlIntDataTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Integer;
  data: number | bigint;
  children?: [];
};

export type EbmlUtf8TagType = Omit<EbmlDataTag, EbmlTagExcludeField> & {
  id: EbmlUtf8DataTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.UTF8;
  data: string;
  children?: [];
};

export type EbmlAsciiTagType = Omit<EbmlDataTag, EbmlTagExcludeField> & {
  id: EbmlAsciiDataTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Ascii;
  data: string;
  children?: [];
};

export type EbmlDateTagType = Omit<EbmlDataTag, EbmlTagExcludeField> & {
  id: EbmlDateDataTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Date;
  data: Uint8Array;
  children?: [];
};

export type EbmlFloatTagType = Omit<EbmlDataTag, EbmlTagExcludeField> & {
  id: EbmlFloatDataTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Float;
  data: number;
  children?: [];
};

export type EbmlBinaryTagType = Omit<EbmlDataTag, EbmlTagExcludeField> & {
  id: EbmlBinaryDataTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type: EbmlElementType.Binary;
  data: Uint8Array;
  children?: [];
};

export type EbmlUnknownTagType = Omit<EbmlDataTag, EbmlTagExcludeField> & {
  id: EbmlUnknownTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type?: undefined;
  data: Uint8Array;
  children?: [];
};

export type EbmlDataTagType =
  | EbmlAsciiTagType
  | EbmlBinaryTagType
  | EbmlUintTagType
  | EbmlIntTagType
  | EbmlFloatTagType
  | EbmlDateTagType
  | EbmlUtf8TagType;

export type EbmlBlockTagType = Omit<EbmlBlockTag, EbmlTagExcludeField> & {
  id: EbmlBlockTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type?: undefined;
  data?: undefined;
  children?: [];
};

export type EbmlSimpleBlockTagType = Omit<
  EbmlSimpleBlockTag,
  EbmlTagExcludeField
> & {
  id: EbmlSimpleBlockTagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type?: undefined;
  data?: undefined;
  children?: [];
};

export type EbmlMasterTagType = Omit<EbmlMasterTag, EbmlTagExcludeField> & {
  id: EbmlMasterTagIdType;
  type: EbmlElementType.Master;
  position: EbmlTagPosition.Start | EbmlTagPosition.End;
  parent?: EbmlMasterTag;
  children: EbmlTagType[];
  data?: undefined;
};

export type EbmlTagType =
  | EbmlMasterTagType
  | EbmlSimpleBlockTagType
  | EbmlBlockTagType
  | EbmlDataTagType;
