import fs from 'node:fs';
import path from 'node:path';
import { Window, type Element } from 'happy-dom';
import { type } from 'arktype';
import { omitBy, isNil } from 'lodash-es';
import { kebabCase } from 'change-case';

export const AdHocType = {
  SimpleBlock: {
    type: 'SimpleBlock',
  },
  Block: {
    type: 'Block',
  },
};

export const ebmlTypeSchema = type(
  '"uinteger" | "master" | "binary" | "float" | "utf-8" | "string" | "integer" | "date"'
);

const RestrictionEntrySchema = type({
  value: 'string',
  label: 'string',
});

const EbmlElementSchema = type({
  name: 'string',
  type: ebmlTypeSchema,
  path: 'string?',
  id: 'string',
  default: 'string?',
  range: 'string?',
  maxOccurs: 'string?',
  minOccurs: 'string?',
  minVer: 'string?',
  maxVer: 'string?',
  restriction: RestrictionEntrySchema.array().optional(),
});

type EbmlElementType = typeof EbmlElementSchema.infer;

function extractElement(element: Element) {
  const attrs = element.attributes;
  const name = attrs.getNamedItem('name')?.value?.replace(/-/g, '')!;
  const type = attrs.getNamedItem('type')?.value!;
  const path = attrs.getNamedItem('path')?.value!;
  const id = attrs.getNamedItem('id')?.value!;
  const default_ = attrs.getNamedItem('default')?.value;
  const range = attrs.getNamedItem('range')?.value;
  const maxOccurs = attrs.getNamedItem('maxOccurs')?.value;
  const minOccurs = attrs.getNamedItem('minOccurs')?.value;
  const minVer = attrs.getNamedItem('minVer')?.value;
  const maxVer = attrs.getNamedItem('maxVer')?.value;
  const restriction = [...element.querySelectorAll('restriction>enum')].map(
    (e) => {
      const value = e.getAttribute('value');
      const label = e.getAttribute('label');
      return {
        value,
        label,
      };
    }
  );
  const el: EbmlElementType = {
    name,
    type: type as any,
    path,
    id,
    default: default_,
    range,
    maxOccurs,
    minOccurs,
    minVer,
    maxVer,
    restriction: restriction.length >= 0 ? (restriction as any) : undefined,
  };
  try {
    return EbmlElementSchema.assert(omitBy(el, isNil));
  } catch (e) {
    console.error('error element is: ', name);
    throw e;
  }
}

function extractElementAll() {
  const allElements = new Map<string, EbmlElementType>();

  // the later has the higher priority
  const specs = ['ebml_mkv_legacy.xml', 'ebml.xml', 'ebml_mkv.xml'];

  for (const spec of specs) {
    const window = new Window();

    const xmlString = fs.readFileSync(
      path.join(import.meta.dirname, '..', 'assets', 'specification', spec),
      'utf-8'
    );

    const domParser = new window.DOMParser();
    const xmlDoc = domParser.parseFromString(xmlString, 'application/xml');

    const elements = Array.from(xmlDoc.querySelectorAll('element'));

    for (const el of elements) {
      const extracted = extractElement(el);
      if (BigInt(extracted.id) >= Number.MAX_SAFE_INTEGER) {
        throw new Error('unsafe impl use int, should refactor');
      }
      // if (
      //   allElements.has(extracted.id) &&
      //   !isEqual(extracted, allElements.get(extracted.id))
      // ) {
      //   console.warn(
      //     `conflicts id = 0x${extracted.id}, name = ${extracted.name}, overwriting...`
      //   );
      // }
      allElements.set(extracted.id, extracted);
    }
  }

  return Array.from(allElements.values());
}

function generateEbmlLacingType(_elements: EbmlElementType[]) {
  return `export enum EbmlBlockLacing {
  None = 1,
  Xiph = 2,
  EBML = 3,
  FixedSize = 4,
}`;
}

function generateEbmlElementType(_elements: EbmlElementType[]) {
  return `export enum EbmlElementType {
  Master = 'm',
  Uint = 'u',
  Int = 'i',
  Ascii = 's',
  Utf8 = '8',
  Binary = 'b',
  Float = 'f',
  Date = 'd',
}`;
}

