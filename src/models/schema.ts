import { type } from 'arktype';
import { EbmlBlockTag } from './tag-block';
import { EbmlSimpleBlockTag } from './tag-simple-block';

export const Binary = type.instanceOf(Uint8Array);

export const EBML = type({
  EBMLMaxIDLength: 'number=4',
  EBMLMaxSizeLength: 'number=8',
});

export const Seek = type({
  SeekID: Binary,
  SeekPosition: 'number',
});

export const SeekHead = type({
  Seek: Seek.array(),
});

export const ChapterTranslate = type({
  ChapterTranslateID: Binary,
  ChapterTranslateCodec: 'number',
  ChapterTranslateEditionUID: 'number[]?',
});

export const SegmentInformation = type({
  SegmentUUID: Binary.optional(),
  SegmentFilename: 'string?',
  PrevUUID: Binary.optional(),
  PrevFilename: 'string?',
  NextUUID: Binary.optional(),
  NextFilename: 'string?',
  SegmentFamily: Binary.array().optional(),
  ChapterTranslate: ChapterTranslate.array().optional(),
  TimestampScale: 'number = 1000000',
  Duration: 'number?',
  DateUTC: Binary.optional(),
  Title: 'string?',
  MuxingApp: 'string',
  WritingApp: 'string',
});

export const BlockMore = type({
  BlockAdditional: Binary,
  BlockAddID: 'number=1',
});

export const BlockAddtions = type({
  BlockMore: BlockMore.array(),
});

export const BlockGroup = type({
  Block: type.instanceOf(EbmlBlockTag),
  BlockAdditions: BlockAddtions.optional(),
  /**
   * @see [Matroska elements](https://www.matroska.org/technical/elements.html)
   */
  BlockDuration: 'number?',
  ReferencePriority: 'number=0',
  ReferenceBlock: 'number[]?',
  CodecState: Binary.optional(),
  DiscardPadding: 'number?',
});

export const Cluster = type({
  Timestamp: 'number',
  Position: 'number?',
  PrevSize: 'number?',
  SimpleBlock: type.instanceOf(EbmlSimpleBlockTag).array().optional(),
  BlockGroup: BlockGroup.array().optional(),
});

export const CueReference = type({
  CueRefTime: 'number',
});

export const CueTrackPositions = type({
  CueTrack: 'number',
  CueClusterPosition: 'number',
  CueRelativePosition: 'number?',
  CueDuration: 'number?',
  CueBlockNumber: 'number?',
  CueCodecState: 'number = 0',
  cueReference: CueReference.array().optional(),
});

export const CuePoint = type({
  CueTime: 'number',
  CueTrackPositions: CueTrackPositions.array(),
});

export const Cues = type({
  CuePoint: CuePoint.array(),
});

export const ContentEncAESSettings = type({
  AESSettingsCipherMode: 'number',
});

export const ContentEncryption = type({
  ContentEncAESSettings: ContentEncAESSettings.optional(),
  ContentEncKeyID: Binary.optional(),
  ContentEncAlgo: 'number=0',
});

export const ContentCompression = type({
  ContentCompSettings: Binary.optional(),
  ContentCompAlgo: 'number=0',
});

export const ContentEncoding = type({
  ContentCompression: ContentCompression.optional(),
  ContentEncryption: ContentEncryption.optional(),
  ContentEncodingType: 'number=0',
  ContentEncodingScope: 'number=1',
  ContentEncodingOrder: 'number=0',
});

export const ContentEncodings = type({
  ContentEncoding: ContentEncoding.array(),
});

export const TrackPlane = type({
  TrackPlaneUID: 'number',
  TrackPlaneType: 'number',
});

export const TrackJoinBlocks = type({
  TrackJoinUID: 'number[]',
});

export const TrackCombinePlanes = type({
  TrackPlane: TrackPlane.array(),
});

export const TrackOperation = type({
  TrackCombinePlanes: TrackCombinePlanes.optional(),
  TrackJoinBlocks: TrackJoinBlocks.optional(),
});

export const Audio = type({
  SamplingFrequency: 'number=8000',
  /**
   * @see [Matroska elements](https://www.matroska.org/technical/elements.html)
   */
  OutputSamplingFrequency: 'number?',
  Channels: 'number=1',
  BitDepth: 'number?',
  Emphasis: 'number=0',
});

export const Projection = type({
  ProjectionType: 'number=0',
  ProjectionPrivate: Binary.optional(),
  ProjectionPoseYaw: 'number=0',
  ProjectionPosePitch: 'number=0',
  ProjectionPoseRoll: 'number=0',
});

export const MasteringMetadata = type({
  PrimaryRChromaticityX: 'number?',
  PrimaryRChromaticityY: 'number?',
  PrimaryGChromaticityX: 'number?',
  PrimaryGChromaticityY: 'number?',
  PrimaryBChromaticityX: 'number?',
  PrimaryBChromaticityY: 'number?',
  WhitePointChromaticityX: 'number?',
  WhitePointChromaticityY: 'number?',
  LuminanceMax: 'number?',
  LuminanceMin: 'number?',
});

export const Colour = type({
  MatrixCoefficients: 'number=2',
  BitsPerChannel: 'number=0',
  ChromaSubsamplingHorz: 'number?',
  ChromaSubsamplingVert: 'number?',
  CbSubsamplingHorz: 'number?',
  CbSubsamplingVert: 'number?',
  ChromaSitingHorz: 'number=0',
  ChromaSitingVert: 'number=0',
  Range: 'number=0',
  TransferCharacteristics: 'number=2',
  Primaries: 'number=2',
  MaxCLL: 'number?',
  MaxFALL: 'number?',
  MasteringMetadata: MasteringMetadata.optional(),
});