function generateEbmlTagPosition(_elements: EbmlElementType[]) {
  return `export enum EbmlTagPosition {
  Start = 1,
  Content = 2,
  End = 3,
}`;
}

function generateEbmlTagIdEnum(elements: EbmlElementType[]) {
  const lines = elements.map((e) => `  ${e.name} = ${e.id}`);
  return `export enum EbmlTagIdEnum {\n${lines.join(',\n')}\n }`;
}

const TypeCodeToEbmlType = {
  Master: 'master',
  Uint: 'uinteger',
  Int: 'integer',
  Ascii: 'string',
  Utf8: 'utf-8',
  Binary: 'binary',
  Float: 'float',
  Date: 'date',
};

const TypeCodeToTsType = {
  Uint: 'number | bigint',
  Int: 'number | bigint',
  Ascii: 'string',
  UTF8: 'string',
  Binary: 'Uint8Array',
  Float: 'number',
  Date: 'Uint8Array',
};

function generateEbmlTypeTagIdType(elements: EbmlElementType[]) {
  return [
    ...Object.entries(TypeCodeToEbmlType).map(
      ([typeCode, type]) =>
        `export type Ebml${typeCode}TagIdType = \n${elements
          .map((el) => {
            const adhoc = AdHocType[el.name as keyof typeof AdHocType];
            if (adhoc || el.type !== type) {
              return;
            }
            return `  | EbmlTagIdEnum.${el.name}`;
          })
          .filter(Boolean)
          .join('\n')}`
    ),
    ...Object.entries(AdHocType).map(
      ([name]) => `export type Ebml${name}TagIdType = EbmlTagIdEnum.${name};`
    ),
    `export type EbmlDataTagIdType =\n${Object.keys(TypeCodeToEbmlType)
      .filter((typeCode) => typeCode !== 'Master')
      .map((k) => `  | Ebml${k}TagIdType`)
      .join('\n')};`,
    `export type EbmlAdhocTagIdType =\n${Object.keys(AdHocType)
      .map((k) => `  | Ebml${k}TagIdType`)
      .join('\n')}`,
    'export type EbmlUnknownTagIdType = number | bigint',
    'export type EbmlKnownTagIdType = EbmlDataTagIdType | EbmlMasterTagIdType | EbmlAdhocTagIdType;',
    'export type EbmlTagIdType = EbmlKnownTagIdType | EbmlUnknownTagIdType;',
  ].join('\n\n');
}

function generateGetEbmlTypeByTagId(elements: EbmlElementType[]) {
  return [
    '/* return undefined means unknown or ad-hoc */',
    'export function getEbmlTypeByTagId(id: EbmlTagIdType): EbmlElementType | undefined {',
    '  switch (id) {',
    Object.entries(TypeCodeToEbmlType)
      .map(
        ([typeCode, type]) =>
          `${elements
            .map((el) => {
              const adhoc = AdHocType[el.name as keyof typeof AdHocType];
              if (adhoc || el.type !== type) {
                return;
              }
              return `    case EbmlTagIdEnum.${el.name}:`;
            })
            .filter(Boolean)
            .join('\n')}\n      return EbmlElementType.${typeCode};`
      )
      .join('\n'),
    '    default:',
    '      return;',
    '  }',
    '}',
  ].join('\n');
}

function generateIsEbmlTypeTagId(_elements: EbmlElementType[]) {
  return [
    ...Object.keys(TypeCodeToEbmlType).map(
      (code) => `export function isEbml${code}TagId(
  tagId: EbmlTagIdType
): tagId is Ebml${code}TagIdType {
  return getEbmlTypeByTagId(tagId) === EbmlElementType.${code};
}`
    ),
    ...Object.keys(AdHocType).map(
      (name) => `export function isEbml${name}TagId(
  tagId: EbmlTagIdType
): tagId is Ebml${name}TagIdType {
  return tagId === EbmlTagIdEnum.${name};
}`
    ),
    `export function isEbmlUnknownTagId(tagId: EbmlTagIdType): boolean {
  return typeof tagId !== 'number' || !(tagId in EbmlTagIdEnum);
}`,
  ].join('\n\n');
}

function generateTagUnionImports(_elements: EbmlElementType[]) {
  return `import type {
  ${Object.keys(AdHocType).map((typeCode) => `Ebml${typeCode}TagIdType`)},
  EbmlElementType,
  EbmlTagIdEnum,
  EbmlTagPosition,
} from './enums';
import type { EbmlDataTag } from './tag-data';
import type { EbmlMasterTag } from './tag-master';
${Object.keys(AdHocType)
  .map(
    (typeCode) =>
      `import type { Ebml${typeCode}Tag } from './tag-${kebabCase(typeCode)}';`
  )
  .join('\n')}

export type EbmlTagExcludeField =
  | 'id'
  | 'position'
  | 'parent'
  | 'type'
  | 'data'
  | 'children';
`;
}

function generateTagUnionImpls(elements: EbmlElementType[]) {
  return [
    ...Object.entries(TypeCodeToEbmlType)
      .map(([typeCode]) => {
        if (typeCode === 'Master') {
          return;
        }
        return `export interface Ebml${typeCode}TagTypeBase
    extends Omit<EbmlDataTag, EbmlTagExcludeField> {
    position: EbmlTagPosition.Content;
    parent?: EbmlMasterTag;
    type: EbmlElementType.${typeCode};
    data: ${TypeCodeToTsType[typeCode as keyof typeof TypeCodeToTsType]};
    children?: [];
  }`;
      })
      .filter(Boolean),
    `export interface EbmlMasterTagTypeBase
  extends Omit<EbmlMasterTag, EbmlTagExcludeField> {
  type: EbmlElementType.Master;
  position: EbmlTagPosition.Start | EbmlTagPosition.End;
  parent?: EbmlMasterTag;
  children: EbmlTagType[];
  data?: undefined;
}`,

    ...Object.entries(TypeCodeToEbmlType).map(([typeCode, type]) => {
      const filteredElements = elements.filter(
        (el) =>
          el.type === type && !AdHocType[el.name as keyof typeof AdHocType]
      );
      return [
        ...filteredElements.map((el) => {
          return `export interface Ebml${el.name}TagType extends Ebml${typeCode}TagTypeBase {
  id: EbmlTagIdEnum.${el.name};
}`;
        }),
        `export type Ebml${typeCode}TagType = \n${filteredElements.map((el) => `  | Ebml${el.name}TagType`).join('\n')};`,
      ].join('\n\n');
    }),
    ...Object.keys(AdHocType).map(
      (typeCode) => `export type Ebml${typeCode}TagType = Omit<
  Ebml${typeCode}Tag,
  EbmlTagExcludeField
> & {
  id: Ebml${typeCode}TagIdType;
  position: EbmlTagPosition.Content;
  parent?: EbmlMasterTag;
  type?: undefined;
  data?: undefined;
  children?: [];
}`
    ),
    `export type EbmlDataTagType = \n${Object.keys(TypeCodeToEbmlType)
      .filter((typeCode) => typeCode !== 'Master')
      .map((typeCode) => `  | Ebml${typeCode}TagType`)
      .join('\n')}`,
    `export type EbmlAdhocTagType = \n${Object.keys(AdHocType)
      .map((typeCode) => `  | Ebml${typeCode}TagType`)
      .join('\n')}`,
    `export type EbmlTagType =
  | EbmlMasterTagType
  | EbmlDataTagType
  | EbmlAdhocTagType`,
  ].join('\n\n');
}

function main() {
  const elementSchemas = extractElementAll();

  const files = {
    'enums.ts': [
      generateEbmlLacingType(elementSchemas),
      generateEbmlElementType(elementSchemas),
      generateEbmlTagPosition(elementSchemas),
      generateEbmlTagIdEnum(elementSchemas),
      generateEbmlTypeTagIdType(elementSchemas),
      generateGetEbmlTypeByTagId(elementSchemas),
      generateIsEbmlTypeTagId(elementSchemas),
    ],
    'tag-union.ts': [
      generateTagUnionImports(elementSchemas),
      generateTagUnionImpls(elementSchemas),
    ],
  };

  const outDir = path.join(import.meta.dirname, '..', 'temp', 'codegen');
  fs.mkdirSync(outDir, { recursive: true });

  for (const [filename, fragments] of Object.entries(files)) {
    fs.writeFileSync(
      path.join(outDir, filename),
      fragments.join('\n\n'),
      'utf-8'
    );
  }
}

main();