export const Video = type({
  FlagInterlaced: 'number=0',
  FieldOrder: 'number=2',
  StereoMode: 'number=0',
  AlphaMode: 'number=0',
  PixelWidth: 'number',
  PixelHeight: 'number',
  PixelCropBottom: 'number=0',
  PixelCropTop: 'number=0',
  PixelCropLeft: 'number=0',
  PixelCropRight: 'number=0',
  /**
   * @see [Matroska elements](https://www.matroska.org/technical/elements.html)
   */
  DisplayWidth: 'number?',
  /**
   * @see [Matroska elements](https://www.matroska.org/technical/elements.html)
   */
  DisplayHeight: 'number?',
  DisplayUnit: 'number=0',
  UncompressedFourCC: Binary.optional(),
  Colour: Colour.optional(),
  Projection: Projection.optional(),
});

export const TrackTranslate = type({
  TrackTranslateTrackID: Binary,
  TrackTranslateCodec: 'number',
  TrackTranslateEditionUID: 'number[]?',
});

export const BlockAdditionMapping = type({
  BlockAddIDValue: 'number?',
  BlockAddIDName: 'string?',
  BlockAddIDType: 'number=0',
  BlockAddIDExtraData: Binary.optional(),
});

export const TrackEntry = type({
  TrackNumber: 'number',
  TrackUID: 'number',
  TrackType: 'number',
  FlagEnabled: 'number=1',
  FlagDefault: 'number=1',
  FlagForced: 'number=0',
  FlagHearingImpaired: 'number?',
  FlagVisualImpaired: 'number?',
  FlagTextDescriptions: 'number?',
  FlagOriginal: 'number?',
  FlagCommentary: 'number?',
  FlagLacing: 'number=1',
  DefaultDuration: 'number?',
  DefaultDecodedFieldDuration: 'number?',
  MaxBlockAdditionID: 'number=0',
  BlockAdditionMapping: BlockAdditionMapping.array().optional(),
  Name: 'string?',
  Language: 'string="eng"',
  LanguageBCP47: 'string?',
  CodecID: 'string',
  CodecPrivate: Binary,
  CodecName: 'string?',
  CodecDelay: 'number=0',
  SeekPreRoll: 'number=0',
  TrackTranslate: TrackTranslate.array().optional(),
  Video: Video.optional(),
  Audio: Audio.optional(),
  TrackOperation: TrackOperation.optional(),
  ContentEncodings: ContentEncodings.optional(),
});

export const Tracks = type({
  TrackEntry: TrackEntry.array(),
});

export const AttachedFile = type({
  FileDescription: 'string?',
  FileName: 'string',
  FileMediaType: 'string',
  FileData: Binary,
  FileUID: 'number',
});

export const Attachments = type({
  AttachedFile: AttachedFile.array(),
});

export const EditionDisplay = type({
  EditionString: 'string',
  EditionLanguageIETF: 'string[]?',
});

export const ChapterDisplay = type({
  ChapString: 'string',
  ChapLanguage: 'string[]',
  ChapLanguageBCP47: 'string[]?',
  ChapCountry: 'string[]?',
});

export const ChapterTrack = type({
  ChapterTrackUID: 'number',
});

export const ChapProcessCommand = type({
  ChapProcessTime: 'number',
  ChapProcessData: Binary,
});

export const ChapProcess = type({
  ChapProcessCodecID: 'number=0',
  ChapProcessPrivate: Binary,
  ChapProcessCommand: ChapProcessCommand.array().optional(),
});

export const ChapterAtom = type({
  ChapterUID: 'number',
  ChapterStringUID: 'string?',
  ChapterTimeStart: 'number',
  ChapterTimeEnd: 'number?',
  ChapterFlagHidden: 'number=0',
  ChapterFlagEnabled: 'number=1',
  ChapterSegmentUUID: Binary,
  ChapterSkipType: 'number?',
  ChapterSegmentEditionUID: 'number?',
  ChapterPhysicalEquiv: 'number?',
  ChapterTrack: ChapterTrack.optional(),
  ChapterDisplay: ChapterDisplay.array().optional(),
  ChapProcess: ChapProcess.array().optional(),
});

export const EditionEntry = type({
  EditionUID: 'number?',
  EditionFlagHidden: 'number=0',
  EditionFlagDefault: 'number=0',
  EditionFlagOrdered: 'number=0',
  EditionDisplay: EditionDisplay.array().optional(),
});

export const Chapters = type({
  EditionEntry: EditionEntry.array(),
});

export const Targets = type({
  TargetTypeValue: 'number=50',
  TargetType: 'string?',
  TagTrackUID: 'number[]?',
  TagEditionUID: 'number[]?',
  TagChapterUID: 'number[]?',
  TagAttachmentUID: 'number[]?',
});

export const Tag = type({
  Targets: Targets,
});

export const SimpleTag = type({
  TagName: 'string',
  TagLanguage: 'string="und"',
  TagLanguageBCP47: 'string?',
  TagDefault: 'number=1',
  TagString: 'string?',
  TagBinary: Binary,
});

export const Tags = type({
  Tag: Tag.array(),
  SimpleTag: SimpleTag.array(),
});

export const Segment = type({
  SeekHead: SeekHead.array().optional(),
  SegmentInformation: SegmentInformation,
  Cluster: Cluster.array().optional(),
  Tracks: Tracks.optional(),
  Cues: Cues.optional(),
  Attachments: Attachments.optional(),
  Chapters: Chapters.optional(),
  Tags: Tags.optional(),
});
